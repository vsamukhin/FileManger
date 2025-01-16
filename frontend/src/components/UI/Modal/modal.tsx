import Backdrop from '../Backdrop/Backdrop';
import './modal.css';

interface IProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  width?: string; 
  height?: string;
}

const Modal: React.FC<IProps> = ({ isOpen, onClose, title, children, width, height }) => { 
  if (!isOpen) return null;

  return (
    <Backdrop show={isOpen}>
      <div
        style={{width,height}}
        className="modal"
        onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>x</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </Backdrop>
  )
};

export default Modal;