import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetErrors, selectError, showFormFileModal } from "../../../app/slices/fileSlice";
import { currentDir } from "../../../app/slices/folderSlice";
import { createFile, getFiles } from "../../../app/thunks/fileThunk";
import { getOneFolder } from "../../../app/thunks/folderThunk";
import { ICreateFile } from "../../../types";
import Button from "../../UI/Button/Button";
import FileInput from "../../UI/FileInput/FileInput";
import Input from "../../UI/Input/Input";
import './FileForm.css';


const FileForm = () => {
  const currentFolder = useAppSelector(currentDir);
  const initialState = {
    name: '',
    folderId: currentFolder ? currentFolder : null,
    file: null
  }

  const [state, setState] = useState<ICreateFile>(initialState);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const filesInputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(resetErrors());
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };
  
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetErrors());

    try {
      await dispatch(createFile(state)).unwrap();
      await dispatch(getFiles());
      if (state.folderId) {
        dispatch(getOneFolder(state.folderId));
      }

      dispatch(showFormFileModal());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <span className="form-error">{ error ? error : '' }</span>
        <Input
          required={true}
          label="Введите название файла"
          type="text"
          name='name'
          value={state.name}
          onChange={handleChange}
        />
        <div>
          <FileInput
            OnChange={filesInputHandleChange}
            label="Файл"
            name="file"
          />
        </div>
        <div>
          <Button text="Создать файл" type='submit' size="md" />
        </div>
      </form>
    </div>
  )
};

export default FileForm;