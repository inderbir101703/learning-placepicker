import {  useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children,open,onClose }) {
  const dialog = useRef();


// below code would have given error
// as while code execution it would have went to else block ....dialog ref is not connected with Dom api
// so to handle this using useEffect as it runs after entire code execution .... till ref is connected with dom
  // if(open)
  //   dialog.current.showModal()
  // else
  // dialog.current.close()


  useEffect(()=>{

    if(open)
    {
      dialog.current.showModal()}
  else
  dialog.current.close()
  },[open])
  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });
// when we try to close modal with keybopard ESc key ... it will close the modal but state will set to true so next time modal will not open... to handle this pass onclose function which will set the modal state to false
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
 {open? children :null}
    </dialog>,
    document.getElementById('modal')
  );}


export default Modal;
