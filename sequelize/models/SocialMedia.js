import { DataTypes } from 'sequelize';
import instance from './connection.js';

const SocialMedia = instance.sequelize.define('SocialMedia', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    platform: DataTypes.STRING,
    username: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

export default SocialMedia;
