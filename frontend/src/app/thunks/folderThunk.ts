import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { ICreateFolder, IFoelderWithFile, IFolder, IUpdateFolder } from "../../types";

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

export const updateFolder = createAsyncThunk<void, IUpdateFolder>(
  'folders/updateFolder',
  async (folder, { rejectWithValue }) => {
    try {
      await axiosApi.patch(`/folder/${folder.id}`, folder.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка сервера';
      return rejectWithValue(errorMessage)
    }
  }
);

export const getFavoritesFolder = createAsyncThunk(
  'folders/favorites',
  async () => {
    const response = await axiosApi.get<IFolder[]>('folder/favorites');
    return response.data;
  }
);