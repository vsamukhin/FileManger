import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { resetBreadcrumbs } from '../../app/slices/breadcrumbsSlice';
import { showSidebarMenu } from '../../app/slices/fileSlice';
import folder from '../../assets/folder.png';
import './Header.css';

const Header = () => {
  const dispatch = useAppDispatch();

  const toggleSidebar= () => {
    dispatch(showSidebarMenu());
  };

  return (
    <>
      <header className='header'>
        <div className='header-wrap'>
          <Link to="/" className='header-logo-wrap'
            onClick={() => dispatch(resetBreadcrumbs())}>
              <img style={{width: "40px", height: "40px"}} src={folder} alt="" />
              <span className='logo'>FileManager</span>
          </Link>
          <button
            className='header-sidebar_btn'
            type='button'
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>    
    </>
  )
}

export default Header;