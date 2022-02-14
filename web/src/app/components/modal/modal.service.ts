import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalSvc {

  constructor(private http: HttpClient) { }

  submitForm(formData: any) {
    console.log(formData);
    return this.http.post(environment.defaultUIPath, formData);
  }
}
