import {Injectable} from "@angular/core";
import {MailResponse} from "../Model/mailResponse";

@Injectable({
  providedIn: 'root'
})
export class MailStorage{
  results: MailResponse[] = [];
  private separator = '\n ---------------------- NEXT ---------------------- \n';

  /** get the response (from the HTTP request) and save it in @results */
  saveResponse(response: MailResponse): void {
    let temp = Object.assign(new MailStorage(), response);
    this.results.push(temp);
  }

  writeResults(): string {
    let text = '';
    for (let result in this.results) {
      text += JSON.stringify(result) + this.separator;
    }
    return text;
  }

  reset() {
    this.results = [];
  }
}
