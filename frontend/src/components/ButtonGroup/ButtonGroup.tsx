import { useAppDispatch } from "../../app/hooks";
import { setFileView } from "../../app/slices/fileSlice";
import Button from "../UI/Button/Button";
import './ButtonGroup.css';

interface IProps {
  openModalCreateFolder: () => void;
  openModalCreateFile: () => void;
}

const ButtonGroup: React.FC<IProps> = ({
  openModalCreateFolder,
  openModalCreateFile }) => {

  const dispatch = useAppDispatch()
  
  return (
    <div className="button-group-wrap">
      <Button
        size='s'
        text='Создать папку'
        type='button'
        onClick={openModalCreateFolder}
      />
      <Button
        size='s'
        text='Создать файл'
        type='button'
        onClick={openModalCreateFile}
      />
      <button className="btn__plate" onClick={() => dispatch(setFileView('plate'))}/>
      <button className="btn__list" onClick={() => dispatch(setFileView('list'))}/>
    </div>
  )
};

export default ButtonGroup;