const mongoose = require("mongoose");
import dotenv from "dotenv"
const key = dotenv.config();

const uri = `mongodb+srv://${key.parsed.NEXT_PUBLIC_MONGODB_USERNAME}:${key.parsed.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster0.ildcg.mongodb.net/crud_db?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
    .connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true, //make this true
        autoIndex: true, //make this also true
    }).then(() => {
        console.log("Successfully connected to MongoDB.");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    })

export default mongoose