import { useEffect } from 'react'

type IModalProps = {
  modalText: string
  closeModal: () => void
  responseStatus: boolean
}

const Modal = ({ modalText, closeModal, responseStatus }: IModalProps) => {
  console.log(modalText, closeModal, responseStatus)

  useEffect(() => {
    setTimeout(() => {
      closeModal()
    }, 2000)
  }, [closeModal()])

  return <p style={{ color: responseStatus ? 'green' : 'red' }}>{modalText}</p>
}
export default Modal
