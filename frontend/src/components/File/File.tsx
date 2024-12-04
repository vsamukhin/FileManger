import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { resetErrors } from '../../app/slices/fileSlice';
import editIcon from '../../assets/edit.png';
import fileImage from '../../assets/file.png';
import deleteIcon from '../../assets/trash.png';
import { API_IMAGE_URL } from '../../constants';
import { IFile } from '../../types';
import UpdateFileForm from '../forms/FileForm/UpdateFileForm';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/modal';
import './File.css';

interface IProps {
  file: IFile;
  remove: (id:string) => void;
}

const File: React.FC<IProps> = ({ file, remove }) => {
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(resetErrors());
    setOpen(() => !open);
  };

  const showFile = () => {
    setOpenFile(() => !openFile)
  }

  return (
    <div className='file'>
      <div className='file-img-wrap' onClick={showFile}>
        <img className='file-img' src={ fileImage } alt="file" />
      </div>
      <div className='file-name-wrap'>
        <h5 className='file-name'>{file.name}{file.extension}</h5>
        <div className='button-wrap'>
         <Button
            type='button'
            text='удалить'
            onClick={() => remove(file.id)}
            size='small'
          >
            <img style={{width: '14px'}} src={deleteIcon} alt="удалить" />
          </Button>
          <Button
            type='button'
            text='редактировать'
            onClick={showModal}
            size='small'
          >
            <img style={{width: '14px'}} src={editIcon} alt="редактировать" />
          </Button>
        </div>
      </div> 
      <Modal
        title='Переименовать файл'
        isOpen={open}
        onClose={showModal}
      >
        <UpdateFileForm file={file}/>
      </Modal>
      <Modal
        title={file.name}
        isOpen={openFile}
        onClose={showFile}
        width='100%'
        height='90vh'
      >
        <iframe
          width="100%"
          height='80%'
          src={API_IMAGE_URL + file.path}
        >
        </iframe>
      </Modal>
    </div>
  )
};

export default File;