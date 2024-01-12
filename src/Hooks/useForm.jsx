import React from 'react'

const values = {
  cpf: {
    regex: /^(\d{3})[.]?(\d{3})[.]?(\d{3})[-.]?(\d{2})$/,
    message: 'CPF inválido!'
  },
  email: {
    regex: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    message: 'Email inválido!'
  },
  carPlate: {
    regex: /\w{7}/i,
    message: 'Placa inválida!'
  }
}

const mandatoryFillInputs = ['name', 'carPlate', 'street']

const useForm = (type) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(null)

  function validateInput(inputValue) {
    if (isFilled(inputValue)) {
      return existsValidation() ? validateInputValue(inputValue) : approveValidation()
    } else {
      return isMandatory() ? failValidation() : approveValidation()
    }
  }

  function isFilled(inputValue) {
    return inputValue.length >= 1
  }

  function existsValidation() {
    return typeof values[type] !== 'undefined'
  }

  function validateInputValue(inputValue) {
    if (values[type].regex.test(inputValue) === true) {
      return approveValidation()
    }
    
    return failValidation()
  }

  function approveValidation() {
    setError(null)
    return true
  }

  function isMandatory() {
    return mandatoryFillInputs.includes(type)
  }

  function failValidation() {
    if (existsValidation()) {
      setError(values[type].message)
      return false
    }

    setError('Preenchimento obrigatório!')
    return false
  }

  function handleChange({target}) {
    if (error) validateInput(target.value)
    setValue(target.value)
  }

  return {
    value, 
    setValue, 
    error, 
    validateInput: () => validateInput(value),
    onBlur: () => validateInput(value),
    handleChange
  }

}

export default useForm