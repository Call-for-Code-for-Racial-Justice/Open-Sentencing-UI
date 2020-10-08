import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private http: HttpClient) { }

  // make backend call to get paginated data
  getPage(page){
    // return this.http.post(`${environment.defaultUIPath}/predict`, data)
    return 'test';
  }
}
