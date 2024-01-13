import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import endpointsApi from '../../json/EndpointsApi.json'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import 'bootstrap/dist/css/bootstrap.min.css'

const PhoneRegistryScreen = () => {
  const number = useForm('phoneNumber')
  const owner = useForm('phoneOwner')
  const [currentOwnerId, setCurrentOwnerId] = React.useState(null)
  const [ownerId, setOwnerId] = React.useState(null)
  const [modalData, setModalData] = React.useState({})
  const {data, loading, error, doFetch} = useFetch()

  async function searchOwner() {
    if (!ownerInputIsFilled()) {
      showModal('Erro!', 'Digite o nome do proprietário para adicioná-lo')
      return false
    }

    const ownerSearched = await fetchToSearchOwner()

    if (ownerSearched !== false) {
      fillOwnerInput(ownerSearched.nome)
      setCurrentOwnerId(ownerSearched.id)
    }
  }

  function ownerInputIsFilled() {
    return owner.value.length > 0
  }

  function showModal(title, message) {
    setModalData({title, message})
  }

  async function fetchToSearchOwner() {
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.person.findPersonByName}`.replace(':name', owner.value)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const [response, json] = await doFetch(url, options)
    
    if (!response.ok) {
      showModal('Erro!', json.mensagemErro)
      return false
    }

    return json._embedded.pessoaResponseDTOList[0]
  }

  function fillOwnerInput(ownerName) {
    owner.setValue(ownerName)
  }

  function addOwner() {
    if (!currentOwnerIdExists()) {
      showModal('Erro!', 'Busque um proprietário antes de adicioná-lo!')
      return false
    }

    defineOwnerId()
  }

  function currentOwnerIdExists() {
    return currentOwnerId !== null
  }

  function defineOwnerId() {
    setOwnerId(currentOwnerId)
    owner.setValue('')
    setCurrentOwnerId(null)
  }

  function clearForm() {
    number.setValue('')
    owner.setValue('')
    setCurrentOwnerId(null)
  }

  function savePhone() {
    if (!isInputsValid()) {
      showModal('Dados inválidos!', 'Insira um numero de telefone ou um proprietário!')
      return false
    }
    
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.phones.savePhone}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero: number.value,
        pessoaId: ownerId
      })
    }

    fetchAPI(url, options)
  }

  function isInputsValid() {
    return number.validateInput() && ownerId !== null
  }

  async function fetchAPI(url, options) {
    const [response, json] = await doFetch(url, options)
    requestFeedback(response, json)
  }

  function requestFeedback(response, json) {
    if (!response.ok) {
      showModal('Erro!', json.mensagemErro)
      clearForm()
    } else {
      showModal('Sucesso!', 'Telefone salvo com sucesso!')
      clearForm()
    }
  }

  function updatePhone() {

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
        </div>
        <div className='row mt-5 d-flex justify-content-center' >
          <div className='col-auto' >
            <Button className='btn btn-dark' description='Limpar Formulário' handleClick={clearForm} />
          </div>
          <div className='col-auto' >
            <Button className='btn btn-dark' description='Salvar Telefone' handleClick={savePhone} />
          </div>
          <div className='col-auto' >
            <Button className='btn btn-dark' description='Atualizar Telefone' handleClick={updatePhone} />
          </div>
        </div>
      </form>
      {modalData && <MyModal {...modalData} setModalData={setModalData} />}
    </section>
  )
}

export default PhoneRegistryScreen