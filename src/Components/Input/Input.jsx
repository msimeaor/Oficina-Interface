import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Input = ({ id, label, type, value, handleChange, onBlur, error, placeholder }) => {
  return (
    <div className='form-group' >
      <label htmlFor={id}>
          {label}
      </label>
      <input 
        className='form-control' 
        type={type} 
        id={id} 
        value={value} 
        onChange= {handleChange} 
        onBlur={onBlur} 
        placeholder={placeholder} 
      />
      { 
        error && 
        <small className='form-text text-muted' >
          {error}
        </small>
      }
    </div>
  )
}

export default Input