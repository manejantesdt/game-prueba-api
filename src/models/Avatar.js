const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "avatar",
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      
    }
  );
};
