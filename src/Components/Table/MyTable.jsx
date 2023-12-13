import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './MyTable.module.css'

const MyTable = ({ tableTitles, tableAttributesDisplayed, tableDataList, setTableRowSelectedObject }) => {
  const [selectedRow, setSelectedRow] = React.useState(null)

  function handleClick({target}) {
    const tableRowId = parseInt(target.parentNode.getAttribute('id'))
    const customerClicked = tableDataList.filter((customer) => {
      return customer.id === tableRowId
    })

    setTableRowSelectedObject(customerClicked[0])
    setSelectedRow(tableRowId)
  }

  return (
    <div className={`container ${styles.tableContainer}`} >
      <table className='table' >
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
              <tr 
                key={person.id}
                id={person.id}
                onClick={handleClick}
                className={`${styles.tableBodyTr} ${selectedRow === person.id ? styles.selectedRow : ''}`} >
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