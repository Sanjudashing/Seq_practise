const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("seq_model", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
// const myFunc = async () => {
//   await sequelize.authenticate();
//   console.log("connection successfully");
// };
// myFunc();

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
User.sync({ alter: true });
// .then((data) => {
//   return User.create({
//     firstname: "ankit",
//     lastname: "yadav",
//   });
// })

User.findAll()
  // .then(async (data) => {
  // console.log("hey");
  // await data.update({
  //   firstname: "jaimin",
  //   lastname: "patel",
  // });
  // data.save();
  //Update the instance
  // User.update(
  //   { firstname: "jaimin", lastname: "patel" },
  //   { where: { id: 23 } }
  // )
  //   .success((result) => handleResult(result))
  //   .error((err) => handleError(err));
  // data.lastname = "patel";
  // await data.update({ firstname: "jaimin" });
  // await data.save();
  // })
  .then((data) => {
    data.forEach = (element) => {
      console.log(element.toJSON());
    };
  })
  // .then(async (data) => {
  //   // console.log("User added to database");
  //   // return await User.destroy({
  //   //   where: {
  //   //     firstname: "Mona",
  //   //   },
  //   // });
  // })
  // .then((data) => {
  //   console.log("User added");
  //   console.log(data.toJSON());
  // })
  .catch((err) => {
    console.log("Error syncing table and model");
  });

// .then(() => {
//   console.log("User table created successfully!");
// })
// .catch((error) => {
//   console.error("Unable to create table : ", error);
// });
// console.log(User === sequelize.models.User);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database: ", error);
//   });
