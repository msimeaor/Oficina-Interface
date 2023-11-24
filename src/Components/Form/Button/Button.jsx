import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Button = ({ handleClick, description }) => {
  return (
    <button className='btn btn-outline-primary' onClick={handleClick} >
      {description}
    </button>
  )
}

export default Button