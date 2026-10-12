function Modal({ children, onClose }) {
  return (
    <div>
      <div>
        {children}

        <button onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default Modal;