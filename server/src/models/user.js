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
            type: DataTypes.DATE(1),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(1)'),
        },
        updatedAt: {
            type: DataTypes.DATE(1),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1)'),
        },
    }, {
        tableName: 'User',
        timestamps: false
    });

    return User;
}