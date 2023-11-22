import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Select = ({ id, options, value, setValue, }) => {

  function handleChange({target}) {
    setValue(target.value)
  }

  return (
    <select className='custom-select' id={id} value={value} onChange={handleChange} >
      <option value="" disabled >Selecione</option>
      {
        options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))
      }
    </select>
  )
}

export default Select