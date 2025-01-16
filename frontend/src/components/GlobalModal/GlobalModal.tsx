import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeEditFileModal, closeEditFolderModal, closeViewFileModal } from "../../app/slices/modalSlice";
import { API_FILE_URL } from "../../constants";
import FileViewer from "../FileViewer/FileViewer";
import UpdateFileForm from "../forms/FileForm/UpdateFileForm";
import UpdateFolderForm from "../forms/FolderForm/UpdateFolderForm";
import Modal from "../UI/Modal/modal";


const GlobalModals: React.FC = () => {
  const dispatch = useAppDispatch();
  const { editFile, viewFile, editFolder } = useAppSelector((state) => state.modal);

  return (
    <>
      {editFile && (
        <Modal
          title="Переименовать файл"
          isOpen={!!editFile}
          onClose={() => dispatch(closeEditFileModal())}
        >
          <UpdateFileForm file={editFile} />
        </Modal>
      )}
      {viewFile && (
        <Modal
          title={viewFile.name}
          isOpen={!!viewFile}
          onClose={() => dispatch(closeViewFileModal())}
        >
          <FileViewer
            fileUrl={API_FILE_URL + viewFile.path}
            extension={viewFile.extension}
          />
        </Modal>
      )}
      {editFolder && (
        <Modal
        title='Переименование папки'
        onClose={() => dispatch(closeEditFolderModal())}
        isOpen={!!editFolder}
      >
        <UpdateFolderForm folder={editFolder}/>
      </Modal>
      )}
    </>
  );
};

export default GlobalModals;
