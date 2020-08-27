import React from "react";
import axios from 'axios';
import './HomePage.css';

class HomePage extends React.Component{
constructor(props){
    super(props);
this.state={
    clientData:[],
    img:"",
    error:"",
    toggle:false
}
this.handleApi=this.handleApi.bind(this);
// this.handleUpload=this.handleUpload.bind(this);
this.uploadToServer=this.uploadToServer.bind(this);
this.delete=this.delete.bind(this);
this.handleUpload2=this.handleUpload2.bind(this);
this.togglHover=this.togglHover.bind(this);


}
componentDidMount(){
    console.log("Component Mounted");
    this.handleApi();
}
handleApi(){
    console.log("Getting Data");
axios.get('/api').then(response=>{
    console.log(response);
    if(response.data.error){
this.setState({
    error:response.data.error
})
    }else{
        this.setState({
            clientData:response.data
        })
    }
  
})
}
uploadToServer(file){
console.log("File");
// console.log(file);
const fd=new FormData();
 fd.append("fileName",file);
axios.post('/api',fd).then(response=>{
    console.log(response);
if(response.data.error){
this.setState({
    error:response.data.error
})
}else{
    this.handleApi();

    this.setState({
        
        img:response.data
    })
}
   

//     const reader=new FileReader();
// reader.onload=(e)=> {
//         console.log(e.target.result);
//         this.setState({
//             img:e.target.result
//         })
//     };


// reader.readAsDataURL(response.data);
});

}

delete(index){
console.log(index);
axios.delete("/api",{params:{
    id:index
}}).then(response=>{
    if(response.data.error){

    }else{
        console.log(response); 
        this.handleApi(); 
    }
   
})
}


// handleUpload(event){
//     console.log(event);
//     event.preventDefault();
// console.log(event.target.img.files[0]);
// // const reader=new FileReader();
// // reader.onload=(e)=> {
// //         console.log(e.target.result);
// //         this.setState({
// //             img:e.target.result
// //         })
// //     };


// // reader.readAsDataURL(event.target.img.files[0]);
// this.uploadToServer(event.target.img.files[0]);

// }

handleUpload2(event){
    console.log(event.target.files[0]);
    // console.log(event.target.img.files);

     this.uploadToServer(event.target.files[0]);

}

togglHover(event,index){
    console.log("Hovered  "+this.state.toggle+"   "+index);
    // const btnClass=this.state.toggle ? "hoverDelete":"nothoverDelete";
console.log(event.target.button);
this.setState({
    toggle:!this.state.toggle
})
}

render(){
    return(
        <div className="home">
<h1 className="title">YouFrame Gallery</h1>
<div>

{/* <form onSubmit={this.handleUpload} method="post" encType="multipart/form-data" className="form"> */}
    <label className="btn" for="imgUpload">Upload</label>
            <input className="uploadInput" type="file" id="imgUpload" name="img" accept="image/*"  onChange={(event)=>this.handleUpload2(event)}/>

<p className="error">{this.state.error}</p>
            <button type="submit" className="submitButton">Submit</button>
        {/* </form> */}
</div>

        {/* <button onClick={this.handleApi}>GET</button> */}
{this.state.clientData.length ? <div className="imageHolder">
        {this.state.clientData.map((data,index)=>{
                return(
                    // onMouseEnter={(event)=>{ return this.togglHover(event,index);}} onMouseLeave={(event)=>{return this.togglHover(event,index)}}
                 <div key={index} className="imageContainer">
                 <img  className="preview-image"   src={data.img.data}/>
                <div className="ImageTitle"><p className="imageNum">Image{index}</p><button onClick={()=>{return this.delete(data._id)}} className={"deleteBtn"}>X</button>
</div>
                 </div>);
            })
        }
         </div> :<h1>Loading..</h1> }
        
        
        {/* <img  height="50" width="50"  src={this.state.clientData[0]}/> */}
        {/* {this.state.clientData} */}
       
{/* <img height="50" width="50" src={this.state.img}/> */}
{this.state.img}
        </div>
    )
}

}


export default HomePage;