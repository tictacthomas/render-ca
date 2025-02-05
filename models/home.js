module.exports = (sequelize, DataTypes) => {
    const Home = sequelize.define('Home', {
        ParticipantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        country: DataTypes.STRING,
        city: DataTypes.STRING
    });

    Home.associate = function(models) {
        Home.belongsTo(models.Participant, {foreignKey: 'ParticipantId', targetKey: 'id'});
    };

    return Home;
};
