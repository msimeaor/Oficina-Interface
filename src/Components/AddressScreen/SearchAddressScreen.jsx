import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import MyTable from '../Table/MyTable'
import AddressRegistryScreen from './AddressRegistryScreen'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import styles from './SearchAddressScreen.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchAddressScreen = () => {
  const street = useForm('street')
  const [modalData, setModalData] = React.useState({})
  const [tableRowSelectedObject, setTableRowSelectedObject] = React.useState(null)
  const [updateAddressScreen, setUpdateAddressScreen] = React.useState(false)
  const {data, loading, error, doFetch} = useFetch()

  const tableTitles = ['#', 'Logradouro', 'UF']
  const tableAttributesDisplayed = ['#', 'logradouro', 'uf']
  const tableNavigationButtons = [
    {
      classname: 'btn btn-dark',
      divButtonClassName: `${styles.prevTablePageButton}`,
      handleClick: switchToPreviousTablePage,
      description: '🡰'
    },
    {
      classname: 'btn btn-dark',
      divButtonClassName: `${styles.centerTableButtonNavigation}`,
      handleClick: updateAddress,
      description: 'Atualizar Dados'
    },
    {
      classname: 'btn btn-dark',
      divButtonClassName: `${styles.nextTablePageButton}`,
      handleClick: switchToNextTablePage,
      description: '🡲'
    }
  ]

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

  function switchToPreviousTablePage() {
    const currentPage = data.page.number

    if (currentPage > 0) {
      const previousPageURL = data._links.prev.href
      switchPage(previousPageURL)
    } else {
      showModal('Página não encontrada!', 'Você já está na primeira página!')
    }
  }

  async function switchPage(url) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await doFetch(url, options)
    setTableRowSelectedObject(null)
  }

  function updateAddress() {
    if (!someTableRowIsSelected()) {
      showModal('Endereço não selecionado!', 'Selecione um endereço para atualizar seus dados!')
      return false
    }

    setUpdateAddressScreen(true)
  }

  function someTableRowIsSelected() {
    return tableRowSelectedObject !== null
  }

  function switchToNextTablePage() {
    const currentPage = data.page.number
    const totalPages = data.page.totalPages

    if (currentPage < totalPages - 1) {
      const nextPageURL = data._links.next.href
      switchPage(nextPageURL)
    } else {
      showModal('Página não encontrada!', 'Você já está na ultima página!')
    }
  }

  if (!updateAddressScreen)
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
        {
          data && !error &&
          <>
            <div className='row mt-5' >
              <MyTable tableTitles={tableTitles} tableAttributesDisplayed={tableAttributesDisplayed} tableDataList={data._embedded.enderecoResponseDTOList} setTableRowSelectedObject={setTableRowSelectedObject} />
            </div>
            <div className='row mt-5' >
              {
                tableNavigationButtons.map((buttonInfo, index) => (
                  <div key={index} className={`col ${buttonInfo.divButtonClassName}`}  >
                    <Button className={buttonInfo.classname} description={buttonInfo.description} handleClick={buttonInfo.handleClick} />
                  </div>
                ))
              }
            </div>
          </>
        }
        {modalData && <MyModal {...modalData} setModalData={setModalData} />}
      </section>
    )
  else
    return <AddressRegistryScreen setUpdateAddressScreen={setUpdateAddressScreen} tableRowSelectedObject={tableRowSelectedObject} setTableRowSelectedObject={setTableRowSelectedObject} />
}

export default SearchAddressScreen