import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://NIMESH939:120488@cluster0.n5jhs.mongodb.net/food-delivery"
    )
    .then(() => console.log("DB Connected."));
};
