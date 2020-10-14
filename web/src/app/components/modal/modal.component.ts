import { Component, Inject, OnInit } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';

@Component({
  selector: 'app-sample-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends BaseModal implements OnInit {
  helperText: string;
  // dummy charges record
  charges = [
    'Second degree armed assault',
    'Charge1',
    'Charge2',
    'Charge3',
    'Charge4'
  ];
 filterCharge = [];

  // step-1 model
  inputValue1 = '';
  inputValue2 = '';
  inputValue3 = '';
  textForButton = 'Next: Case details';
  disableValidForm = true;

  // progress indicator
  current;
  stepCounter = 'First';
  steps = [];
  defaultSteps = [
      {
        text: 'Defendant background',
        state: ['incomplete']
      },
      {
        text: 'Case details',
        state: ['incomplete']
      }
    ];

  showProgress() {
    this.steps = Array.from(this.defaultSteps);
    switch (this.stepCounter) {
      case 'First':
        this.current = 0;
        break;
      case 'Second':
        this.current = 1;
        break;
      default:
        this.current = 0;
        break;
    }
  }

  constructor(
    @Inject('modalText') public modalText,
    @Inject('size') public size,
    protected modalService: ModalService
  ) {
    super();
  }
  ngOnInit() {
    this.showProgress();
  }

  onChange() {
    this.charges.filter(el => {
      console.log(el, this.inputValue3);
      if (el.includes(this.inputValue3)) {
        this.filterCharge.push(el);
      }
    });
    console.log(this.filterCharge);
  }

  goNextOrSave() {
    this.textForButton = 'Finish';
    this.disableValidForm = true;
    this.stepCounter = 'Second';
    this.showProgress();
  }
}
