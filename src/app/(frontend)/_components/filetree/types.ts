export enum SpecialFolderTypes {
  BLOGS,
}

export interface Folder<T extends SpecialFolderTypes | undefined> {
  text: string,
  files: T extends SpecialFolderTypes ? undefined : (File | Folder<SpecialFolderTypes | undefined>)[],
  type?: T
}

export interface File {
  text: string,
  url: string,
}

export function isAFile(fileOrFolder: Folder<SpecialFolderTypes | undefined> | File): fileOrFolder is File {
  return (fileOrFolder as File).url !== undefined;
}
