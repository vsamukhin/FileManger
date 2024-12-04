import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getFilesLoading, selectFiles } from '../../app/slices/fileSlice.ts';
import { foldersLoading, selectFolders } from '../../app/slices/folderSlice.ts';
import { getFiles, removeFile } from '../../app/thunks/fileThunk.ts';
import { getFolders, removeFolder } from '../../app/thunks/folderThunk.ts';
import File from '../../components/File/File.tsx';
import Folder from '../../components/folder/Folder.tsx';
import FlexContainer from '../../components/UI/FlexContainer/FlexContainer.tsx';
import Loader from '../../components/UI/Loader/loader.tsx';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const files = useAppSelector(selectFiles);
  const loadingFolder = useAppSelector(foldersLoading);
  const loadingFile = useAppSelector(getFilesLoading);

  useEffect(() => {
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

  if (!folders.length && !loadingFolder && !files.length && !loadingFile) {
    return (
      <span className='empty-message'>Файлов и папок пока нет</span>
    )
  }

  if (loadingFolder || loadingFile) {
    return (<Loader />);
  }

  return (
    <>
      <FlexContainer>
        {folders && folders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            remove={deleteFolder}
          />
        ))}
        {files && files.map((file) => (
            <File key={file.id} file={file} remove={deleteFile}/>
        ))}

      </FlexContainer>
    </>
  )
};

export default MainPage;