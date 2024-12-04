import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { ICreateFolder, IEditName, IFoelderWithFile, IFolder } from "../../types";

export const getFolders = createAsyncThunk(
  'folders/getAllFolders',
  async () => {
    const response = await axiosApi.get<IFolder[]>('folder');
    return response.data;
  }
);

export const getOneFolder = createAsyncThunk<IFoelderWithFile, string>(
  'folders/getOneFolder',
  async (id: string) => {
    const response = await axiosApi.get<IFoelderWithFile>(`folder/${id}`);
    return response.data;
  }
);

export const createFolder = createAsyncThunk<void, ICreateFolder>(
  'folders/createFolder',
  async (newFolder) => {
    await axiosApi.post('folder', newFolder);
  }
);

export const removeFolder = createAsyncThunk(
  'folders/removeFolder',
  async (id: string) => {
    await axiosApi.delete(`folder/${id}`);
  }
);

interface IUpdateFolder {
  id: string,
  data: IEditName,
}

export const updateFolder = createAsyncThunk<void, IUpdateFolder>(
  'folders/updateFolder',
  async (folder) => {
    await axiosApi.patch(`/folder/${folder.id}`, folder.data);
  }
);