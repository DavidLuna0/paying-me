'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define('UserSkill', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Skill',
        key: 'id'
      }
    }
  }, {});
  return UserSkill;
};