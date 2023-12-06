import React from 'react'
import Input from '../Form/Input/Input'
import Select from '../Form/Select/Select'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
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
  const carPlate = useForm('carPlate')
  const [gender, setGender] = React.useState('')
  const [addressId, setAddressId] = React.useState(null)
  const [modalMessage, setModalMessage] = React.useState(null)
  const [modalTitle, setModalTitle] = React.useState(null)

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
    },
    {
      type: 'Text',
      label: 'Placa do Carro',
      id: 'plate',
      placeholder: 'Insira a placa do carro do cliente',
      data: carPlate
    }
  ]

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
    const recoveredAddressId = json._embedded.enderecoResponseDTOList[0].id
    address.setValue(AddressLogradouro)
    setAddressId(recoveredAddressId)
  }

  function clearForm() {
    clearInputValues()
  }

  function clearInputValues() {
    name.setValue('')
    cpf.setValue('')
    email.setValue('')
    birthday.setValue('')
    address.setValue('')    
    setAddressId(null)
    carPlate.setValue('')
    setGender('')
  }

  function saveCustomer() {
    if (isInputsValid()) {
      fetchAPI()
      clearInputValues()
    }
    else {
      setModalTitle('Ops...')
      setModalMessage('Dados inválidos!')
    }
  }

  function isInputsValid() {
    return (
      name.validateInput() &&
      cpf.validateInput() &&
      email.validateInput() &&
      birthday.validateInput() &&
      address.validateInput() &&
      carPlate.validateInput() &&
      (gender === 'Masculino' || gender === 'Feminino')
    )
  }

  async function fetchAPI() {
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.person.savePerson}`.replace(':placa', carPlate.value)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: name.value,
        cpf: assignValue(cpf),
        email: assignValue(email),
        dataNascimento: assignValue(birthday),
        sexo: gender,
        enderecoId: addressId
      })
    }

    const [response, json] = await doFetch(url, options)
    requestFeedback(response)
  }

  function assignValue(input) {
    return input.value.length >= 1 ? input.value : null
  }

  function requestFeedback(response) {
    if (response.ok) {
      setModalTitle('Sucesso!')
      setModalMessage('Cliente cadastrado com sucesso!')
    } else {
      setModalTitle('Ops...')
      setModalMessage('Erro ao cadastrar o cliente!')
    }
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
            <Select
              id='gender'
              label='Gênero'
              options={genderOptions}
              value={gender}
              setValue={setGender}
            />
          </div>
          <div className='col-12' >
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
              className='btn btn-outline-secondary'
              handleClick={searchForAddress}
              description='Buscar Endereço'
            />
          </div>
        </div>
        <div className='row mt-5' >
          <div className='col-6 d-flex justify-content-end' >
            <Button
              className='btn btn-dark'
              handleClick={clearForm}
              description='Limpar Formulário'
            />
          </div>
          <div className='col-6' >
            <Button
              className='btn btn-dark'
              handleClick={saveCustomer}
              description='Salvar Cliente'
            />
          </div>
        </div>
      </form>
      <MyModal message={modalMessage} setModalMessage={setModalMessage} title={modalTitle} setModalTitle={setModalTitle} />
    </section>
  )
}

export default CustomerRegistryScreen