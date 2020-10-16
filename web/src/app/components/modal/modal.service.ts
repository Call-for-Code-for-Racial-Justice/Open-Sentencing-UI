import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalSvc {

  constructor(private http: HttpClient) { }

  submitForm(formData: any) {
    return this.http.post('/backend_api_endpoint', formData);
  }
}
