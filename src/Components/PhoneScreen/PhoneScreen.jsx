import React from 'react'
import CustomNavLink from '../NavLink/CustomNavLink'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import PhoneRegistryScreen from './PhoneRegistryScreen'


const PhoneScreen = ({ setCurrentPage }) => {
  React.useEffect(() => {
    setCurrentPage('Telefones')
  }, [setCurrentPage])

  return (
    <section className='container mt-3' >
      <CustomNavLink registryHref='cadastrar' searchHref='buscar' />
      <Routes>
        <Route path='/cadastrar' element={<PhoneRegistryScreen/>} />
      </Routes>
    </section>
  )
}

export default PhoneScreen