import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import { Component } from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';

const returnClarifaiRequestOptions = (imageUrl) => {
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '67332b3a08994dd28b520e626670f4df';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'kulya1986';       
    const APP_ID = 'facefinder';
    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
}

class App extends Component {
  constructor(){
      super();
      this.state={
        input:'',
        imageUrl:'',
        box:[{}],
        route: 'signin',
        isSignedIn: false,
        user:{
          id:'',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
      }
  }

loadUser = (data) => {
    this.setState({user: {
          id:data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
    }})
}


  calculateFaceLocation = (data) =>{
    
    const regionsArray = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceAreas = regionsArray.map(item => {
          const box = item.region_info.bounding_box;
          return {
            leftCol: box.left_col * width,
            topRow: box.top_row * height,
            rightCol: width - (box.right_col * width),
            bottomRow: height - (box.bottom_row*height),
          }
    });
    return faceAreas;
  }

  outlineFaceArea = (boxes) =>{
    console.log(boxes);
    this.setState({box : boxes});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(result => {
          if (result) {
            fetch('http://localhost:3000/image', {
              method: "PUT",
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify(
                  {
                      id:this.state.user.id
                  })
            }).then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user,{entries:count}))
              })
          }
          this.outlineFaceArea(this.calculateFaceLocation(result))
        }) 
        .catch(error => console.log(error));
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const {isSignedIn, imageUrl, box, route} = this.state;
    return(
          <div className="App">
              <ParticlesBg color="#e9c4f6" num={80} type="cobweb" bg={true} />
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
              { this.state.route === 'home'
                  ? <div>
                        <Logo/>
                        <Rank userName={this.state.user.name} userRank={this.state.user.entries}/>
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                  : (
                    (route === 'signin' || route === 'signout')
                    ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  )  
              }
              
          </div>
    );      
  }
}

export default App;
