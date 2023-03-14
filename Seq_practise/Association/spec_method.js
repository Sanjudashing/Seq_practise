const { HasOne } = require("sequelize");

const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("demo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const myFunc = async () => {
  await sequelize.authenticate();
  console.log("connection successfully");
};
myFunc();

const Foo = sequelize.define(
  "country",
  {
    Name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Bar = sequelize.define(
  "capital",
  {
    Name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Foo.hasOne(Bar);
// Bar.belongsTo(Foo);

sequelize.sync({ alter: true }).then(async () => {
  // const foo = await Foo.create({ Name: "the-foo2" });
  // const bar1 = await Bar.create({ Name: "some-bar4" });
  // const bar2 = await Bar.create({ Name: "another-bar5" });
  // console.log(await foo.getCapital());
  // await foo.setCapital(bar1);
  // console.log((await foo.getCapital()).Name);
  // await foo.createCapital({ Name: "yet-another-bar" });
  // const newlyAssociatedBar = await foo.getCapital();
  // console.log(newlyAssociatedBar.Name);
  // await foo.setCapital(null);
  // console.log(await foo.getCapital());
});
