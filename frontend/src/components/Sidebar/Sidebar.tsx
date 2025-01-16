import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetBreadcrumbs } from '../../app/slices/breadcrumbsSlice';
import { showSidebar } from '../../app/slices/fileSlice';
import cloud from '../../assets/cloud.png';
import star from '../../assets/star.png';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(showSidebar);

  return (
    <aside className={`sidebar ${open ? 'open': ''}`}>
      <nav className='sidebar-nav'>
        <Link className='sidebar-nav_item' to={"/"}
          onClick={() => dispatch(resetBreadcrumbs())}>
          <img src={cloud} alt="trash" style={{width: '15px', marginRight: '10px'}}/>
          <span>Все файлы</span>
        </Link>
        <Link className='sidebar-nav_item'
          onClick={() => dispatch(resetBreadcrumbs())}
          to={"/favorites"}>
          <img src={star} alt="trash" style={{width: '15px', marginRight: '10px'}}/>
          Избранное
        </Link>
      </nav>
    </aside>
  )
};

export default Sidebar;