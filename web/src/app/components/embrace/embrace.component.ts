import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmbraceService } from './embrace.service';

@Component({
  selector: 'app-embrace',
  templateUrl: './embrace.component.html',
  styleUrls: ['./embrace.component.scss']
})
export class EmbraceComponent implements OnInit {
  submitOffenseForm;
  isValid = true;
  message: string;

  constructor(private embraceService: EmbraceService) {
    this.initialize();
  }

  initialize() {
    this.submitOffenseForm = new FormGroup({
      chargeCount: new FormControl(),
      chargeDisposition: new FormControl(),
      offenseCategory: new FormControl(),
      primaryChargeFlag: new FormControl('NONE'),
      dispositionChargedOffenseTitle: new FormControl(),
      dispositionChargedClass: new FormControl(),
      sentenceJudge: new FormControl(),
      sentencePhase: new FormControl(),
      commitmentTerm: new FormControl(),
      commitmentUnit: new FormControl(),
      lengthOfCase: new FormControl(),
      ageAtIncident: new FormControl(),
      race: new FormControl(),
      gender: new FormControl(),
      incidentCity: new FormControl(),
      lawEnforcementAgency: new FormControl(),
      lawEnforcementUnit: new FormControl(),
      sentenceType: new FormControl()
    });
    this.isValid = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isValid = this.validateData(this.submitOffenseForm.value);
    if (!this.isValid) {
      this.message = 'All the fields are required. Please enter the valid information and submit again.';
    } else {
      this.message = undefined;
      // console.log("primary Flag: ", this.submitOffenseForm.value.primaryChargeFlag);
      if (this.submitOffenseForm.value.primaryChargeFlag.toLowerCase() === 'true') {
        this.submitOffenseForm.value.primaryChargeFlag = true;
      } else {
        this.submitOffenseForm.value.primaryChargeFlag = false;
      }
      this.embraceService.submitData(this.submitOffenseForm.value)
        .subscribe((data: any) =>  {
          if (data) {
            this.isValid = true;
            this.message = data.years_of_racial_bias_sentencing_discrepency;
            this.initialize();
          } else {
            this.isValid = false;
            this.message = data.message ? data.message : 'Error occurred while submitting the request.';
          }
        });
    }
  }

  validateData(formData): boolean {
    if (
      !formData ||
      !formData.chargeCount ||
      !formData.chargeDisposition ||
      formData.primaryChargeFlag === 'NONE' ||
      !formData.offenseCategory || !formData.dispositionChargedOffenseTitle || !formData.dispositionChargedClass
      || !formData.sentenceJudge || !formData.sentencePhase || !formData.commitmentTerm
      || !formData.commitmentUnit || !formData.lengthOfCase || !formData.ageAtIncident
      || !formData.race || !formData.gender || !formData.incidentCity || !formData.lawEnforcementAgency
      || !formData.lawEnforcementUnit || !formData.sentenceType
    ) {
      return false;
    }
    return true;
  }
}
