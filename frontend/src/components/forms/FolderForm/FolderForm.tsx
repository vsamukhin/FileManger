import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { currentDir, showFormFolderModal } from "../../../app/slices/folderSlice";
import { createFolder, getFolders, getOneFolder } from "../../../app/thunks/folderThunk";
import { ICreateFolder } from "../../../types";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

const FolderForm = () => {
  const currentFolder = useAppSelector(currentDir);
  const initialState = {
    name: '',
    parentId: currentFolder ? currentFolder : null,
  }

  const [folder, setFolder] = useState<ICreateFolder>(initialState);
  const dispatch = useAppDispatch();
 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFolder(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createFolder(folder));
      await dispatch(getFolders());
      if (folder.parentId) {
        await dispatch(getOneFolder(folder.parentId));
      }
      await dispatch(showFormFolderModal());
    } catch (error) {
      alert('Invalid field');
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          name="name"
          value={folder.name}
          label="введите название папки"
          onChange={handleChange}
          required={true}
        />
        <div>
          <Button text="Создать папку" type='submit' size="md"></Button>
        </div>
      </form>
    </div>
  )
};

export default FolderForm;