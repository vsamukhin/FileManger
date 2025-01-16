import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fileView } from '../../app/slices/fileSlice';
import { openEditFileModal, openViewFileModal } from '../../app/slices/modalSlice';
import { downloadFile, updateFile } from '../../app/thunks/fileThunk';
import downloadIcon from '../../assets/download.png';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/trash.png';
import { API_FILE_URL } from '../../constants';
import { IFile, IUpdateFile } from '../../types';
import FileIcon from '../FileIcon/FileIcon';
import CheckboxStar from '../UI/checkboxStar/checkboxStar';
import './File.css';

interface DragItem {
  id: string;
  type: 'FILE';
}

interface IProps {
  file: IFile;
  remove: (id: string) => void;
  view?: 'list' | 'plate';
}

const File: React.FC<IProps> = ({ file, remove, view }) => {
  const [, dragRef] = useDrag<DragItem>(() => ({
    type: 'FILE', 
    item: { id: file.id, type: 'FILE' },
  }));

  const fileViews = useAppSelector(fileView);
  const [checked, setChecked] = useState(file.favorites);
  const dispatch = useAppDispatch();

  const handleChange = async (checked: boolean) => {
    setChecked(checked);
    const update: IUpdateFile = {
      id: file.id,
      data: { favorites: checked },
    };

    try {
      await dispatch(updateFile(update));
    } catch (e) {
      console.log(e);
    }
  };

  const saveFile = async (id: string, filename: string) => {
    await dispatch(downloadFile({ id, filename }));
  };

  const handleEdit = () => {
    dispatch(openEditFileModal(file));
  };

  const handleView = () => {
    dispatch(openViewFileModal(file));
  };

  const renderPlateView = () => (
    <div className='file' ref={dragRef}>
      <div className='file-favorites'>
        <CheckboxStar checked={checked} onChange={handleChange} />
      </div>
      <div className='file-img-wrap' onClick={handleView}>
        <FileIcon extension={file.extension}
          filePath={API_FILE_URL + file.path} />
      </div>
      <div className='file-name-wrap'>
        <h5 className='file-name'>{file.name}{file.extension}</h5>
        <div className='button-wrap'>
          <button
            className='file-btn'
            type='button'
            onClick={() => remove(file.id)}
          >
            <img className='file-btn-icon' src={deleteIcon} alt="удалить" />
          </button>
          <button
            className='file-btn'
            type='button'
            onClick={handleEdit}
          >
            <img className='file-btn-icon' src={editIcon} alt="редактировать" />
          </button>
          <button
            className='file-btn'
            type='button'
            onClick={() => saveFile(file.id, file.name + file.extension)}
          >
            <img className='file-btn-icon' src={downloadIcon} alt="скачать" />
          </button>
        </div>
      </div>
    </div>
  )
  
  const renderListView = () => (
    <div className="list-file-item" ref={dragRef}>
      <div className="list-file-icon">
        <FileIcon extension={file.extension} filePath={API_FILE_URL + file.path} />
      </div>
      <div className="list-file-name" onClick={handleView}>
        {file.name}{file.extension}
      </div>
      <div>
        <span>{file.createdAT.slice(0, 10)}</span>
      </div>
        
      <div className="list-file-actions">
        <div className="list-file-favorites">
          <CheckboxStar checked={checked} onChange={handleChange} />
        </div>
        <button className="list-file-btn" type="button" onClick={() => remove(file.id)}>
          <img className="list-file-btn-icon" src={deleteIcon} alt="удалить" />
        </button>
        <button className="list-file-btn" type="button" onClick={handleEdit}>
          <img className="list-file-btn-icon" src={editIcon} alt="редактировать" />
        </button>
        <button
          className="list-file-btn"
          type="button"
          onClick={() => saveFile(file.id, file.name + file.extension)}
        >
          <img className="list-file-btn-icon" src={downloadIcon} alt="скачать" />
        </button>
      </div>
    </div>
  )

   const currentView = view || fileViews;

  return currentView === "plate" ? renderPlateView() : renderListView();
};

export default File;