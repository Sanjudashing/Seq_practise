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
      get() {
        const rawValue = this.getDataValue("firstname");
        return rawValue.toUpperCase();
      },
    },
    lastname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true,
    },
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstname} ${this.lastname}`;
      },
      set(value) {
        throw new console.error("Not to match `fullname` value!");
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
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
    const t = await User.create({
      firstname: "mukesh",
      lastname: "panara",
    });
    console.log("data inserted", t);
    return t;
  })

  .then((data) => {
    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });
    console.log(data.toJSON());
  })

  .catch((err) => {
    console.log("Error syncing table and model");
  });
