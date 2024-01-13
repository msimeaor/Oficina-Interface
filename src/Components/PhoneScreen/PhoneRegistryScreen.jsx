import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Input from '../Form/Input/Input'
import useForm from '../../Hooks/useForm'
import Button from '../Form/Button/Button'

const PhoneRegistryScreen = () => {
  const number = useForm('phoneNumber')
  const owner = useForm('phoneOwner')

  function searchOwner() {

  }

  function addOwner() {

  }

  function removeOwner() {

  }

  return (
    <section className='mt-5 mb-5' >
      <form onSubmit={(event) => event.preventDefault()} >
        <div className='row' >
          <div className='col-6' >
            <div className='form-group' >
              <Input
                id='phoneNumber'
                label='Numero'
                type='Text'
                placeholder='Insira o numero do telefone'
                {...number}
              />
            </div>
          </div>
          <div className='col-6' >
            <div className='form-group' >
              <Input
                id='owner'
                label='Proprietário'
                type='Text'
                placeholder='Insira o nome do proprietário do telefone'
                {...owner}
              />
            </div>
          </div>
        </div>
        <div className='row d-flex justify-content-end' >
            <div className='col-auto' >
              <Button className='btn btn-outline-secondary' description='Buscar' handleClick={searchOwner} />
            </div>
            <div className='col-auto' >
              <Button className='btn btn-outline-secondary' description='Adicionar' handleClick={addOwner} />
            </div>
            <div className='col-auto' >
              <Button className='btn btn-outline-secondary' description='Remover' handleClick={removeOwner} />
            </div>
          </div>
      </form>
    </section>
  )
}

export default PhoneRegistryScreen