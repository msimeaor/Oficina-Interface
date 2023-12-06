import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Input = ({ id, label, type, value, handleChange, onBlur, error, placeholder, inputClass }) => {
  return (
    <>
      <label htmlFor={id}>
          {label}
      </label>
      <input 
        className={`form-control ${inputClass}`}
        type={type} 
        id={id} 
        value={value} 
        onChange= {handleChange} 
        onBlur={onBlur} 
        placeholder={placeholder} 
      />
      { 
        error && 
        <small className='form-text text-danger' >
          {error}
        </small>
      }
    </>
  )
}

export default Input