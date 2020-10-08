import { Component, Inject, OnInit } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';

@Component({
  selector: 'app-sample-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends BaseModal implements OnInit {

  helperText: string;

  // step-1 model
  inputValue1 = '';
  inputValue2 = '';
  inputValue3 = '';

  // progress indicator
  steps = [];
  defaultSteps = [
    {
      text: 'Case details',
      state: ['incomplete'],
      tooltip: { content: 'Overflow tooltip content.', trigger: 'click', placement: 'bottom' }
    },
    {
      text: 'Defendant background',
      state: ['incomplete'],
      tooltip: { content: 'Overflow tooltip content.', trigger: 'click', placement: 'bottom' }
    }, {
      text: 'Upload case documents',
      state: [],
      tooltip: { content: 'Overflow tooltip content.', trigger: 'click', placement: 'bottom' }
    }];
    orientation = 'horizontal';
    current = 0;

    // dummy charges record
    charges = ['Second degree armed assault', 'Charge1', 'Charge2', 'Charge3', 'Charge4'];
    filterCharge = [];

  constructor(
    @Inject('modalText') public modalText,
    @Inject('size') public size,
    protected modalService: ModalService
  ) {
    super();
  }
  ngOnInit() {

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
    alert('here');
  }
}
