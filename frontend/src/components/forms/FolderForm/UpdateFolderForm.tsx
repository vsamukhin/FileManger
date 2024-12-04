import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { getFolders, updateFolder } from "../../../app/thunks/folderThunk";
import { IEditName, IFolder } from "../../../types";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

interface IProps {
  folder: IFolder;
}

const UpdateFolderForm:React.FC<IProps> = ({folder}) => { 
 const [state, setState] = useState<IEditName>({
    name: folder.name,
  })
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState, 
      [name]: value,
    }));
  };


  const onFormSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();

    const data = {
      id: folder.id,
      data: {...state}
    };

    try {
      await dispatch(updateFolder(data));
      await dispatch(getFolders());
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Input
        onChange={handleChange}
        label="Название"
        required={true}
        type="text"
        name='name'
        value={state.name}
      />
      <div>
        <Button type="submit" text="Изменить" size="medium"/>
      </div>
    </form>
  )
};

export default UpdateFolderForm;