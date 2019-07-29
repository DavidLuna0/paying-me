module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Preencha o campo"
                }
            }
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {});
    User.associate = (models) => {
        User.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
    };
    User.associate = (models) => {
        User.belongsToMany(models.Skill, {
            through: 'UserSkill',
            as: 'skills',
            foreignKey: 'userId'
        } )
    }
    return User;
}