import React from 'react'
import { Route, Routes } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavLink from '../NavLink/NavLink'

const CustomerScreen = ({ setCurrentPage }) => {

  React.useEffect(() => {
    setCurrentPage('Clientes')
  }, [setCurrentPage])

  return (
    <section className='container' >
      <NavLink/>
      <Routes>
        <Route/> {/*Aqui virão as duas rotas das telas de clientes*/}
      </Routes>
    </section>
  )
}

export default CustomerScreen