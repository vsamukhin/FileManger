import React, { useRef, useState } from 'react';
import Button from '../Button/Button';
import './FileInput.css';

interface IProps {
  OnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
}

const FileInput: React.FC<IProps> = ({ OnChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState('');

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }

        OnChange(e);
    };

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

  return (
    <>
      <input
        type="file"
        name={name}
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileChange}
      />
      <div className='file-input'> 
        <div className='file-input-wrap'>
          <label className='file-input-label'>{ label }</label>
          <input
            className='file-input-fields'
            type="text"
            value={fileName}
            disabled={true}
          />
        </div>
        <div className='file-input-button-wrap'>
          <Button
            onClick={activateInput}
            size='s'
            type='button'
            text='Выберете файл'
          />
        </div>
      </div>
    </>
  )
};

export default FileInput;