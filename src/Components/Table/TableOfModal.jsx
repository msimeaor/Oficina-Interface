import React from 'react'
import styles from './TableOfModal.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const TableOfModal = ({dataList}) => {
  return (
    <div className='container' >
      {
        dataList.map((data, index) => (
          <div key={index} className={`row ${styles.borderedRow}`} >
            <div className={`col-6 ${styles.phoneIndex}`} >
              Telefone {index + 1}
            </div>
            <div className={`col-6 ${styles.phoneNumber}`} >
              {data.numero}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TableOfModal