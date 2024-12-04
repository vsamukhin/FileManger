import './Backdrop.css';

interface IProps extends React.PropsWithChildren{
  show: boolean;
}

const Backdrop: React.FC<IProps> = ({ show , children}) => { 
  return (
    <div className="backdrop"
      style={{ display: show ? 'block' : 'none' }}
    >
      {children}
    </div>
  )
}

export default Backdrop;