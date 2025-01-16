import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addBreadcrumb } from "../../app/slices/breadcrumbsSlice";
import { fileView } from "../../app/slices/fileSlice";
import { openEditFolderModal } from "../../app/slices/modalSlice";
import { updateFolder } from "../../app/thunks/folderThunk";
import editIcon from "../../assets/edit.png";
import folderImg from "../../assets/folder.png";
import deleteIcon from "../../assets/trash.png";
import { IFolder, IUpdateFolder } from "../../types";
import CheckboxStar from "../UI/checkboxStar/checkboxStar";
import "./Folder.css";

interface DragItem {
  id: string;
  type: 'FILE' | 'FOLDER';
}

interface IProps {
  folder: IFolder;
  view?: 'list' | 'plate';
  remove: (id: string) => void;
  onDrop?: (item: DragItem, folderId: string) => void;
}

const Folder: React.FC<IProps> = ({ folder, remove, onDrop, view }) => {
  
  const [, dropRef] = useDrop<DragItem>(() => ({
    accept: ['FILE', 'FOLDER'],
    drop: (item) => onDrop?.(item, folder.id),
  }));

  const [, dragRef] = useDrag<DragItem>(() => ({
    type: 'FOLDER', 
    item: { id: folder.id, type: 'FOLDER' },
  }));

  const [checked, setChecked] = useState(folder.favorites);
  const fileViews = useAppSelector(fileView);
  const dispatch = useAppDispatch();

  const handleFavoritesChange = async (checked: boolean) => {
    setChecked(checked);
    
    const update: IUpdateFolder = {
      id: folder.id,
      data: { favorites: checked },
    };

    try {
      await dispatch(updateFolder(update));
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = () => {
    dispatch(openEditFolderModal(folder));
  };

  const handleFolderClick = (folder: IFolder) => {
    dispatch(addBreadcrumb({ path: folder.id, name: folder.name }));
  };

  const renderPlateView = () => (
    <div className="folder-card" ref={(node) => dragRef(dropRef(node))}>
      <div className="folder-favorites">
        <CheckboxStar
          checked={checked}
          onChange={handleFavoritesChange} />
      </div>
      <Link
        to={`/${folder.id}`}
        onClick={() => handleFolderClick(folder)}
        className="folder-card_img-wrap">
        <img src={folderImg} alt="folder" className="folder-card_img" />
      </Link>
      <div className="folder-card_text_name">{folder.name}</div>
      <div className="folder-button-wrap">
        <button className="folder-btn" onClick={() => remove(folder.id)}>
          <img className="folder-btn-icon" src={deleteIcon} alt="удалить" />
        </button>
        <button className="folder-btn" onClick={handleEdit}>
          <img className="folder-btn-icon" src={editIcon} alt="редактировать" />
        </button>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="folder-list-item" ref={(node) => dragRef(dropRef(node))}>
      <div className="list-folder-icon">
        <img src={folderImg} alt="folder" />
      </div>
      <div className="list-folder-details">
        <Link
          to={`/${folder.id}`}
          onClick={() => handleFolderClick(folder)}
          className="list-folder-name">
          {folder.name}
        </Link>
      </div>
      <div>{folder.createdAT.slice(0,10)}</div>
      <div className="list-folder-actions">
        <div className="list-folder-favorites">
          <CheckboxStar
            checked={checked} onChange={handleFavoritesChange} />
        </div>
        <button className="list-folder-btn" onClick={() => remove(folder.id)}>
          <img className="list-folder-btn-icon" src={deleteIcon} alt="удалить" />
        </button>
        <button className="list-folder-btn" onClick={handleEdit}>
          <img className="list-folder-btn-icon" src={editIcon} alt="редактировать" />
        </button>
      </div>
    </div>
  );

  const currentView = view || fileViews;

  return currentView === "plate" ? renderPlateView() : renderListView();
}; 

export default Folder;
