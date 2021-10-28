import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MailStorage} from "./mailStorage";
import {environment} from "../../../environments/environment";
import {MailResponse} from "../Model/mailResponse";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient,
              private storage: MailStorage) { }

  sendPec(id: string, fileName: string, mail: File): void {
    const formData: FormData = new FormData();
    formData.append('mail', mail, fileName);
    this.http.post<MailResponse>(environment.serverUrl + '/protocollazione/sendPEC/' + id , formData)
      .subscribe(response => this.storage.saveResponse(response))

}

}
