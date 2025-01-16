import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getFilesLoading, selectFiles, showFormFileModal } from '../../app/slices/fileSlice.ts';
import { foldersLoading, resetCurrentDir, selectFolders, showFormFolderModal } from '../../app/slices/folderSlice.ts';
import { getFiles, removeFile } from '../../app/thunks/fileThunk.ts';
import { getFolders, removeFolder } from '../../app/thunks/folderThunk.ts';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.tsx';
import FileList from '../../components/FileList/FileList.tsx';
import Loader from '../../components/UI/Loader/loader.tsx';
import './mainPage.css';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const files = useAppSelector(selectFiles);
  const loadingFolder = useAppSelector(foldersLoading);
  const loadingFile = useAppSelector(getFilesLoading);
 

  useEffect(() => {
    dispatch(resetCurrentDir());
    dispatch(getFolders());
    dispatch(getFiles());
  }, [dispatch]);

  const deleteFile = async(id:string) => {
    if (confirm('Вы действительно хотите удалить файл ?')) {
      await dispatch(removeFile(id));
      await dispatch(getFiles());
    }
  };

  const deleteFolder = async(id:string) => {
    if (confirm('Вы действительно хотите удалить папку?')) {
      await dispatch(removeFolder(id));
      await dispatch(getFolders());
    }
  };

  const openModalCreateFolder = () => {
    dispatch(showFormFolderModal())
  };

  const openModalCreateFile = () => {
    dispatch(showFormFileModal());
  }; 
  
  if (loadingFolder || loadingFile) {
    return (<Loader />);
  }

  if (!folders.length && !loadingFolder && !files.length && !loadingFile) {
    return (
      <>
        <ButtonGroup
          openModalCreateFile={openModalCreateFile}
          openModalCreateFolder={openModalCreateFolder}
        />
        <span className='empty-message'>Файлов и папок пока нет</span>
      </>
    )
  }

  return (
    <>
      <ButtonGroup
          openModalCreateFile={openModalCreateFile}
          openModalCreateFolder={openModalCreateFolder}
      />
      <>
        {folders && files && 
          <FileList
            files={files}
            folders={folders}
            deleteFile={deleteFile}
            deleteFolder={deleteFolder}
          />
        }
      </>
    </>
  )
};

export default MainPage;