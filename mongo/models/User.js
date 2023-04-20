// userModel.js
import mongoose from 'mongoose';

// Para crear un campo en el documento que autoincremente en 1 cada vez que se guarde un nuevo documento, se puede usar el plugin mongoose-sequence, ya que los ID's que proporciona MongoDB NO es númerico y secuencial.
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

// Podemos agregar métodos a los documentos de la colección
userSchema.methods.hasSocialMedia = function (platform) {
    return this.socialMedia.some(socialMedia => socialMedia.platform.toLowerCase() === platform.toLowerCase());
};

// Propiedad virtual para obtener la dirección completa del usuario
userSchema.virtual('fullAddress').get(function () {
    return `${this.address.street}, ${this.address.city}, ${this.address.state}, ${this.address.zipCode}, ${this.address.country}`;
});

// Propiedad virtual para obtener la cantidad de redes sociales vinculadas
userSchema.virtual('socialMediaCount').get(function () {
    return this.socialMedia.length;
});

const User = mongoose.model('User', userSchema, 'users'); // El tercer parámetro es el nombre de la colección en la base de datos. Si la colección no existe cuando se guarda un documento se creará automáticamente.
export default User;
