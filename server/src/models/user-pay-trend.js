module.exports = function(sequelize, DataTypes) {
    const UserPayTrend = sequelize.define('UserPayTrend', {
        pk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0,
        },
        createdAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
        },
        updatedAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        }
    }, {
        tableName: 'UserPayTrend',
        timestamps: false
    });

    return UserPayTrend;
}