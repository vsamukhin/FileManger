import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { resetErrors, showCreateFileModal, showFormFileModal } from './app/slices/fileSlice';
import { showFolderModal, showFormFolderModal } from "./app/slices/folderSlice";
import Modal from "./components/UI/Modal/modal";
import FileForm from "./components/forms/FileForm/FileForm";
import FolderForm from "./components/forms/FolderForm/FolderForm";
import Header from "./components/header/Header";
import FolderPage from "./pages/folderPage/folderPage";
import MainPage from "./pages/mainPage/mainPage";

function App() {
  const dispatch = useAppDispatch();
  const isOpenFolderModal = useAppSelector(showFolderModal);
  const isOpenFileModal = useAppSelector(showCreateFileModal);

  const onCloseFolderModal = () => { dispatch(showFormFolderModal()) };
  const onCloseFileModal = () => {
    dispatch(resetErrors());
    dispatch(showFormFileModal())
  };
  

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<FolderPage/>}/>
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

export default App
