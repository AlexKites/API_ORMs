import express from 'express';
const mongoRouter = express.Router();
import User from '../models/User.js';

// En este caso no se necesitan las transacciones, dado que no hay relaciones entre tablas.
mongoRouter.get('/', (req, res) => {
    res.send('Bienvenidos a la API-ejemplo de MongoDB!');
});

mongoRouter.get('/users-without-password', async (req, res) => {
    try {
        const users = await User
            .find()
            .select({ password: 0 })
            .sort({ name: 1 })
            .limit(10)
            .skip(0)
            .lean(); // Para que el resultado sea un objeto de JS y no un objeto de Mongoose.
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

mongoRouter.get('/users/:email', async (req, res) => {
    try {
        const user = await User
            .findOne({ email: req.params.email })
            .select({ password: 0 })
            .lean();
        if (!user) { res.status(404).send('User not found') };
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: error.message
        });
    }
});

mongoRouter.get('/users/:email/socialMedia', async (req, res) => {
    try {
        const user = await User
            .findOne({ email: req.params.email })
            .select({ email: 1, socialMedia: 1 })
            .lean();
        if (!user) { res.status(404).send('User not found') };
        if (user.socialMedia.length === 0) { // Método del modelo User
            res.status(200).send({
                message: 'User has no social media accounts',
                data: user
            })
        } else {
            res.status(200).send({
                message: 'User has social media accounts',
                user
            })
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: error.message
        });
    }
});

mongoRouter.get('/users/:email/socialMedia/:socialMedia', async (req, res) => {
    try {
        const { email, socialMedia } = req.params;
        const user = await User
            .findOne({ email })
            .select({ email: 1, socialMedia: 1 })

        if (!user) { res.status(404).send('User not found') };

        if (user.hasSocialMedia(socialMedia)) { // Método del modelo User
            res.status(200).send({
                message: `User has ${socialMedia} account`,
                data: user
            })
        } else {
            res.status(200).send({
                message: `User does not have ${socialMedia} account`,
                user
            })
        };
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

mongoRouter.get('/users/:email/address', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User
            .findOne({ email })
            .select({ email: 1, address: 1 })

        if (!user) { res.status(404).send('User not found') };
        res.status(200).send({
            message: `User's full address is ${user.fullAddress}`, // Propiedad virtual del modelo User
            data: user
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

mongoRouter.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({
            message: "User created successfully!",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: error.message
        });
    }
});

mongoRouter.put('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true });
        // findOneAndUpdate encuentra el primer documento que coincide con lo proporciopnado (en este caso params.email), lo actualiza y luego lo devuelve. 
        // { new: true } para que devuelva el usuario actualizado
        if (!updatedUser) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(updatedUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: error.message
        });
    }
});

mongoRouter.put('/users/:email/:platform', async (req, res) => {
    try {
        const { email, platform } = req.params; // platform es el nombre de la propiedad que se quiere actualizar en socialMedia.
        const { newPlatform } = req.body; // newPlatform es el nuevo valor de la propiedad que se quiere actualizar en socialMedia.
        const platformRegex = new RegExp(`^${platform}$`, 'i'); // Se crea una expresión regular para que la búsqueda sea case insensitive.
        const updatedUser = await User.findOneAndUpdate(
            { email, 'socialMedia.platform': platformRegex },
            { $set: { 'socialMedia.$.platform': newPlatform } },
            { new: true }
        );
        if (!updatedUser) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(updatedUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: error.message
        });
    }
});

// La joya de la corona jeje
mongoRouter.put('/users/:email/preferences/notifications', async (req, res) => {
    try {
        const { email } = req.params; // Extrae el email de los parámetros
        const updatedFields = req.body; // Extrae el objeto de campos actualizados de req.body

        // Iteramos sobre los campos actualizados para validarlos. Si alguno no existe o no es un booleano, se manda un error.
        for (const field in updatedFields) {
            if (!['email', 'sms', 'push'].includes(field)) {
                res.status(400).send({ message: `Invalid notification field: ${field}` });
                return; // detiene la ejecución del controlador
            }

            if (typeof updatedFields[field] !== 'boolean') {
                res.status(400).send({ message: `Invalid value for notification field '${field}'. It should be a boolean.` });
                return;
            }
        }

        // Construye el objeto de actualización
        const updateFields = {};
        for (const field in updatedFields) {
            updateFields[`preferences.notifications.${field}`] = updatedFields[field];
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: updateFields }, // Actualiza los campos específicos
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(updatedUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: error.message
        });
    }
});


mongoRouter.delete('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(deletedUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: error.message
        });
    }
});



export default mongoRouter;
