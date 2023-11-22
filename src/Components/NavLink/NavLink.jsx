import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const NavLink = ({ registryHref, searchHref }) => {
  return (
    <div className='pt-3 pb-3' >
      <ul className='nav' >
        <li className='nav-item mr-2 ' >
          <Link to={registryHref} >Cadastrar</Link>
        </li>
        <li className='nav-item ml-2' >
          <Link to={searchHref} >Buscar</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavLink