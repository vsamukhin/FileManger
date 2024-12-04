import { useState } from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../../assets/edit.png';
import folderImg from '../../assets/folder.webp';
import deleteIcon from '../../assets/trash.png';
import { IFolder } from '../../types';
import UpdateFolderForm from '../forms/FolderForm/UpdateFolderForm';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/modal';
import './Folder.css';

interface IProps {
  folder: IFolder;
  remove: (id: string) => void;
}


const Folder: React.FC<IProps> = ({ folder, remove }) => {
  const [state, setState] = useState(false);

  const showModal = () => {
    setState(() => !state);
  }

  return (
    <div className='folder-card'>
      <Link to={`/${folder.id}`} className='folder-card_img-wrap'>
        <img src={ folderImg } alt="folder" className='folder-card_img'/>
      </Link>
      <div className='folder-card_text_wrap'>
        <h5 className='folder-card_text_name'>{folder.name}</h5>
         <div className='button-wrap'>
          <Button
            type='button'
            text='удалить'
            onClick={() => remove(folder.id)}
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
        title='Переименование папки'
        onClose={showModal}
        isOpen={state}
      >
        <UpdateFolderForm folder={folder}/>
      </Modal>
    </div>
  )
};

export default Folder;