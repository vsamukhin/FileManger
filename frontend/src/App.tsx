import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { resetErrors, showCreateFileModal, showFormFileModal, showSidebar } from './app/slices/fileSlice';
import { showFolderModal, showFormFolderModal } from "./app/slices/folderSlice";
import Breadcrumbs from "./components/BreadCrumbs/BreadCrumbs";
import Sidebar from "./components/Sidebar/Sidebar";
import Modal from "./components/UI/Modal/modal";
import FileForm from "./components/forms/FileForm/FileForm";
import FolderForm from "./components/forms/FolderForm/FolderForm";
import Header from "./components/header/Header";
import Favorites from "./pages/Favorites/Favorites";
import FolderPage from "./pages/folderPage/folderPage";
import MainPage from "./pages/mainPage/mainPage";

function App() {
  const dispatch = useAppDispatch();
  const isOpenFolderModal = useAppSelector(showFolderModal);
  const isOpenFileModal = useAppSelector(showCreateFileModal);
  const sidebarOpen = useAppSelector(showSidebar);

  const onCloseFolderModal = () => { dispatch(showFormFolderModal()) };

  const onCloseFileModal = () => {
    dispatch(resetErrors());
    dispatch(showFormFileModal())
  };

  return (
    <>
      <Header />
      <Sidebar/>
      <main className={`main ${sidebarOpen ? 'shifted' : ''}`}>
        <BreadcrumbsWrapper />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<FolderPage />} />
          <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
      </main>

      <Modal
        onClose={onCloseFolderModal}
        title='Создать папку'
        isOpen={isOpenFolderModal}>
        <FolderForm />
      </Modal>
      <Modal
        onClose={onCloseFileModal}
        title='Создать файл'
        isOpen={isOpenFileModal}>
        <FileForm />
      </Modal>
    </>
  )
}

const BreadcrumbsWrapper = () => {
  const location = useLocation();
   const isBreadcrumbsVisible =
    location.pathname === "/" ||
    (/^\/[^/]+$/.test(location.pathname) && location.pathname !== "/favorites");

  return isBreadcrumbsVisible ? <Breadcrumbs /> : null;
};


export default App;
