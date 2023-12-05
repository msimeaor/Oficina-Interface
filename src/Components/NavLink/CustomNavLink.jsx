import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const CustomNavLink = ({ registryHref, searchHref }) => {
  return (
    <div className='pt-3 pb-3' >
      <ul className='nav' >
        <li className='nav-item mr-2 ' >
          <Link to={registryHref} className='btn btn-outline-secondary' >Cadastrar</Link>
        </li>
        <li className='nav-item ml-2' >
          <Link to={searchHref} className='btn btn-outline-secondary' >Buscar</Link>
        </li>
      </ul>
    </div>
  )
}

export default CustomNavLink