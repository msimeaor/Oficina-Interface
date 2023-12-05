import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Header.module.css'

const Header = ({ currentPage }) => {
  return (
    <section className={`container-fluid border-bottom ${styles.containerFluid}`} >
      <section className='container pt-4 pb-4' >
        <div className='row pb-2' >
          <div className='col' >
            <h2 className='text-left text-dark pt-2 pb-2' >{currentPage}</h2>
          </div>
          <div className='col' >
            <h3 className='text-right text-dark pt-2 pb-2' >Sistema Oficina</h3>
          </div>
        </div>
        <div className='row pt-2' >
          <div className='col' >
            <Link to="/" className='btn btn-dark pl-4 pr-4' >Inicio</Link>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Header