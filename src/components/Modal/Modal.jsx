/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

function ModalInner({ children, closeHandler }) {
  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  const closeModalByClickButtonX = () => closeHandler()

  return (
    <div className="modalInner">
      <button onClick={closeModalByClickButtonX} className="ModalCloseBtn" type="button">&#10006;</button>
      {children}
    </div>
  )
}

export function Modal({ isOpen, closeHandler, children }) {
  if (!isOpen) return null

  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div className="modalWr" onClick={closeModalByClickWrapper}>
      <ModalInner closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),
  )
}
