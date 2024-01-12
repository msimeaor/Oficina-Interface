import React from 'react'
import CustomNavLink from '../NavLink/CustomNavLink'
import CustomerRegistryScreen from './CustomerRegistryScreen'
import SearchCustomerScreen from './SearchCustomerScreen'
import { Route, Routes } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'

const CustomerScreen = ({ setCurrentPage }) => {

  React.useEffect(() => {
    setCurrentPage('Clientes')
  }, [setCurrentPage])

  return (
    <section className='container mt-3' >
      <CustomNavLink registryHref="cadastrar" searchHref="buscar" />
      <Routes>
        <Route path="/cadastrar" element={<CustomerRegistryScreen/>} />
        <Route path="/buscar" element={<SearchCustomerScreen/>} />
      </Routes>
    </section>
  )
}

export default CustomerScreen