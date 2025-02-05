module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        dob: DataTypes.DATEONLY
    });

    return Participant;
};


