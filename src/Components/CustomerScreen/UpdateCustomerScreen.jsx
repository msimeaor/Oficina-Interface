import React from 'react'
import Button from '../Form/Button/Button'
import Input from '../Form/Input/Input'
import MyModal from '../Modal/MyModal'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import 'bootstrap/dist/css/bootstrap.min.css'

const UpdateCustomerScreen = ({ tableRowSelectedObject, setUpdateCustomerScreen }) => {
  const email = useForm('email')
  const address = useForm('address')
  const [addressId, setAddressId] = React.useState(null)
  const { data, loading, error, doFetch } = useFetch()
  const [modalData, setModalData] = React.useState({})

  React.useEffect(() => {
    tableRowSelectedObject.email ? email.setValue(tableRowSelectedObject.email) : null
    tableRowSelectedObject.enderecoResponse ? insertAddressToInput() : null

    function insertAddressToInput() {
      address.setValue(tableRowSelectedObject.enderecoResponse.logradouro)
      setAddressId(tableRowSelectedObject.enderecoResponse.id)
    }
  }, [])

  async function searchForAddress() {
    if (address.value.length == 0) return false

    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.address.findAddressByLogradouro}`.replace(':logradouro', address.value)
    const [response, json] = await doFetch(url)
    
    // The function returns false and the error that was imported from useFetch will become true, rendering the error message below the address input
    if(json.codigoStatus == 404) return false

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
    email.setValue('')
    address.setValue('')
    setAddressId(null)
  }

  function updateCustomer() {
    if (isInputsValid()) {
      fetchAPI()
      clearInputValues()
    }
    else {
      setModalData({
        ...modalData,
        title: 'Ops...',
        message: 'Dados inválidos!'
      })
    }
  }

  function isInputsValid() {
    return (
      email.validateInput() &&
      address.validateInput()
    )
  }

  async function fetchAPI() {
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.person.updatePerson}`.replace(':id', tableRowSelectedObject.id)
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: tableRowSelectedObject.nome,
        cpf: assignValue(tableRowSelectedObject.cpf),
        email: assignValue(email.value),
        dataNascimento: assignValue(tableRowSelectedObject.dataNascimento),
        sexo: tableRowSelectedObject.sexo,
        enderecoId: addressId
      })
    }

    const [response, json] = await doFetch(url, options)
    requestFeedback(response)
  }

  function assignValue(value) {
    return value ? value : null
  }

  function requestFeedback(response) {
    if (response.ok) {
      setModalData({
        ...modalData,
        title: 'Sucesso!',
        message: 'Cliente atualizado com sucesso!'
      })
    } else {
      setModalData({
        ...modalData,
        title: 'Ops...',
        message: 'Erro ao atualizar o cliente!'
      })
    }
  }

  return (
    <>
      <div>
        <Button className='btn btn-danger' description='Voltar' handleClick={() => setUpdateCustomerScreen(false)} />
      </div>
      <div className='row mt-5' >
        <div className='col' >
          <form onSubmit={(event) => event.preventDefault()} >
            <div className='row' >
              <div className='col-6' >
                <Input
                  id='email'
                  label='Email'
                  type='Text'
                  placeholder='Insira o novo email'
                  {...email}
                />
              </div>
              <div className='col-6' >
                <Input
                  id='address'
                  label='Endereço'
                  type='Text'
                  placeholder='Insira o novo endereço'
                  {...address}
                  error={error}
                />
                <Button
                  className='btn btn-outline-secondary mt-3'
                  description='Buscar Endereço'
                  handleClick={searchForAddress}
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
                  handleClick={updateCustomer}
                  description='Atualizar Cliente'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {modalData ? <MyModal {...modalData} setModalData={setModalData} /> : null}
    </>
  )
}

export default UpdateCustomerScreen