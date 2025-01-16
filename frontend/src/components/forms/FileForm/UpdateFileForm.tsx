import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetErrors, selectError } from "../../../app/slices/fileSlice";
import { closeEditFileModal } from "../../../app/slices/modalSlice";
import { getFiles, updateFile } from "../../../app/thunks/fileThunk";
import { getOneFolder } from "../../../app/thunks/folderThunk";
import { IFile, IUpdateFileFields } from "../../../types";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

interface IProps {
  file: IFile;
}

const UpdateFileForm:React.FC<IProps> = ({file}) => { 
 const [state, setState] = useState<IUpdateFileFields>({
    name: file.name,
  })
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetErrors());
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState, 
      [name]: value,
    }));
  };


  const onFormSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    dispatch(resetErrors());

    const data = {
      id: file.id,
      data: {...state}
    };

    try {
      await dispatch(updateFile(data)).unwrap();
      if (file.folderId) {
        await dispatch(getOneFolder(file.folderId));
      }
      await dispatch(getFiles());
      dispatch(closeEditFileModal());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <span className="form-error">{ error ? error : '' }</span>
      <Input
        onChange={handleChange}
        label="Название"
        required={true}
        type="text"
        name='name'
        value={state.name!}
      />
      <div>
        <Button type="submit" text="Изменить" size="md"/>
      </div>
    </form>
  )
};

export default UpdateFileForm;