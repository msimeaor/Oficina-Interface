import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const LinkToServiceScreen = ({ href, LinkIcon, linkDescription }) => {
  return (
    <div className='col-lg-2 col-md-3 col-4 pt-2 pb-2' >
      <Link to={href} className='d-flex flex-wrap justify-content-center' >
        {LinkIcon}
        <h5 className='mt-2' >{linkDescription}</h5>
      </Link>
    </div>
  )
}

export default LinkToServiceScreen