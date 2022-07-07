import { useState } from "react";
import Backdrop from "./BackDrop";
import Modal from "./Modal";

function Todo(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function deleteHandler(props) {
    setModalIsOpen(true);
  }
  function closeModalHandler(props) {
    setModalIsOpen(false)
    console.log(props);
  }
  return (
    <div>
      <div className="card">
        <h2>{props.text}</h2>
        <div className="actions">
          <button className="btn" onClick={deleteHandler}>
            Delete
          </button>
        </div>
    { modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
    { modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
      </div>

    </div>
  );
}
export default Todo;
