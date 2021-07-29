module.exports = function(sequelize, DataTypes) {
    const History = sequelize.define('History', {
        pk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        time: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        },
        createdAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
        },
        updatedAt: {
            type: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        }
    }, {
        tableName: 'History',
        timestamps: false
    });

    return History;
}