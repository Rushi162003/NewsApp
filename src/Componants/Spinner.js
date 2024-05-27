import React from 'react'
import load from '../loading.gif'
const Spinner = () => {

    return (
        <div className='text-center'>
            <img className='my-3' style={{ height: "30px", }} src={load} alt="loading" />
        </div>
    )
}


export default Spinner
