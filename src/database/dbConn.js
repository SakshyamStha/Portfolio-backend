import mongoose from "mongoose";

const dbconnection = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        dbName: "portfolio",
    })
    .then(()=> {
        console.log("Connected to database");
    })
    .catch((error)=>{
        console.log(`An error occured while connecting to databse: $(error)`);
    });
};

export default dbconnection;