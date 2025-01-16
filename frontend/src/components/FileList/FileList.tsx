import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fileView } from "../../app/slices/fileSlice";
import { currentDir } from "../../app/slices/folderSlice";
import { getFiles, updateFile } from "../../app/thunks/fileThunk";
import { getFolders, getOneFolder, updateFolder } from "../../app/thunks/folderThunk";
import { IFile, IFolder, IUpdateFile, IUpdateFolder } from "../../types";
import File from "../File/File";
import Folder from "../folder/Folder";
import './FileList.css';

interface IProps {
  folders: IFolder[];
  files: IFile[];
  deleteFolder: (id:string) => void;
  deleteFile: (id:string) => void;
}

const FileList:React.FC<IProps> = ({files, folders,deleteFolder,deleteFile}) => {
  const fileViews = useAppSelector(fileView);
  const currentFolder = useAppSelector(currentDir);
  const dispatch = useAppDispatch();

  const handleDrop = async (item: { id: string; type: 'FILE' | 'FOLDER' }, targetFolderId: string) => {
    if (item.type === 'FILE') {
      const data: IUpdateFile = { id: item.id, data: { folderId: targetFolderId } };
      await dispatch(updateFile(data));
    }

    if (item.type === 'FOLDER') {
      const data: IUpdateFolder = { id: item.id, data: { parentId: targetFolderId } };
      await dispatch(updateFolder(data));
    }

    if (currentFolder) {
      return await dispatch(getOneFolder(currentFolder));
    }

    await dispatch(getFolders());
    await dispatch(getFiles());
  };
  
  return (
    <div className={fileViews === 'plate' ? 'fileplate' : 'filelist'}>
      {folders.map(folder => (
        <Folder
          key={folder.id}
          folder={folder}
          remove={deleteFolder}
          onDrop={handleDrop}
        />
      ))}
      {files.map(file => (
        <File
          key={file.id}
          file={file}
          remove={deleteFile}
        />
      ))}
    </div>
  )
};

export default FileList;