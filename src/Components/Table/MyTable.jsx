import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './MyTable.module.css'

const MyTable = ({ tableTitles, tableAttributesDisplayed, tableDataList }) => {
  return (
    <div className={`container ${styles.tableContainer}`} >
      <table className='table table-hover' >
        <thead>
          <tr>
            {
              tableTitles.map((title) => (
                <th key={title} scope='col' >{title}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            tableDataList.map((person, index) => (
              <tr key={person.id} >
                {
                  tableAttributesDisplayed.map((attr) => (
                    attr === '#' ?
                    <th key={attr} className={`${styles.bodyTh}`} scope='row' >{index + 1}</th> :
                    <td key={attr} className={`${styles.bodyTd}`} >{person[attr]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default MyTable