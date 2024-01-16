import React from 'react'
import styles from './PhoneOwnerTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const PhoneOwnerTable = ({ownerData, ownerObjectAttributes, ownerAttributesDisplayed}) => {
  function fillCell(value) {
    if (Array.isArray(value)) {
      return `${value[2]}/${value[1]}/${value[0]}`
    }

    return value
  }

  return (
    <div className='container' >
      {
        ownerObjectAttributes.map((attribute, index) => (
          <div key={index} className={`row ${styles.borderedRow}`}  >
            <div className={`${styles.ownerAttribute}`} >
              {
                ownerAttributesDisplayed[index]
              }
            </div>
            <div className={`${styles.ownerData}`} >
              {
                fillCell(ownerData[attribute])
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PhoneOwnerTable