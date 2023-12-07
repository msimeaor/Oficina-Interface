import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import MyTable from '../Table/MyTable'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './SearchCustomerScreen.module.css'

const SearchCustomerScreen = () => {
  const name = useForm('name')
  
  const { data, loading, error, doFetch } = useFetch()
  const [modalData, setModalData] = React.useState({
    title: null,
    message: null
  })
  const tableTitles = ['#', 'Nome', 'Sexo', 'Data de Nascimento', 'Email']
  const tableAttributesDisplayed = ['#', 'nome', 'sexo', 'dataNascimento', 'email']

  function searchForCustomers() {
    if (isInputValid())
      fetchAPI()
    else {
      setModalData({
        ...modalData,
        title: 'Ops...',
        message: 'Insira o nome do cliente para buscá-lo'
      })
    }
  }

  function isInputValid() {
    return name.value.length >= 1
  }

  async function fetchAPI() {
    const url = `${endpointsApi.defaultAddress}${endpointsApi.endpoints.person.findPersonByName}`.replace(':name', name.value)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const [response, json] = await doFetch(url, options)

    if (!response.ok)
      requestFeedback(json)
  }

  function requestFeedback(json) {
    setModalData({
      ...modalData,
      title: 'Ops...',
      message: json.mensagemErro
    })
  }

  return (
    <section className='mt-5 mb-5' >
      <div className='row' >
        <div className='col-lg-2' ></div>
        <div className='col-lg-5 col-9' >
          <div className='form-inline' >
            <Input
              id='name'
              label='Nome'
              type='Text'
              placeholder='Insira o nome do cliente'
              value={name.value}
              handleChange={name.handleChange}
              onBlur={name.onBlur}
              inputClass={styles.inputGrow}
            />
          </div>
        </div>
        <div className='col-lg-3 col-3' >
          <Button
            className='btn btn-outline-dark'
            handleClick={searchForCustomers}
            description='Buscar Cliente'
          />
        </div>
        <div className='col-lg-2' ></div>
      </div>
      { data &&
        <div className='row mt-5' >
          <MyTable tableTitles={tableTitles} tableAttributesDisplayed={tableAttributesDisplayed} tableDataList={data._embedded.pessoaResponseDTOList} />
        </div>
      }
      <MyModal {...modalData} setModalData={setModalData} />
    </section>
  )
}

export default SearchCustomerScreen