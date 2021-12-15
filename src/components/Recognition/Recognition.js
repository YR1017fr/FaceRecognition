import React from 'react';
import './Recognition.css';
import Loading from '../Loading/Loading';

const Recognition = ({imageUrl, box , isLoad})=>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'> 
                <Loading isLoad={isLoad}/>
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