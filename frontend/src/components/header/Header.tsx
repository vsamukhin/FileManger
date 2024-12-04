import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { showFormFileModal } from '../../app/slices/fileSlice';
import { showFormFolderModal } from '../../app/slices/folderSlice';
import folder from '../../assets/folder.webp';
import Button from '../UI/Button/Button';
import './Header.css';

const Header = () => {
  const dispatch = useAppDispatch();

  const openModalCreateFolder = () => {
    dispatch(showFormFolderModal());
  };

   const openModalCreateFile = () => {
    dispatch(showFormFileModal())
  };
  

  return (
    <>
      <header className='header'>
        <Link to="/" className='header-logo-wrap'>
            <img style={{width: "40px", height: "40px"}} src={folder} alt="" />
            <span className='logo'>FileManager</span>
        </Link>
        <div className='header-button-wrap'>
          <Button
            size='small'
            text='Создать папку'
            type='button'
            onClick={openModalCreateFolder}
          />
          <Button
            size='small'
            text='Создать файл'
            type='button'
            onClick={openModalCreateFile}
          />
        </div>
      </header>    
    </>
  )
}

export default Header;