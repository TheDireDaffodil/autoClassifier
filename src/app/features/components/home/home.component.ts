import {Component, OnInit} from '@angular/core';
import {FileDownloadService} from "../../../shared/services/file-download.service";
import {MailStorage} from "../../services/mailStorage";
import {HttpClient} from "@angular/common/http";
import {MailService} from "../../services/mail.service";
import {MailResponse} from "../../Model/mailResponse";

@Component({
  selector: 'ac-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fileUrl: any;
  filename: string | undefined;
  title: string | undefined;
  mails = ['pec1', 'pec2', 'pec3', 'pec4'];
  results: MailResponse[] = [];


  constructor(private downloadService: FileDownloadService,
              private mailService: MailService,
              private mailStorage: MailStorage,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  // create the downloadable file with the results of all email sent to the IL
  generateFile() {
    this.fileUrl = URL.createObjectURL(this.downloadService.createFile(this.mailStorage.writeResults()));
    this.filename = 'Results ' + new Date().toDateString();
  }

  private elaborateResults() {
    // displays the results
    this.results = this.mailStorage.results
    // creating a downloadable file
    this.generateFile();
  }

  // retrieve the uploaded file
  onFileSelected(event: Event) {
    let input = event.target as HTMLInputElement
    console.log(input.files)
    if (input.files != null) {
      this.mailStorage.reset();
      this.title = input.files.length > 1 ? 'Multiple files selected' : input.files[0].name;
      // for every file send the email to the IL
      for (let index = 0; index < input.files.length; index++) {
        let file = input.files.item(index)
        if (file)
          this.mailService.sendPec(index + 1 + '' , file.name, file);
      }
      this.elaborateResults();
    }
  }

// retrieve all email saved in the assets/email folder and send them to the IL, then saves and display the results, creating a downloadable file
  runDefaultTest() {
    this.mailStorage.reset();
    let id = 1;
    // send every email to IL
    for (let mailName in this.mails) {
      this.http.get<File>('/assets/mails' + mailName + '.eml').subscribe(mail => {
        this.mailService.sendPec(id + '', mailName,  mail);
      });
      id++
    }
    this.elaborateResults();
  }

}
