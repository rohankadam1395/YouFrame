import React from "react";
import axios from 'axios';
import './HomePage.css';
class HomePage extends React.Component{
constructor(props){
    super(props);
this.state={
    clientData:"Init"
}
this.handleApi=this.handleApi.bind(this);
this.handleUpload=this.handleUpload.bind(this);

}

handleApi(){
axios.get('/api').then(response=>{
    console.log(response);
    this.setState({
        clientData:response.data
    })
})
}

handleUpload(event){
console.log(event.target.value);
}

render(){
    return(
        <div class="home">
<h1>You Frame</h1>
<input type="text" id="inputBox"/>
        <button onClick={this.handleApi}>GET</button>
        {this.state.clientData}
        <form>
            <input onChange={this.handleUpload} type="file"/>
        </form>

        </div>
    )
}

}


export default HomePage;