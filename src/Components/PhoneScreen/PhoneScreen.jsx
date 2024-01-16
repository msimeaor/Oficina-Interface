import React from 'react'
import CustomNavLink from '../NavLink/CustomNavLink'
import PhoneRegistryScreen from './PhoneRegistryScreen'
import SearchPhoneScreen from './SearchPhoneScreen'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


const PhoneScreen = ({ setCurrentPage }) => {
  React.useEffect(() => {
    setCurrentPage('Telefones')
  }, [setCurrentPage])

  return (
    <section className='container mt-3' >
      <CustomNavLink registryHref='cadastrar' searchHref='buscar' />
      <Routes>
        <Route path='/cadastrar' element={<PhoneRegistryScreen/>} />
        <Route path='/buscar' element={<SearchPhoneScreen/>} />
      </Routes>
    </section>
  )
}

export default PhoneScreen