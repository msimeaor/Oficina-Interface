import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const PhoneOwnerTable = ({ownerObject, ownerObjectAttributesDisplayed}) => {
  return (
    <div className='container' >
      {ownerObjectAttributesDisplayed.map((attribute, index) => (
        <div key={index} >
          
        </div>
      ))}
    </div>
  )
}

export default PhoneOwnerTable