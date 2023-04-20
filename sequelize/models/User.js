// user.js
import { DataTypes } from 'sequelize';
import { sequelize } from './connection.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    theme: {
        type: DataTypes.STRING,
        defaultValue: 'light',
    },
    notifications_email: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    notifications_sms: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    notifications_push: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

export default User;
