
export interface IFolder {
  id: string;
  createdAT: string;
  updatedAt: string;
  name: string;
}

export interface IFile {
  id: string;
  createdAT: string;
  updatedAt: string;
  name: string;
  path: string;
  folderId: string | null;
  extension: string;
}

export interface IFoelderWithFile extends IFolder {
  files: IFile[];
}

export interface ICreateFolder {
  name: string;
}

export interface ICreateFile {
  name: string;
  folderId: string;
  file: File | null;
}

export type ICreateFileMutation = Omit<ICreateFile, 'folderId'> & {
  folderId: string | null;
}
  
export interface IEditName { name: string };