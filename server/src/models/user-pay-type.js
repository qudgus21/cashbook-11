module.exports = function(sequelize, DataTypes) {
    const UserPayType = sequelize.define('UserPayType', {
        pk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
        },
        updatedAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        }
    }, {
        tableName: 'UserPayType',
        timestamps: false
    });

    return UserPayType;
}