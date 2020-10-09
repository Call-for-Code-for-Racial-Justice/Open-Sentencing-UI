import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

// for mocking sevice
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  cases = [];

  constructor(private http: HttpClient) {
    // mock cases
    this.cases = this.caseData();
  }

  // make backend call to get paginated data
  getPage(page, pageLength){
    const pageData = this.preparePage(page, pageLength);

    return new Observable( (observer) => {
      observer.next( pageData );
      observer.complete();
    });
  }

  preparePage(page, pageLength) {
    // return this.http.post(`${environment.defaultUIPath}/predict`, data)
    // lastPageLength can be zero
    let lastPageLength = this.cases.length % pageLength;
    let wholePages = this.cases.length - lastPageLength;

    if (page <= wholePages) {
      return this.cases.slice((page-1)*pageLength, page*pageLength);
    } else if (lastPageLength !== 0) {
      return this.cases.slice((page-1)*pageLength, (page-1)*pageLength + lastPageLength);
    }
  }

  caseData() {
    let data = [];

    for (let i = 1; i <= 105; i++) {
      var new_row = [
        'Spivack vs US case ' + i.toString(),
        'This case is about an armed robbery.',
        '1927',
        '43',
        i.toString()
      ];

      data.push(new_row);
    }

    return data;
  }
}
