const { Sequelize, DataTypes, JSON } = require("sequelize");

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

  .then(async (data) => {
    return await User.findAll({
      attributes: {
        include: [[sequelize.fn("min", sequelize.col("age")), "max_age"]],
        raw: true,
      },
    });
  })

  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })

  .catch((err) => {
    console.log("Error syncing table and model", err);
  });
