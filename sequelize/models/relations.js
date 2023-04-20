import User from './User.js';
import Address from './Address.js';
import SocialMedia from './SocialMedia.js';

User.hasOne(Address, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Address.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(SocialMedia, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

SocialMedia.belongsTo(User, { foreignKey: 'userId' });

export { User, Address, SocialMedia };
