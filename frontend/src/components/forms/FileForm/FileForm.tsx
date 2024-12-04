import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetErrors, selectError, showFormFileModal } from "../../../app/slices/fileSlice";
import { selectFolders } from "../../../app/slices/folderSlice";
import { createFile, getFiles } from "../../../app/thunks/fileThunk";
import { getFolders, getOneFolder } from "../../../app/thunks/folderThunk";
import { ICreateFile, ICreateFileMutation } from "../../../types";
import Button from "../../UI/Button/Button";
import FileInput from "../../UI/FileInput/FileInput";
import Input from "../../UI/Input/Input";
import './FileForm.css';


const FileForm = () => {
  const [state, setState] = useState<ICreateFile>({
    name: '',
    folderId: '',
    file: null
  });
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch])
  
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

    const data: ICreateFileMutation = {
      ...state,
      folderId: state.folderId?.trim() === '' ? null : state.folderId ,
    };    

    try {
      await dispatch(createFile(data)).unwrap();
      await dispatch(getFiles());
      if (data.folderId) {
        dispatch(getOneFolder(data.folderId));
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
          {
            !folders.length ? null :
            <select
                className="form-select"
                value={state.folderId}
                onChange={handleChange}
                name="folderId"
              >
              <option value="" defaultValue="">Выберите папку</option>
                {folders.map((folder) => (
                  <option
                    key={folder.id}
                    value={folder.id}
                  >
                    {folder.name}
                  </option>
                ))}
            </select>   
          }
        </div>
        <div>
          <FileInput
            OnChange={filesInputHandleChange}
            label="Файл"
            name="file"
          />
        </div>
        <div>
          <Button text="Создать файл" type='submit' size="medium" />
        </div>
      </form>
    </div>
  )
};

export default FileForm;