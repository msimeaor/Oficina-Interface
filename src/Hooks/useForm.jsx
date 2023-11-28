import React from 'react'

const values = {
  cpf: {
    regex: /^(\d{3})[.]?(\d{3})[.]?(\d{3})[-.]?(\d{2})$/g,
    message: 'CPF inválido!'
  },
  email: {
    regex: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gi,
    message: 'Email inválido!'
  }
}

const mandatoryFillInputs = ['name']

const useForm = (type) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(null)

  function validateInput(value) {
    if (isMandatoryFill()) {
      return existsValidationForThisInput() ? checkInputValue(value) : checkIfItsFilled(value)

    } else if (isInputNotEmpty(value)) {
      return existsValidationForThisInput() ? checkInputValue(value) : returnCaseInputItsValid()
    }

    returnCaseInputItsValid()
  }

  function isMandatoryFill() {
    return mandatoryFillInputs.includes(type)
  }

  function existsValidationForThisInput() {
    return typeof values[type] === 'undefined' ? false : true 
  }

  function checkInputValue(value) {
    if (values[type].regex.test(value)) {
      returnCaseInputItsValid()

    } else {
      setError(values[type].message)
      return false
    }
  }

  function returnCaseInputItsValid() {
    setError(null)
    return true
  }

  function checkIfItsFilled(value) {
    if (value.length >= 1) {
      returnCaseInputItsValid()
      
    } else {
      setError('Preenchimento Obrigatório')
      return false
    }
  }

  function isInputNotEmpty(value) {
    return value.length !== 0
  }

  function handleChange({target}) {
    if (error) validateInput(target.value)
    setValue(target.value)
  }

  return {
    value, 
    setValue, 
    error, 
    validateInput,
    onBlur: ({target}) => validateInput(target.value),
    handleChange
  }

}

export default useForm