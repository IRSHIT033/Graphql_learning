const express=require('express');
const connectDB=require('./Config/db');
const cors= require("cors")
require('dotenv').config();
const {graphqlHTTP} =require("express-graphql");
const schema=require("./Schema/schema");
const port=4000;
const app=express();
app.use(cors());
connectDB();


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV ==='development'
}));
app.listen(port,console.log(`Server is running on port ${port}`));