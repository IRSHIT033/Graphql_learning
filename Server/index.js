const express=require('express');
const connectDB=require('./Config/db');

require('dotenv').config();
const {graphqlHTTP} =require("express-graphql");
const schema=require("./Schema/schema");
const port=4000;
const app=express();

connectDB();


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV ==='development'
}));
app.listen(port,console.log(`Server is running on port ${port}`));