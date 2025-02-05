module.exports = (sequelize, DataTypes) => {
    const Work = sequelize.define('Work', {
        ParticipantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        companyname: DataTypes.STRING,
        salary: DataTypes.FLOAT,
        currency: DataTypes.STRING
    });

    Work.associate = function(models) {
        Work.belongsTo(models.Participant, {foreignKey: 'ParticipantId', targetKey: 'id'});
    };

    return Work;
};
