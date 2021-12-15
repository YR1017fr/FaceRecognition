import React from 'react';
import './Loading.css';

const loading = ({isLoad}) =>{
    if(isLoad){
        return(
            <div className='flex'>
                <div className='loading-dot' style={{"--i":1}}></div>
                <div className='loading-dot' style={{"--i":2}}></div>
                <div className='loading-dot' style={{"--i":3}}></div>
                <div className='loading-dot' style={{"--i":4}}></div>
                <div className='loading-dot' style={{"--i":5}}></div>
                <div className='loading-dot' style={{"--i":6}}></div>
                <div className='loading-dot' style={{"--i":7}}></div>
                <div className='loading-dot' style={{"--i":8}}></div>
                <div className='loading-dot' style={{"--i":9}}></div>
            </div>
        )
    }else{
        return <div></div> ;
    }
    
}

export default loading;