import React from 'react'
import Input from '../Form/Input/Input'
import Select from '../Form/Select/Select'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddressRegistryScreen = ({ setUpdateAddressScreen, tableRowSelectedObject, setTableRowSelectedObject }) => {
  const street = useForm('street')
  const resident = useForm('resident')
  const [uf, setUf] = React.useState('')
  const [residentsList, setResidentsList] = React.useState([])
  const [currentResidentId, setCurrentResidentId] = React.useState(null)
  const [modalData, setModalData] = React.useState({})

  const {loading, error, doFetch} = useFetch()

  const selectOptions = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

  async function searchResident() {
    if (!residentInputIsFilled()) {
      showModal('Ops...', 'Insira o nome do cliente para buscá-lo')
      return false
    }

    const resident = await fetchToSearchResident()
    
    if (resident !== false) {
      fillResidentInput(resident.nome)
      setCurrentResidentId(resident.id)
    }
  }

  function residentInputIsFilled() {
    return resident.value.length > 0
  }

  function showModal(title, message) {
    setModalData({title, message})
  }

  async function fetchToSearchResident() {
    const residentName = resident.value
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.person.findPersonByName}`.replace(':name', residentName)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const [response, json] = await doFetch(url, options)
    
    if (!response.ok) {
      showModal('Ops...', json.mensagemErro)
      return false
    }

    return json._embedded.pessoaResponseDTOList[0];
  }

  function fillResidentInput(residentName) {
    resident.setValue(residentName)
  }

  function addResident() {
    if (!currentResidentIdExists()) {
      showModal('Morador não selecionado!', 'Busque um morador pelo nome antes de adicioná-lo')
      return false
    }

    addResidentToResidentsList()
  }

  function currentResidentIdExists() {
    return currentResidentId != null
  }

  function addResidentToResidentsList() {
    if (!residentsList.includes(currentResidentId)) {
      setResidentsList([...residentsList, currentResidentId])
      clearCurrentResidentId()
    }
    else
      showModal('Morador já adicionado!', 'Este morador já está na lista de moradores!')
  }

  function clearCurrentResidentId() {
    setCurrentResidentId(null)
    resident.setValue('')
  }

  function removeResident() {
    if (!currentResidentIdExists()) {
      showModal('Morador não selecionado!', 'Busque um morador pelo nome antes de adicioná-lo')
      return false
    }

    removeResidentOfResidentsList()
  }

  function removeResidentOfResidentsList() {
    if (residentsList.includes(currentResidentId)) {
      remove()
      clearCurrentResidentId()
    } else {
      showModal('Morador não adicionado!', 'Este morador não está na lista de moradores')
      clearCurrentResidentId()
    }
  }

  function remove() {
    setResidentsList((prevResidentsList) => {
      return prevResidentsList.filter((residentId) => {
        return residentId !== currentResidentId
      })
    })
  }

  function clearForm() {
    street.setValue('')
    resident.setValue('')
    setUf('')
    setCurrentResidentId(null)
  }

  async function saveAddress() {
    if (!isInputsValid()) {
      showModal('Dados inválidos!', 'Preencha os campos "logradouro" e "UF" no formulário!')
      return false
    }

    if (tableRowSelectedObject) {
      showModal('Erro!', 'Você está fazendo uma operação de atualização de endereço. Para atualizar, clique em "Atualizar Endereço"!')
      return false
    }

    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.address.saveAddress}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        logradouro: street.value,
        uf: uf,
        pessoasId: residentsList
      })
    }

    fetchAPI(url, options)
  }

  function isInputsValid() {
    return street.validateInput() && uf.length > 0
  }

  async function fetchAPI(url, options) {
    const [response, json] = await doFetch(url, options)
    requestFeedback(response, json)
  }

  function requestFeedback(response, json) {
    if (response.ok) {
      showModal('Sucesso!', 'Endereço salvo com sucesso!')
      clearForm()
    }
    else {
      showModal('Erro!', json.mensagemErro)
      clearForm()
    }
  }

  function returnToSearchAddressScreen() {
    setTableRowSelectedObject(null)
    setUpdateAddressScreen(false)
  }

  function updateAddress() {
    if (!tableRowSelectedObject) {
      showModal('Erro!', 'Você está fazendo uma operação de cadastro de endereço. Para salvar, clique em "Salvar Endereço"!')
      return false
    }

    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.address.updateAddress}`.replace(':id', tableRowSelectedObject.id)
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        logradouro: street.value,
        uf: uf,
        pessoasId: residentsList
      })
    }

    fetchAPI(url, options)
  }

  React.useEffect(() => {
    function fillInputsForUpdate() {
      if (tableRowSelectedObject) {
        street.setValue(tableRowSelectedObject.logradouro)
        setUf(tableRowSelectedObject.uf)
      }
    }
    
    fillInputsForUpdate()
  }, [])

  return (
    <>
      {
        tableRowSelectedObject && (
          <Button className='btn btn-danger' description='Voltar' handleClick={returnToSearchAddressScreen} />
        )
      }
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
          <div className='row mt-5 d-flex justify-content-center' >
            <div className='col-auto' >
              <Button className='btn btn-dark' description='Limpar Formulário' handleClick={clearForm} />
            </div>
            <div className='col-auto' >
              <Button className='btn btn-dark' description='Salvar Endereço' handleClick={saveAddress} />
            </div>
            <div className='col-auto' >
              <Button className='btn btn-dark' description='Atualizar Endereço' handleClick={updateAddress} />
            </div>
          </div>
        </form>
        {modalData && <MyModal {...modalData} setModalData={setModalData} />}
      </section>
    </>
  )
}

export default AddressRegistryScreen