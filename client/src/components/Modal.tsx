import { useEffect } from 'react'
import { VoidExpression } from 'typescript'

interface ModalText {
  modalText: string
  closeModal(): any
}

const Modal = (props: ModalText) => {
  useEffect(() => {
    setTimeout(() => {
      // tslint:disable-next-line
      // @ts-ignore
      closeModal()
    }, 2000)
    // tslint:disable-next-line
    // @ts-ignore
  }, [closeModal()])

  return <p>{props.modalText}</p>
}
export default Modal
