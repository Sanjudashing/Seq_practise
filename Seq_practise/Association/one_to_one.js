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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Country.hasOne(Capital);
Capital.belongsTo(Country);
// Country.hasMany(Capital);
// Capital.belongsTo(Country);
let country, capital;

sequelize
  .sync()
  .then(async () => {
    return await Country.findOne({ where: { countryName: "Australia" } });
  })
  .then((data) => {
    country = data;

    return Capital.findOne({ where: { capitalName: "Paris" } });
  })
  .then((data) => {
    capital = data;
    return capital.setCountry(country);
  })

  .catch((err) => {
    console.log(err);
  });
