import React from 'react';
import './Recognition.css';

const Recognition = ({imageUrl, box , isLoad})=>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'> 
                {
                    isLoad
                    ?<div className='flex'>
                        <div className='dot' style={{"--i":1}}></div>
                        <div className='dot' style={{"--i":2}}></div>
                        <div className='dot' style={{"--i":3}}></div>
                        <div className='dot' style={{"--i":4}}></div>
                        <div className='dot' style={{"--i":5}}></div>
                        <div className='dot' style={{"--i":6}}></div>
                        <div className='dot' style={{"--i":7}}></div>
                        <div className='dot' style={{"--i":8}}></div>
                        <div className='dot' style={{"--i":9}}></div>
                    </div>
                    :<div></div>
                }
                <img id='inputImage' 
                    alt='' 
                    src={imageUrl}
                    width='500px' 
                    height='auto'/>
                <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
            </div>
        </div>
    );
}

export default Recognition;