const { Sequelize, DataTypes, Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { gzipSync, gunzipSync } = require("zlib");

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
    description: {
      type: DataTypes.STRING,
      get() {
        const storedValue = this.getDataValue("description");
        const gzippedBuffer = Buffer.from(storedValue, "base64");
        const unzippedBuffer = gunzipSync(gzippedBuffer);
        return unzippedBuffer.toString();
      },
      set(value) {
        const gzippedBuffer = gzipSync(value);
        this.setDataValue("description", gzippedBuffer.toString("base64"));
      },
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
      description: "this a combining getter and setter",
    });
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
