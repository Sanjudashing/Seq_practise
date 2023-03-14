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

const Customer = sequelize.define(
  "customer",
  {
    customerName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Product = sequelize.define(
  "product",
  {
    productName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
const CustomerProduct = sequelize.define(
  "customerproduct",
  {
    customerproductId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Customer.belongsToMany(Product, {
  through: "CustomerProduct",
});
Product.belongsToMany(Customer, {
  through: "CustomerProduct",
});

let customer, product;

sequelize
  .sync()
  .then(() => {
    return Customer.findOne({ where: { customerName: "customer3" } });
    // Customer.bulkCreate([
    //   {
    //     customerName: "customer1",
    //   },
    //   {
    //     customerName: "customer2",
    //   },
    //   {
    //     customerName: "customer3",
    //   },
    //   {
    //     customerName: "customer4",
    //   },
    // ]);

    // Product.bulkCreate([
    //   {
    //     productName: "product1",
    //   },
    //   {
    //     productName: "product2",
    //   },
    //   {
    //     productName: "product3",
    //   },
    //   {
    //     productName: "product4",
    //   },
    // ]);
  })
  .then((data) => {
    customer = data;
    return Product.findOne({ where: { productName: "product1" } });

    //     // return Capital.findAll();
  })
  .then((data) => {
    product = data;
    return customer.addProducts(product);
  })
  .catch((err) => {
    console.log(err);
  });
