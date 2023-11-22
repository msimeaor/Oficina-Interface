import React from 'react'
import LinkToServiceScreen from './LinkToServiceScreen'
import { Link } from 'react-router-dom'
import { ReactComponent as Person } from '../../Images/person-solid.svg'
import { ReactComponent as House } from '../../Images/house-solid.svg'
import { ReactComponent as Phone } from '../../Images/phone-solid.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

const HomeScreen = ({ setCurrentPage }) => {

  React.useEffect(() => {
    setCurrentPage('Bem Vindo!')
  }, [setCurrentPage])

  return (
    <section className='container' >
      <div className='row mt-5' >
        <LinkToServiceScreen href='#' LinkIcon={<Person/>} linkDescription='Clientes' />
        <LinkToServiceScreen href='#' LinkIcon={<House/>} linkDescription='Endereços' />
        <LinkToServiceScreen href='#' LinkIcon={<Phone/>} linkDescription='Telefones' />
      </div>
    </section>
  )
}

export default HomeScreen