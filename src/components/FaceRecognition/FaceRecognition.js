import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({box, imageUrl}) => {
    return (
       <div className='center ma'>
            <div className='absolute mt2'>
            {
                (imageUrl) && <img id='inputimage' src={imageUrl} alt='Uploaded' width='400px' height='auto'/>
            }
            { box.map((element,ind) =>{
                    return (<div className='bounding-box' key={ind} style={{top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left:element.leftCol}}></div>);
                    }
                )   
            }
            </div>
       </div>
    );
}

export default FaceRecognition;