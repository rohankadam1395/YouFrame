const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


const app=express();
app.use(bodyParser.json());

app.get("/api",(req,res)=>{
    console.log("Logging on server");
    res.send("Api called");
});

const port=process.env.PORT || 5000;



app.listen(port,()=>{
console.log(`listening on port ${port}`);
});