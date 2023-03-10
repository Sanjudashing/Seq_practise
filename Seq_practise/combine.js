const { Sequelize, DataTypes, Op } = require("sequelize");
const bcrypt = require("bcrypt");
const zlib = require("zlib");

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
        const gzippedBuffer = zlib.inflateSync(
          Buffer.from(storedValue, "base64")
        );

        return gzippedBuffer.toString();
      },
      set(value) {
        const gzippedBuffer = zlib.deflateSync(value);
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
    const res = await User.create({
      description: "Hello Guys! how are you",
    });

    return res;
  })

  .then((data) => {
    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });
  })

  .catch((err) => {
    console.log("Error syncing table and model");
  });
