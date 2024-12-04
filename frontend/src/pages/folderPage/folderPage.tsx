import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { oneFolderLoading, selectFolder } from "../../app/slices/folderSlice";
import { removeFile } from "../../app/thunks/fileThunk";
import { getOneFolder } from "../../app/thunks/folderThunk";
import File from '../../components/File/File';
import GridList from "../../components/UI/FlexContainer/FlexContainer";
import Loader from "../../components/UI/Loader/loader";
import './folderPage.css';

const FolderPage = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const folderWithFiles = useAppSelector(selectFolder);
  const loading = useAppSelector(oneFolderLoading)


  useEffect(() => {
    dispatch(getOneFolder(id));
  }, [id, dispatch]);

   const deleteFile = async(fileId:string) => {
    if (confirm('Вы действительно хотите удалить файл ?')) {
      await dispatch(removeFile(fileId));
      await dispatch(getOneFolder(id));
    } 
  };

  if (!folderWithFiles?.files.length ) {
    return (
      <>
        <div>
          <Link to={'/'} className="link-back"><>&#8592;Назад</></Link>
          <h3 className="folder-name">
            название папки: {folderWithFiles?.name}
          </h3> 
        </div>
        <span className="empty-message">Эта папка пуста</span>
      </>
    )
  }


  return (
    <>
      <div>
        <Link to={'/'} className="link-back"><>&#8592;Назад</></Link>
        <h3 className="folder-name">название папки: { folderWithFiles?.name }</h3> 
      </div>
      {
        loading ? <Loader /> :
        <>
          <GridList>
            {folderWithFiles?.files.map((file) => (
              <File key={file.id} file={file} remove={deleteFile}/>
            ))}
          </GridList>
        </>
      }
    </>
  )
};

export default FolderPage;