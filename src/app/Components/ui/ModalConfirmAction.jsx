import '../../styles/ModalConfirmActionStyle.css'

const ModalConfirmAction = ({ isOpen, onClose, onConfirm, mensagem }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{mensagem}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className='btn-confirmar'>Confirmar</button>
          <button onClick={onClose} className='btn-cancelar'>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmAction;