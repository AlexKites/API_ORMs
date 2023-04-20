import { DataTypes } from 'sequelize';
import { sequelize } from './connection.js';

const SocialMedia = sequelize.define('SocialMedia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    platform: DataTypes.STRING,
    username: DataTypes.STRING,
    url: DataTypes.STRING,
}, {
    timestamps: true,
});

export default SocialMedia;
