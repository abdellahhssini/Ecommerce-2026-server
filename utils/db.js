import mongoose from "mongoose";

const connectDb = async () => {
    try {
        console.log(process.env.MONGO_URL);
        
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Ecommerce2026",
        });

        console.log("Mongo Db Connected");
        
    } catch (error) {
        console.log(error);
    }
};

export default connectDb;
