import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () =>{
    return(
        <div className='ma4 mt0'>
            <Tilt className='br2 shadow-2 pa3' style={{ height: '150px', background: 'linear-gradient(90deg, rgba(195,49,244,1) 20%, rgba(34,199,203,1) 80%)', width:'150px' }}>
                    <img src={brain} alt='brain' style={{paddingTop:'10px'}}/>
            </Tilt>
        </div>
    );
}

export default Logo;