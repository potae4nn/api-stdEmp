module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      student_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      year_class: {
        type: Sequelize.STRING
      }
    });
  
    return Student;
  };