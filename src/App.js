import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from'./components/Logo/Logo';
import Rank from'./components/Rank/Rank';
import ImageLinkForm from'./components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from'./components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';

const initialstate={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',  
  isSignedin:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialstate;
  } 
  
  loadUser = (data) =>{   
      this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }})
  }
  calculateFaceLocation = (data) =>{
      const face = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftCol:face.left_col*width,
        topRow:face.top_row*height,
        rightCol:(1-face.right_col)*width,
        bottomRow:(1-face.bottom_row)*height
      }
  }
  displayFaceBox = (box) =>{
    this.setState({box})
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  onImageSubmit = () =>{
    const {input,id} = this.state;
    this.setState({imageUrl: input});
    fetch('https://immense-ridge-71330.herokuapp.com/imageurl',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({input})
    })
    .then(response => response.json())
    .then(response =>{
      if(response){
        fetch('https://immense-ridge-71330.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id})
        })
        .then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err => console.log(err));
  }
onRouteChange = (route) =>{
  if(route === 'signin'){
    const init = JSON.parse(JSON.stringify(initialstate));
    this.setState(Object.assign(this.state,init));
  }else if(route === 'home'){
    this.setState({isSignedin:true})
  }
  this.setState({route});
}
onPressEnter = (event) =>{
  if(event.key === 'Enter'){
      return this.onImageSubmit();
  }
}
  




  render(){
    console.log(this.state.user);
    const {isSignedin, imageUrl, box, route, } = this.state;
    return(
      <div className='App'>
        <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin}/>
        {route ==='signin'
          ? <Signin 
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          :(route==='home'  
            ?<div>
                <Logo/>
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />          
                <ImageLinkForm  onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} onPressEnter={this.onPressEnter}/>
                <FaceRecognition box={box} imageUrl={imageUrl}/>
              </div>  
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }        
       
      </div>
    )
  }
}

export default App;