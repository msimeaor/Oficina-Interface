import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import styles from './SearchPhoneScreen.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchPhoneScreen = () => {
  const phoneNumber = useForm('phoneNumber')
  const {data, loading, error, doFetch} = useFetch()
  const [modalData, setModalData] = React.useState({})

  function searchForPhones() {
    if (!isInputFilled()) {
      showModal('Erro!', 'Insira um número de telefone para buscá-lo')
      return false
    }

    fetchForSearchPhone()
  }

  function isInputFilled() {
    return phoneNumber.value.length > 0
  }

  function showModal(title, message) {
    setModalData({title, message})
  }

  async function fetchForSearchPhone() {
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.phones.findPhoneByNumero}`.replace(':numero', phoneNumber.value)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const [response, json] = await doFetch(url, options)

    if (!response.ok)
      showModal('Telefone não encontrado!', 'Não existem telefones cadastrados com este numero!')

    // If the response.ok becomes true, the data will be filled and the table will be rendered
  }

  return (
    <section className='mt-5 mb-5' >
      <div className='row' >
        <div className='col-lg-2' ></div>
        <div className='col-lg-5 col-9' >
          <div className='form-inline' >
            <Input
              id='phoneNumber'
              label='Número'
              type='Text'
              placeholder='Insira o número do telefone'
              value={phoneNumber.value}
              handleChange={phoneNumber.handleChange}
              onBlur={phoneNumber.onBlur}
              inputClass={styles.inputGrow}
            />
          </div>
        </div>
        <div className='col-lg-3 col-3' >
          <Button
            className='btn btn-outline-dark'
            handleClick={searchForPhones}
            description='Buscar Telefone'
          />
        </div>
        <div className='col-lg-2' ></div>
      </div>
      {modalData && <MyModal {...modalData} setModalData={setModalData} />}
    </section>
  )
}

export default SearchPhoneScreen