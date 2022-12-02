module.exports = (sequelize, Sequelize) => {
    // งานต่างๆ
    const Subdivision = sequelize.define("subdivision", {
      title: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    });
  
    return Subdivision;
  };