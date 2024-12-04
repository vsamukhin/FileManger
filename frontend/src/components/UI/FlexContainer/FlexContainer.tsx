import './FlexContainer.css';

const FlexContainer:React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className='grid-list'>
      {children}
    </div>
  )
}

export default FlexContainer;