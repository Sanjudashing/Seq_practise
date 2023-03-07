const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("seq_model", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const myFunc = async () => {
  await sequelize.authenticate();
  console.log("connection successfully");
};
myFunc();

const User = sequelize.define(
  "User",
  {
    firstname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 23,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
User.sync({ alter: true })
  // .then((data) => {
  //   return User.create({
  //     firstname: "ankit",
  //     lastname: "yadav",
  //   });
  // })

  .then((data) => {
    return User.findOne({
      where: { firstname: "jubin" },
    });
  })
  .then((data) => {
    // log("user find",data);
    console.log("user find");
    console.log(data.toJSON());
  })

  .catch((err) => {
    console.log("Error syncing table and model", err);
  });
