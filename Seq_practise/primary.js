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
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
User.sync({ alter: true })

  .then(async (data) => {
    // const t = await User.max("age", { where: { age: { [Op.gt]: 20 } } });
    // const [user, created] = await User.findOrCreate({
    //   where: { firstname: "parth" },
    // });
    return await User.findAndCountAll({
      where: {
        age: {
          [Op.like]: "23%",
        },
      },
    });
  })

  .then((data) => {
    // console.log(json.stringify(data));
    const { count, rows } = data;
    console.log(count);
    console.log(rows);
    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });
  })

  .catch((err) => {
    console.log("Error syncing table and model");
  });
