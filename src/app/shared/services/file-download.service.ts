import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor() { }
  createFile(text: string): Blob {
    return new Blob([text], {type: '.txt'});
  }
}
