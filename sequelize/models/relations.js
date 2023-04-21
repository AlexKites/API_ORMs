import User from './User.js';
import Address from './Address.js';
import SocialMedia from './SocialMedia.js';

// En Sequelize, tenemos que normalizar los datos (convertir tablas grandes en tablas pequeñas) para mejorar rendimiento y simplificar consultas, y relacionarlas entre sí.
User.hasOne(Address, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'address', // Alias de la relación. Si no se define esta relación, Sequelize la crea con el nombre de la tabla en singular.
});

User.hasMany(SocialMedia, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'socialMedia',
});

Address.belongsTo(User, { foreignKey: 'userId' });
SocialMedia.belongsTo(User, { foreignKey: 'userId' });

export { User, Address, SocialMedia };
