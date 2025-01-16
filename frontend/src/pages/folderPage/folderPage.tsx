import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showFormFileModal } from "../../app/slices/fileSlice";
import { oneFolderLoading, selectFolder, setCurrentDir, showFormFolderModal } from "../../app/slices/folderSlice";
import { removeFile } from "../../app/thunks/fileThunk";
import { getOneFolder, removeFolder } from "../../app/thunks/folderThunk";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import FileList from "../../components/FileList/FileList";
import Loader from "../../components/UI/Loader/loader";
import './folderPage.css';

const FolderPage = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const folderWithFiles = useAppSelector(selectFolder);
  const loading = useAppSelector(oneFolderLoading);

  useEffect(() => {
    dispatch(getOneFolder(id));
    dispatch(setCurrentDir(id));
  }, [id, dispatch]);

  const openModalCreateFolder = () => {
    dispatch(showFormFolderModal())
  };
  
  const openModalCreateFile = () => {
    dispatch(showFormFileModal());
  };
  
  if (loading) {
    return <Loader />
  }
  
  if (folderWithFiles?.subfolders.length === 0 && folderWithFiles.files.length === 0) {
    return (
      <>
        <ButtonGroup
          openModalCreateFile={openModalCreateFile}
          openModalCreateFolder={openModalCreateFolder}
        />
        <span className="empty-message">Эта папка пуста</span>
      </>
    )
  }

  const deleteFolder = async(id:string) => {
    if (confirm('Вы действительно хотите удалить папку?')) {
      await dispatch(removeFolder(id));
      await dispatch(getOneFolder(id));
    }
  };

  const deleteFile = async(fileId:string) => {
    if (confirm('Вы действительно хотите удалить файл ?')) {
      await dispatch(removeFile(fileId));
      await dispatch(getOneFolder(id));
    } 
  };

  return (
    <>
      <ButtonGroup
        openModalCreateFile={openModalCreateFile}
        openModalCreateFolder={openModalCreateFolder}
      />
      <div>
        {
          folderWithFiles?.files && folderWithFiles?.subfolders &&
          <FileList
            files={folderWithFiles?.files}
            folders={folderWithFiles?.subfolders}
            deleteFile={deleteFile}
            deleteFolder={deleteFolder}
          />
        }
      </div>
    </>
  )
};

export default FolderPage;