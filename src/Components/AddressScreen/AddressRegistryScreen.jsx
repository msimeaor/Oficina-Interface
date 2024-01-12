import React from 'react'
import Input from '../Form/Input/Input'
import Select from '../Form/Select/Select'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddressRegistryScreen = () => {
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
    
  }

  function removeResident() {
    
  }

  React.useEffect(() => {
    console.log(currentResidentId);
  }, [currentResidentId])

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
      {modalData && <MyModal {...modalData} setModalData={setModalData} />}
    </section>
  )
}

export default AddressRegistryScreen