import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import useForm from '../../Hooks/useForm'
import styles from './SearchPhoneScreen.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchPhoneScreen = () => {
  const phoneNumber = useForm('phoneNumber')

  function searchForPhones() {
    
  }

  return (
    <section className='mt-5 mb-5' >
      <div className='row' >
        <div className='col-lg-2' ></div>
        <div className='col-lg-5 col-9' >
          <div className='form-inline' >
            <Input
              id='phoneNumber'
              label='Número'
              type='Text'
              placeholder='Insira o número do telefone'
              value={phoneNumber.value}
              handleChange={phoneNumber.handleChange}
              onBlur={phoneNumber.onBlur}
              inputClass={styles.inputGrow}
            />
          </div>
        </div>
        <div className='col-lg-3 col-3' >
          <Button
            className='btn btn-outline-dark'
            handleClick={searchForPhones}
            description='Buscar Telefone'
          />
        </div>
        <div className='col-lg-2' ></div>
      </div>
    </section>
  )
}

export default SearchPhoneScreen