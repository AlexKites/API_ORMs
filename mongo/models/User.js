// userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Campo anidado para representar la dirección del usuario
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    // Campo de array para almacenar las redes sociales del usuario
    socialMedia: [
        {
            platform: String,
            username: String,
            url: String,
        },
    ],
    // Campo de objeto para almacenar las preferencias de usuario personalizadas
    preferences: {
        theme: {
            type: String,
            default: 'light',
        },
        notifications: {
            email: {
                type: Boolean,
                default: true,
            },
            sms: {
                type: Boolean,
                default: false,
            },
            push: {
                type: Boolean,
                default: false,
            },
        },
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema, 'users'); // El tercer parámetro es el nombre de la colección en la base de datos. Si la colección no existe cuando se guarda un documento se creará automáticamente.
export default User;
