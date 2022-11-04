import { useEffect } from 'react'

type IModal = {
  modalText: string
  closeModal: () => void
  responseStatus: boolean
}

const Modal = ({ modalText, closeModal, responseStatus }: IModal) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal()
    }, 2000)
  }, [closeModal])

  return <p style={{ color: responseStatus ? 'green' : 'red' }}>{modalText}</p>
}
export default Modal
