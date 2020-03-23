'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Report extends Model{}

  Report.init({
    cases: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {sequelize})

  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Report;
};