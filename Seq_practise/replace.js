const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

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

      //   get() {
      //     const rawValue = this.getDataValue("firstname");
      //     return rawValue.toUpperCase();
      //   },
    },
    lastname: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        // customValidator(value) {
        //   if (value == 10) {
        //     throw new Error("name can't be null unless age is 10");
        //   } else {
        //     throw new Error("can't inserted");
        //   }
        // },
        myEmailValidator(value) {
          if (value === null) {
            throw new Error("please enter the mail");
          }
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync()
  .then(async (data) => {
    // [result, metadata] = await sequelize.query(
    //   "Update user set age=50 where firstname='sunny' ",
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );
    const t = await sequelize.query(
      'SELECT *, "text with literal $$1 and literal $$firstname" as t FROM user WHERE firstname = $1',
      {
        // replacements: { firstname: "sunny" },
        bind: ["parth"],
        type: QueryTypes.SELECT,
      }
    );

    console.log("result" + JSON.stringify(t));
    // console.log("metadata" + JSON.stringify(metadata));
  })
  //   .then((data) => {
  //     data.forEach((element) => {
  //       console.log(element.toJSON());
  //     });
  //   })
  //     // console.log(JSON.stringify(data));
  //     console.log(data.toJSON());
  //   })

  .catch((err) => {
    console.log(err);
  });
