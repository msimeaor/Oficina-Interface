import React from 'react'
import { Route, Routes } from 'react-router'
import NavLink from '../NavLink/NavLink'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomerRegistryScreen from './CustomerRegistryScreen'

const CustomerScreen = ({ setCurrentPage }) => {

  React.useEffect(() => {
    setCurrentPage('Clientes')
  }, [setCurrentPage])

  return (
    <section className='container' >
      <NavLink registryHref="cadastrar" searchHref="buscar" />
      <Routes>
        <Route path="/cadastrar" element={<CustomerRegistryScreen/>} />
        {
          /*
          <Route path="/buscar" element={<SearchCustomerScreen/>} />
          */
        }
      </Routes>
    </section>
  )
}

export default CustomerScreen