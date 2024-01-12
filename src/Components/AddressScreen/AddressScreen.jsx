import React from 'react'
import CustomNavLink from '../NavLink/CustomNavLink'
import AddressRegistryScreen from './AddressRegistryScreen'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


const AddressScreen = ({ setCurrentPage }) => {
  React.useEffect(() => {
    setCurrentPage('Endereços')
  }, [setCurrentPage])

  return (
    <section className='container mt-3' >
      <CustomNavLink registryHref='cadastrar' searchHref='buscar' />
      <Routes>
        <Route path='/cadastrar' element={<AddressRegistryScreen/>} />
        {
          //<Route path='/buscar' element={<SearchAddressScreen/>} />
        }
      </Routes>
    </section>
  )
}

export default AddressScreen