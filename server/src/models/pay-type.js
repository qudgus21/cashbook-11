module.exports = function(sequelize, DataTypes) {
    const PayType = sequelize.define('PayType', {
        pk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        createdAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
        },
        updatedAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        }
    }, {
        tableName: 'PayType',
        timestamps: false
    });

    return PayType;
}