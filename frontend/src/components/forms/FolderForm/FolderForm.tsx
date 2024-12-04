import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { showFormFolderModal } from "../../../app/slices/folderSlice";
import { createFolder, getFolders } from "../../../app/thunks/folderThunk";
import { ICreateFolder } from "../../../types";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

const FolderForm = () => {
  const [name, setName] = useState<ICreateFolder>({
    name: '',
  });
  const dispatch = useAppDispatch();
 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setName(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createFolder(name));
      await dispatch(getFolders());
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
          value={name.name}
          label="введите название папки"
          onChange={handleChange}
          required={true}
        />
        <div>
          <Button text="Создать папку" type='submit' size="medium"></Button>
        </div>
      </form>
    </div>
  )
};

export default FolderForm;