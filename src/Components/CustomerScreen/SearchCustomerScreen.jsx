import React from 'react'
import Input from '../Form/Input/Input'
import Button from '../Form/Button/Button'
import MyModal from '../Modal/MyModal'
import MyTable from '../Table/MyTable'
import TableOfModal from '../Table/TableOfModal'
import UpdateCustomerScreen from './UpdateCustomerScreen'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import endpointsApi from '../../json/EndpointsApi.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './SearchCustomerScreen.module.css'

const SearchCustomerScreen = () => {
  const name = useForm('name')
  
  const [updateCustomerScreen, setUpdateCustomerScreen] = React.useState(false)
  const [tableRowSelectedObject, setTableRowSelectedObject] = React.useState(null)
  const { data, loading, error, doFetch } = useFetch()
  const [modalData, setModalData] = React.useState({
    title: null,
    message: null
  })
  const tableTitles = ['#', 'Nome', 'Sexo', 'Data de Nascimento', 'Email']
  const tableAttributesDisplayed = ['#', 'nome', 'sexo', 'dataNascimento', 'email']
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
      handleClick: checkAddress,
      description: 'Consultar Endereço'
    },
    {
      classname: 'btn btn-dark',
      divButtonClassName: `${styles.centerTableButtonNavigation}`,
      handleClick: showUpdateCustomerScreen,
      description: 'Atualizar Dados'
    },
    {
      classname: 'btn btn-dark',
      divButtonClassName: `${styles.centerTableButtonNavigation}`,
      handleClick: checkPhones,
      description: 'Consultar Telefones'
    },
    {
      classname: 'btn btn-dark',
      divButtonClassName: `${styles.nextTablePageButton}`,
      handleClick: switchToNextTablePage,
      description: '🡲'
    }
  ]

  function searchForCustomers() {
    if (isInputValid()) {
      setTableRowSelectedObject(null)
      fetchAPI()
    }
    else
      showModal('Campo vazio!', 'Insira o nome do cliente para buscá-lo')
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
      showModal('Ops...', json.mensagemErro)
  }

  function showModal(title, message) {
    setModalData({title, message})
  }

  function switchToPreviousTablePage() {
    const currentPage = data.page.number
    
    if (currentPage > 0) {
      const previousPageURL = data._links.prev.href
      switchPage(previousPageURL)
    } else
      showModal('Página não encontrada!', 'Você já está na primeira página!')
  }

  async function switchPage(url) {
    setTableRowSelectedObject(null)

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const [response, json] = await doFetch(url, options)
  }

  function checkAddress() {
    if (checkIfSomeCustomerIsSelected())
      showCustomerAddress()
    else {
      const modalTitle = 'Cliente não selecionado!'
      const modalMessage = 'Selecione um cliente para ver seus dados!'
      showModal(modalTitle, modalMessage)
    }
  }

  function checkIfSomeCustomerIsSelected() {
    return tableRowSelectedObject !== null
  }

  function showCustomerAddress() {
    if (tableRowSelectedObject.enderecoResponse !== undefined) {
      const logradouro = tableRowSelectedObject.enderecoResponse.logradouro
      const uf = tableRowSelectedObject.enderecoResponse.uf
      showModal('Endereço', `${logradouro} - ${uf}`)
    } else {
      showModal('Endereço não encontrado!', 'Este cliente não possui nenhum endereço cadastrado!')
    }
  }

  function checkPhones() {
    if (checkIfSomeCustomerIsSelected())
      showCustomerPhones()
    else {
      const modalTitle = 'Cliente não selecionado!'
      const modalMessage = 'Selecione um cliente para ver seus dados!'
      showModal(modalTitle, modalMessage)
    }
  }

  function showCustomerPhones() {
    if (tableRowSelectedObject.telefonesResponse.length > 0)
        showModal('Telefones', <TableOfModal dataList={tableRowSelectedObject.telefonesResponse} />)  
      else
        showModal('Telefones não encontrados!', 'Este cliente não possui nenhum telefone cadastrado!')
  }

  function switchToNextTablePage() {
    const currentPage = data.page.number
    const totalPages = data.page.totalPages

    if (currentPage < totalPages - 1) {
      const nextPageURL = data._links.next.href
      switchPage(nextPageURL)
    } else
      showModal('Página não encontrada!', 'Você já está na ultima página')
  }

  function showUpdateCustomerScreen() {
    if (tableRowSelectedObject)
      setUpdateCustomerScreen(true)
    else
      showModal('Selecione um cliente!', 'Selecione um cliente para atualizar seus dados!')
  }

  if (!updateCustomerScreen)
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
        { data && !error &&
          <>
            <div className='row mt-5' >
              <MyTable tableTitles={tableTitles} tableAttributesDisplayed={tableAttributesDisplayed} tableDataList={data._embedded.pessoaResponseDTOList} setTableRowSelectedObject={setTableRowSelectedObject} />
            </div>
            <div className='row mt-5' >
              {
                tableNavigationButtons.map((buttonInfo, index) => (
                  <div key={index} className={`col ${buttonInfo.divButtonClassName}`} >
                    <Button className={buttonInfo.classname} handleClick={buttonInfo.handleClick} description={buttonInfo.description} />
                  </div>
                ))
              }
            </div>
          </>
        }
        <MyModal {...modalData} setModalData={setModalData} />
      </section>
    )
  else
    return <UpdateCustomerScreen tableRowSelectedObject={tableRowSelectedObject} setUpdateCustomerScreen={setUpdateCustomerScreen} />
}

export default SearchCustomerScreen