import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () =>{
    return(
        <div className='ma4 mt0'>
            <Tilt className='br2 shadow-2 pa3' style={{ height: '150px', background: 'linear-gradient(90deg, #08AEEA 0%, #01ce7e 78%)', width:'150px' }}>
                    <img src={brain} alt='brain' style={{paddingTop:'10px'}}/>
            </Tilt>
        </div>
    );
}

export default Logo;


