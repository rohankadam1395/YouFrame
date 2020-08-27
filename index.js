if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();

}
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var multiparty=require('multiparty');
var fs=require('fs');
const e = require('express');
var path=require('path');
const app=express();
app.use(bodyParser.json());


// var images=[];
// var imageLinks=[];

const Schema=mongoose.Schema;

var imageSchema=new Schema({
    name:String,
    size:Number,
    img:{
        data:String,
        contentType:String
    }
});

var imageModel=mongoose.model('imageModel',imageSchema);


mongoose.connect(process.env.MONGODB,{useUnifiedTopology: true,useNewUrlParser: true},(err)=>{
    if(err){
        console.log(err);
// res.send({data:"Error Connecting to Database"});
    }else{
console.log("Connected to database");


app.get("/api",(req,res)=>{
    console.log("Logging on server");
    imageModel.find({},null,{sort:{_id:-1}},(err,docs)=>{
if(err){
    console.log(err);
res.send({error:"Error in fetching Data"});
}else{
  //  console.log(docs);
    res.send(docs);
}
    })

//     for(let file of  images){
// console.log(file.path);
// fs.readFile(filepath,{encoding:'base64'},(err,data)=>{
//     var img=document.createElement("img");
//     img.src="data:image/png;base64, "+data;

//     imagehtml.push(img);

// });


//     }

    // res.send(imageLinks);
});

app.post("/api",(req,res)=>{
    var form=new multiparty.Form();
    form.parse(req,(err,fields,files)=>{
        console.log("Image Received");
        console.log(files);
        console.log(fields);
        console.log(req.headers)
//  images.push(files.fileName[0]);
// console.log(images.length);
// const reader=new FileReader();
if(err){
res.send({error:"Error in Parsing form"});
}else{
    fs.readFile(files.fileName[0].path,{encoding:'base64'},(err,data)=>{
        // console.log(data.toString('BASE64'));
            // res.set({'Content-type':'image/jpg'});
        //     var img=document.createElement("img");
        //     img.src="data:image/png;base64, "+data;
        // console.log(typeof(data));
        // imageLinks.push("data:image/png;base64, "+data);
        
        var ext=path.extname(files.fileName[0].path).toLowerCase();
        var supportedExtensions=["apng","bmp",
            "gif","ico","cur",
            "jpg","jpeg","jfif","pjpeg","pjp",
            "png",
            "svg",
            "tif",
            "tiff",
            "webp"];
        
        
        if(supportedExtensions.indexOf(ext)!==-1){
            let obj={
                name:files.fileName[0].originalFilename,
                size:files.fileName[0].size,
                img:{
                    data:"data:image/png;base64, "+data,
                    contentType:"image/png"
                }
            }
            var doc=new imageModel(obj);
            doc.save((err)=>{
                if(err){
            res.send({error:"Error in saving data"});
                }else{
                    res.send(files.fileName[0].originalFilename+" Uploaded");
                }
            });
        }else{

            res.send({error:"File Format Not Supported"});
        
        }
        
        
        
        
        });
}



// var imageAsBase64=fs.readFileSync(files.fileName[0].path,'base64');
// console.log(imageAsBase64);
// reader.onload=(e)=> {
// res.send(e.target.result);
// }
// reader.readAsDataURL(files.fileName[0]);
    })
    
})

app.delete("/api",(req,res)=>{  
console.log(req.query);
// imageModel.deleteOne({_id:req.body.id},(err,res)=>{
//     if(err){
// res.json(err);
//     }else{
//         res.send("  Deleted");

//     }
// });

imageModel.deleteOne({_id:req.query.id},(err,res2)=>{
    if(err){
res.send({error:"Error in deleting the Image"});
    }else{
        console.log(res2);
        res.send("Delete");
    }
   

})
})




if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

    }
});


const port=process.env.PORT || 5000;



app.listen(port,()=>{
console.log(`listening on port ${port}`);
});