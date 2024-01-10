import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Select = ({ id, label, options, value, setValue, hidden }) => {

  function handleChange({target}) {
    setValue(target.value)
  }

  return (
      <div>
        <label htmlFor={id}>{label}</label>
        <select className='custom-select' id={id} value={value} onChange={handleChange} hidden={hidden} >
          <option value="" defaultValue={true} >Selecione</option>
          {
            options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))
          }
        </select>
      </div>
  )
}

export default Select