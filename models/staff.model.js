module.exports = (sequelize, Sequelize) => {
    const Staff = sequelize.define("staff", {
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      staff_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return Staff;
  };