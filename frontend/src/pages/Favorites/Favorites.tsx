import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadingFavoritesFile, selectFavoritesFiles } from '../../app/slices/fileSlice';
import { loadingFavoritesFolder, selectFavoritesFolders } from '../../app/slices/folderSlice';
import { getFavoritesFiles, removeFile } from '../../app/thunks/fileThunk';
import { getFavoritesFolder, removeFolder } from '../../app/thunks/folderThunk';
import File from '../../components/File/File';
import Folder from '../../components/folder/Folder';
import Loader from '../../components/UI/Loader/loader';
import './Favorites.css';


const Favorites = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFavoritesFolders);
  const files = useAppSelector(selectFavoritesFiles);
  const loadingFolders = useAppSelector(loadingFavoritesFolder);
  const loadingFiles = useAppSelector(loadingFavoritesFile);

  useEffect(() => {
    dispatch(getFavoritesFiles());
    dispatch(getFavoritesFolder());
  }, [dispatch]);

  const deleteFolder = async(id:string) => {
    if (confirm('Вы действительно хотите удалить папку?')) {
      await dispatch(removeFolder(id));
      await dispatch(getFavoritesFolder());
    }
  };

  const deleteFile = async(id:string) => {
    if (confirm('Вы действительно хотите удалить файл ?')) {
      await dispatch(removeFile(id));
      await dispatch(getFavoritesFiles());
    }
  };


  if (loadingFolders || loadingFiles) {
    return (<Loader />)
  }

  if (folders.length === 0 && files.length === 0) {
    return (
      <div className="favorites">
        <h1 className="favorites-title">Избранные</h1>
        <span className='favorites-empty-message'>
          У вас пока нет избранных файлов
        </span>
      </div>
    )
  }

  return (
    <div className="favorites">
      <h1 className="favorites-title">Избранные</h1>
      <div>
        {folders.map((folder) => (
          <Folder key={folder.id} folder={folder} view='list' remove={deleteFolder}/>
        ))}
        {files.map((file) => (
          <File key={file.id} file={file} remove={deleteFile} view='list'/>
        ))}
      </div>
    </div>
  )
};

export default Favorites;