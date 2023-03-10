const { HasOne } = require("sequelize");

const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("db_sequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const myFunc = async () => {
  await sequelize.authenticate();
  console.log("connection successfully");
};
myFunc();

const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
    message: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Country.hasMany(Capital);
Capital.belongsTo(Country);

let country, capital;

sequelize
  .sync()
  .then(() => {
    return Country.findOne({ where: { countryName: "Pakistan" } });
    // Capital.bulkCreate([
    //   {
    //     message: "This is capital1.",
    //   },
    //   {
    //     message: "This is capital2.",
    //   },
    //   {
    //     message: "This is capital3.",
    //   },
    //   {
    //     message: "This is capital4.",
    //   },
    // ]);
  })
  .then((data) => {
    country = data;
    // return Capital.findAll();
    return country.countCapital();
  })
  .then((data) => {
    // capital = data;
    // return country.addCapital(capital);
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
