export interface FileUploadDto {
    uid: string;
    name: string;
    status: 'done' | 'uploading' | 'error';
    url: string;
  }

export interface DocumentDto{
    name: string,
    size: number,
    lastModifiedDate: Date, 
}