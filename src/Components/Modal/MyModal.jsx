import React from 'react'
import Button from '../Form/Button/Button'
import { Modal } from 'bootstrap'
import { ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './MyModal.module.css'

const MyModal = ({ title, message, setModalData }) => {

  function closeModal() {
    setModalData(null)
  }

  if (message)
    return (
      <div className={`${styles.modalContainer}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className={`modal-content ${styles.modal}`}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <Button className='btn btn-dark' handleClick={closeModal} description='OK' />
            </div>
          </div>
        </div>
      </div>
    )
  else
    return null
}

export default MyModal