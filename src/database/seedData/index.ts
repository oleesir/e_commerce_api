import mongoose, { ConnectOptions } from 'mongoose';
import Product from '../models/productModel';
import dotenv from 'dotenv';
import { getProductsDummyData } from '../data/dummyData';
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
  const dummyData = await getProductsDummyData();
  await Product.deleteMany({});
  await Product.insertMany(dummyData);
};

seedDB().then(() => {
  mongoose.connection.close();
});
