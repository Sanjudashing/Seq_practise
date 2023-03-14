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

const Invoice = sequelize.define(
  "invoice",
  {
    amount: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    demo_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: "demo",
        key: "id",
      },
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  }
);

const User = sequelize.define(
  "demo",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Invoice);
Invoice.belongsTo(User);

sequelize
  .sync()
  .then(async () => {
    const user = await User.findAll({ include: Invoice });
    console.log(JSON.stringify(user, null, 2));
    // const user = await User.findOne({
    //   where: { firstName: "dhiral" },
    //   include: Invoice,
    // });

    // console.log("return data", JSON.stringify(user));
    // const data = await user.getInvoices();
    // console.log(JSON.stringify(data));

    // Invoice.bulkCreate([
    //   {
    //     amount: 12000,
    //     demoId: 1,
    //   },
    //   {
    //     amount: 15000,
    //     demoId: 2,
    //   },
    //   {
    //     amount: 17000,
    //     demoId: 3,
    //   },
    //   {
    //     amount: 5600,
    //     demoId: 4,
    //   },
    // ]);

    // User.bulkCreate([
    //   {
    //     firstName: "sanjay",
    //   },
    //   {
    //     firstName: "jaimin",
    //   },
    //   {
    //     firstName: "krunal",
    //   },
    //   {
    //     firstName: "dhiral",
    //   },
    // ]);
  })
  .catch((err) => {
    console.log(err);
  });
