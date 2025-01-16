// app/slices/modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile, IFolder } from "../../types";

interface ModalState {
  editFile: IFile | null;
  viewFile: IFile | null;
  editFolder: IFolder | null;
}

const initialState: ModalState = {
  editFile: null,
  viewFile: null,
  editFolder: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEditFileModal(state, action: PayloadAction<IFile>) {
      state.editFile = action.payload;
    },
    closeEditFileModal(state) {
      state.editFile = null;
    },
    openViewFileModal(state, action: PayloadAction<IFile>) {
      state.viewFile = action.payload;
    },
    closeViewFileModal(state) {
      state.viewFile = null;
    },
    openEditFolderModal(state, action: PayloadAction<IFolder>) {
      state.editFolder = action.payload;
    },
    closeEditFolderModal(state) {
      state.editFolder = null;
    },
  },
});

export const {
  openEditFileModal,
  closeEditFileModal,
  openViewFileModal,
  closeViewFileModal,
  openEditFolderModal,
  closeEditFolderModal
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
