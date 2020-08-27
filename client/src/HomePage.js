import React from "react";
import axios from 'axios';
import './HomePage.css';

class HomePage extends React.Component{
constructor(props){
    super(props);
this.state={
    clientData:[],
    img:""
}
this.handleApi=this.handleApi.bind(this);
this.handleUpload=this.handleUpload.bind(this);
this.uploadToServer=this.uploadToServer.bind(this);

}

handleApi(){
axios.get('/api').then(response=>{
    console.log(response);
    this.setState({
        clientData:response.data
    })
})
}
uploadToServer(file){
console.log("File");
// console.log(file);
const fd=new FormData();
 fd.append("fileName",file);
axios.post('/api',fd).then(response=>{
    console.log(response);
    this.setState({
        
        img:response.data
    })

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
handleUpload(event){
    event.preventDefault();
console.log(event.target.img.files[0]);
// const reader=new FileReader();
// reader.onload=(e)=> {
//         console.log(e.target.result);
//         this.setState({
//             img:e.target.result
//         })
//     };


// reader.readAsDataURL(event.target.img.files[0]);
this.uploadToServer(event.target.img.files[0]);
}

render(){
    return(
        <div className="home">
<h1>You Frame</h1>
        <button onClick={this.handleApi}>GET</button>
        <ol>
            {this.state.clientData.map((data,index)=>{
                return <li key={index}><img  height="50" width="50"  src={data.img.data}/></li>
            })}
        </ol>
        {/* <img  height="50" width="50"  src={this.state.clientData[0]}/> */}
        {/* {this.state.clientData} */}
        <form onSubmit={this.handleUpload} method="post" encType="multipart/form-data">
            <input type="file" id="img" name="img" accept="image/*"/>
            <button type="submit" >Submit</button>
        </form>
{/* <img height="50" width="50" src={this.state.img}/> */}
{this.state.img}
        </div>
    )
}

}


export default HomePage;