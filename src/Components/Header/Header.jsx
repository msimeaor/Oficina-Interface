import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Header = ({currentPageName}) => {
  return (
    <section className='border-bottom p-3'>
      <div className='d-flex justify-content-between align-items-center mb-5' >
        <h1>{currentPageName}</h1>
        <h2>Sistema Oficina</h2>
      </div>
      <Link to="/sistema-oficina/inicio" className='btn btn-outline-primary' >Inicio</Link>
    </section>
  )
}

export default Header