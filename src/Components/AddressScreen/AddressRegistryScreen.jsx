import React from 'react'
import Input from '../Form/Input/Input'
import Select from '../Form/Select/Select'
import Button from '../Form/Button/Button'
import useForm from '../../Hooks/useForm'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddressRegistryScreen = () => {
  const street = useForm('street')
  const resident = useForm('resident')
  const [uf, setUf] = React.useState('')

  const selectOptions = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

  function searchResident() {

  }

  function addResident() {
    
  }

  function removeResident() {
    
  }

  return (
    <section className='mt-5 mb-5' >
      <form onSubmit={(event) => event.preventDefault()} >
        <div className='row' >
          <div className='col-6' >
            <div className='form-group' >
              <Input
                id='street'
                label='Logradouro'
                type='Text'
                placeholder='Insira o logradouro'
                {...street}
              />
            </div>
          </div>
          <div className='col-6' >
            <div className='form-group' >
              <Select
                id='uf'
                label='UF'
                options={selectOptions}
                value={uf}
                setValue={setUf}
              />
            </div>
          </div>
        </div>
        <div className='row' >
          <div className='col-12' >
            <div className='form-group' >
              <Input
                id='resident'
                label='Morador'
                type='Text'
                placeholder='Insira o nome do morador'
                {...resident}
              />
            </div>
          </div>
          <div className='col-auto' >
            <Button className='btn btn-outline-secondary' description='Buscar' handleClick={searchResident} />
          </div>
          <div className='col-auto' >
            <Button className='btn btn-outline-secondary' description='Adicionar' handleClick={addResident} />
          </div>
          <div className='col-auto' >
            <Button className='btn btn-outline-secondary' description='Remover' handleClick={removeResident} />
          </div>
        </div>
      </form>
    </section>
  )
}

export default AddressRegistryScreen