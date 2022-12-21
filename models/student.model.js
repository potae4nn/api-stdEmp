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
        allowNull: false
      },
      year_class: {
        type: Sequelize.STRING
      },
      image:{
        type: Sequelize.STRING
      },
      tal:{
        type: Sequelize.STRING
      },
      gpa:{
        type: Sequelize.FLOAT
      }
    });
  
    return Student;
  };