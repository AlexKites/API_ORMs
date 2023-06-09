import express from 'express';
const sequelizeRouter = express.Router();

import { User, SocialMedia, Address } from '../models/relations.js';
import instance from '../models/connection.js';

import colors from '../../utils/colors.js';

sequelizeRouter.get('/', (req, res) => {
    res.send('Bienvenidos a la API-ejemplo de PostgreSQL!');
});

sequelizeRouter.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(`${colors.red}Error getting users:`, error);
        res.status(500).json({ message: 'Error getting users' });
    }
});

sequelizeRouter.get('/all-data', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: SocialMedia,
                    as: 'socialMedia', // Nombre de la relación en el modelo.
                },
                {
                    model: Address,
                    as: 'address',
                },
            ],
        });
        if (!users) { res.status(404).json({ message: 'Users not found' }); }
        res.json(users);
    } catch (error) {
        console.error(`${colors.red}Error getting users:`, error);
        res.status(500).json({ message: 'Error getting users' });
    }
});

sequelizeRouter.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) { res.status(404).json({ message: `User not found` }); }
        res.json(user);
    } catch (error) {
        console.error(`${colors.red}Error getting user:`, error);
        res.status(500).json({ message: 'Error getting user' });
    }
});

sequelizeRouter.get('/user-full-data/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: SocialMedia,
                    as: 'socialMedia', // Nombre de la relación en el modelo.
                },
                {
                    model: Address,
                    as: 'address',
                },
            ],
        });
        if (!user) { res.status(404).json({ message: 'User not found' }); }
        res.json(user);
    } catch (error) {
        console.error(`${colors.red}Error getting user:`, error);
        res.status(500).json({ message: 'Error getting user' });
    }
});

sequelizeRouter.post('/user', async (req, res) => {
    // Aquí implementamos transacciones, para que si falla algún paso, se haga rollback de todos los pasos anteriores.
    const transaction = await instance.sequelize.transaction();
    try {
        const { name, email, password, theme, notifications_email, notifications_sms, notifications_push, street, city, state, zipCode, country, socialMedia } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            theme,
            notifications_email,
            notifications_sms,
            notifications_push
        }, { transaction });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const addressData = await Address.create({
            userId: user.id,
            street,
            city,
            state,
            zipCode,
            country
        }, { transaction });

        if (!addressData) {
            res.status(404).json({ message: 'Address not found' });
        }

        const createdSocialMedia = [];
        for (const social of socialMedia) {
            const newSocialMedia = await SocialMedia.create({
                platform: social.platform,
                username: social.username,
                url: social.url,
                userId: user.id
            }, { transaction });
            createdSocialMedia.push(newSocialMedia);
        }

        await transaction.commit();
        res.send({ user, addressData, createdSocialMedia });
    } catch (error) {
        await transaction.rollback();
        console.error(`Error creating user:`, error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

sequelizeRouter.put('/user/:id', async (req, res) => {
    const t = await instance.sequelize.transaction();
    try {
        const userId = req.params.id;
        const { name, email, password, theme, notifications_email, notifications_sms, notifications_push, street, city, state, zipCode, country, socialMedia } = req.body;

        const user = await User.update({
            name,
            email,
            password,
            theme,
            notifications_email,
            notifications_sms,
            notifications_push
        }, {
            where: { id: userId },
            transaction: t
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const addressData = await Address.update({
            street,
            city,
            state,
            zipCode,
            country
        }, {
            where: { userId },
            transaction: t
        });

        if (!addressData) {
            res.status(404).json({ message: 'Address not found' });
        }

        const updatedSocialMedia = [];
        for (const social of socialMedia) {
            const updatedSocial = await SocialMedia.update({
                platform: social.platform,
                username: social.username,
                url: social.url
            }, {
                where: { id: social.id, userId },
                transaction: t
            });
            updatedSocialMedia.push(updatedSocial);
        }

        await t.commit();
        res.send({ user, addressData, updatedSocialMedia });
    } catch (error) {
        await t.rollback();
        console.error(`Error updating user:`, error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

sequelizeRouter.delete('/user/:id', async (req, res) => {
    const t = await instance.sequelize.transaction();
    try {
        const userId = req.params.id;

        // Primero, elimina los perfiles de redes sociales asociados al usuario
        await SocialMedia.destroy({
            where: { userId },
            transaction: t
        });

        // Luego, elimina la dirección asociada al usuario
        await Address.destroy({
            where: { userId },
            transaction: t
        });

        // Finalmente, elimina el usuario
        const result = await User.destroy({
            where: { id: userId },
            transaction: t
        });

        if (!result) {
            res.status(404).json({ message: 'User not found' });
        }

        await t.commit();
        res.json({ message: 'User, address, and social media profiles deleted successfully' });
    } catch (error) {
        await t.rollback();
        console.error(`Error deleting user:`, error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

export default sequelizeRouter;