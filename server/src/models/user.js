module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        pk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
          },
          updatedAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          }
    }, {
        tableName: 'User',
        timestamps: false
    });

    return User;
}