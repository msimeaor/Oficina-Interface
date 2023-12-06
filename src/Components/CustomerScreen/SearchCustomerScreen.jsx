import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import useForm from '../../Hooks/useForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './SearchCustomerScreen.module.css'

const SearchCustomerScreen = () => {
  const name = useForm('name')

  function searchForCustomers() {

  }

  return (
    <section className='mt-5 mb-5' >
      <div className='row d-flex align-items-end' >
        <div className='col-9' >
          <div className='form-inline' >
            <Input
              id='name'
              label='Nome'
              type='Text'
              placeholder='Insira o nome do cliente'
              value={name.value}
              handleChange={name.handleChange}
              onBlur={name.onBlur}
              inputClass={styles.inputGrow}
            />
          </div>
        </div>
        <div className='col-3' >
          <Button
            className='btn btn-outline-dark'
            handleClick={searchForCustomers}
            description='Buscar Cliente'
          />
        </div>
      </div>
    </section>
  )
}

export default SearchCustomerScreen