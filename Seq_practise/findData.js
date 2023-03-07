const { Sequelize, DataTypes, Op } = require("sequelize");

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

  .then(async (data) => {
    const t = await User.findAll({
      where: {
        [Op.or]: [{ id: 30 }, { id: 40 }],
      },
    });

    return t;
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })

  .catch((err) => {
    console.log("Error syncing table and model", err);
  });
