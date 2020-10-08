import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmbraceService {

  constructor(private http: HttpClient) { }

  submitData(formData: any) {
    console.log('Submitting new request on Embrace.');
    const data = this.converToPascalCase(formData);
    return this.http.post(`${environment.defaultUIPath}/predict`, data);
  }

  converToPascalCase(formData) {
    const formData2 = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key === null || key === void 0) { return ''; }
      if (typeof key.toString !== 'function') { return ''; }

      const input = key.toString().trim();
      if (input === '') { return ''; }
      if (input.length === 1) { return input.toLocaleUpperCase(); }
      let key2 = input.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();
      if (key2 === 'LENGTH_OF_CASE') {
        key2 = key2 + '_in_Days';
      }
      formData2[key2] = value;
    }
    return formData2;
  }
}
