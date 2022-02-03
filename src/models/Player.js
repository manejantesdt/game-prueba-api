const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "player",
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      status: {
        type: DataTypes.STRING,
        defaultValue: "Bronce",
        allowNull: false,
      },
      ranking: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          "https://drive.google.com/thumbnail?id=1FvgHhPmYNwruvKSjok1dp-ikpKVD2O5z",
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
