import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import styles from './SearchAddressScreen.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchAddressScreen = () => {
  const street = useForm('street')
  const [modalData, setModalData] = React.useState({})

  const {data, loading, error, doFetch} = useFetch()

  function searchForAddressess() {
    if (!isInputFilled()) {
      showModal('Erro!', 'Insira um logradouro para buscá-lo')
      return false
    }

    fetchToSearchAddress()
  }

  function isInputFilled() {
    return street.value.length > 0
  }

  function showModal(title, message) {
    setModalData({title, message})
  }

  async function fetchToSearchAddress() {
    const addressStreet = street.value
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.address.findAddressByLogradouro}`.replace(':logradouro', addressStreet)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const [response, json] = await doFetch(url, options)
    
    if (!response.ok) {
      showModal('Logradouro não encontrado!', json.mensagemErro)
    }

    // If the fetch returns the address list, the "data" attribute will be filled and the table will be rendered
  }

  return (
    <section className='mt-5 mb-5' >
      <div className='row' >
        <div className='col-lg-2' ></div>
        <div className='col-lg-5 col-9' >
          <div className='form-inline' >
            <Input
              id='street'
              label='Logradouro'
              type='Text'
              placeholder='Insira o logradouro'
              value={street.value}
              handleChange={street.handleChange}
              onBlur={street.onBlur}
              inputClass={styles.inputGrow}
            />
          </div>
        </div>
        <div className='col-lg-3 col-3' >
          <Button
            className='btn btn-outline-dark'
            handleClick={searchForAddressess}
            description='Buscar Logradouro'
          />
        </div>
        <div className='col-lg-2' ></div>
      </div>
      {modalData && <MyModal {...modalData} setModalData={setModalData} />}
    </section>
  )
}

export default SearchAddressScreen