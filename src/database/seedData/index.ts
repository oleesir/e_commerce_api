import mongoose, { ConnectOptions } from 'mongoose';
import Product from '../models/productModel';
import dotenv from 'dotenv';
import { brands, categories, cities, getProductsDummyData, states } from '../data/dummyData';
import Category from '../models/categoryModel';
import Brand from '../models/brandModel';
import State from '../models/stateModel';
import City from '../models/cityModel';
dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  )
  .then(() => {
    console.log('Db seeded successfully');
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  await City.deleteMany({});
  await City.insertMany(cities);
  await State.deleteMany({});
  await State.insertMany(states);
  await Brand.deleteMany({});
  await Brand.insertMany(brands);
  await Category.deleteMany({});
  await Category.insertMany(categories);

  const dummyData = await getProductsDummyData();

  await Product.deleteMany({});
  await Product.insertMany(dummyData);
};

seedDB().then(() => {
  mongoose.connection.close();
});
