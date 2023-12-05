import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Button = ({ handleClick, description, className }) => {
  return (
    <button className={className} onClick={handleClick} >
      {description}
    </button>
  )
}

export default Button