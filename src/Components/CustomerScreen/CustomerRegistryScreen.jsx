import React from 'react'
import Input from '../Form/Input/Input'
import Select from '../Form/Select/Select'
import Button from '../Form/Button/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import 'bootstrap/dist/css/bootstrap.min.css'

const CustomerRegistryScreen = () => {
  const name = useForm('name')
  const cpf = useForm('cpf')
  const email = useForm('email')
  const address = useForm('address')
  const birthday = useForm('birthday')
  const [gender, setGender] = React.useState('')

  const { data, loading, error, doFetch } = useFetch()

  const genderOptions = ['Masculino', 'Feminino']

  const inputsValues = [
    {
      type: 'Text',
      label: 'Nome',
      id: 'name',
      placeholder: 'Insira o nome do cliente',
      data: name
    },
    {
      type: 'Text',
      label: 'CPF',
      id: 'cpf',
      placeholder: 'Insira o CPF do cliente',
      data: cpf
    },
    {
      type: 'Text',
      label: 'Email',
      id: 'email',
      placeholder: 'Insira o email do cliente',
      data: email
    },
    {
      type: 'Date',
      label: 'Data de Nascimento',
      id: 'birthday',
      placeholder: '',
      data: birthday
    }
  ]

  let requestData = {
    nome: null,
    email: null,
    cpf: null,
    sexo: null,
    dataNascimento: null,
    enderecoId: null
  }

  async function searchForAddress() {
    if (address.value.length == 0) return false

    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.address.findAddressByLogradouro}`.replace(':logradouro', address.value)
    const [response, json] = await doFetch(url)
    
    // The function returns false and the error that was imported from useFetch will become true, rendering the error message below the address input
    if(!json) return false

    fillAddressInput(json)
  }

  function fillAddressInput(json) {
    const AddressLogradouro = json._embedded.enderecoResponseDTOList[0].logradouro
    const addressId = json._embedded.enderecoResponseDTOList[0].id
    address.setValue(AddressLogradouro)
    requestData.enderecoId = addressId
  }

  return (
    <section className='mt-5 mb-5' >
      <form onSubmit={(event) => event.preventDefault()} >
        <div className='row' >
          {
            inputsValues.map((inputValues) => (
              <div key={inputValues.id} className='col-6' >
                <Input
                  id={inputValues.id}
                  label={inputValues.label}
                  type={inputValues.type}
                  placeholder={inputValues.placeholder}
                  {...inputValues.data}
                />
              </div>
            ))
          }
          <div className='col-6' >
            <Input
              id='address'
              label='Endereço'
              type='Text'
              placeholder='Insira o logradouro do cliente'
              {...address}
              // This error overwrites the error whitin {...address}. This error comes from useFetch and, when it becomes true, an error message will be rendered below the input.
              error={error}
            />
            <Button
              handleClick={searchForAddress}
              description='Buscar Endereço'
            />
          </div>
          <div className='col-6' >
            <Select
              id='gender'
              label='Gênero'
              options={genderOptions}
              value={gender}
              setValue={setGender}
            />
          </div>
        </div>
        <div className='row mt-5' >
          <div className='col-6 d-flex justify-content-end' >
            {/*Create a function for button to clear the form*/}
            <Button
              description='Limpar Formulário'
            />
          </div>
          <div className='col-6' >
            {/*Create a function for button to save the customer*/}
            <Button
              description='Salvar Cliente'
            />
          </div>
        </div>
      </form>
    </section>
  )
}

export default CustomerRegistryScreen