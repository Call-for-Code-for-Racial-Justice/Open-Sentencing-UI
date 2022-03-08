import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseModal, ListItem, ModalService } from 'carbon-components-angular';
import { ModalSvc } from './modal.service';
import { Subject } from 'rxjs';

import { Race } from 'src/app/models/client/Race';
import { Gender } from 'src/app/models/client/Gender';
import { validateGender } from './validation/GenderValidators';
import { validateRace } from './validation/RaceValidators';


@Component({
  selector: 'app-sample-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends BaseModal implements OnInit {
  // combo box
  selectedItems = [];
  tempTagFilter = [];
  filterCharge = [];
  selectedItemTag = [];

  public searchText = new Subject<string>();

  genderOptions:string[][] = Object.entries(Gender);
  raceOptions:string[][] = Object.entries(Race);

  genderIsSelected
  raceIsSelected

  // charges record
  charges = Charges.chargesList;

  // step-1 model
  textForButton = 'Next: Case details';
  validateDefendantName; 
   validateDefendantRace;
  validateDefendantGender;

  // progress indicator
  current;
  stepCounter:string = 'First';
  
  defaultSteps:Array<object> = [
      {
        text: 'Defendant background',
        state: ['incomplete']
      },
      {
        text: 'Case details',
        state: ['incomplete']
      }
    ];

  // radio selection
  enableRadioSelection:boolean;

  // new form initialization
  defendantAndCaseForm :FormGroup;
  caseDescription: FormGroup;
  caseDetailsIsSelected: boolean;
  validateFilter: AbstractControl;

  constructor(
    protected modalService: ModalService,
    protected modalSvc: ModalSvc,
    private fb:FormBuilder,
  ) {
    super();

  }

  // init function
  ngOnInit() {
   
    this.showProgress();
    
    const initialGender = '';

    const initialRace = '';

    this.defendantAndCaseForm = this.fb.group({
        defendantname: new FormControl(),
        defendantRace: new FormControl(initialRace, {
          validators: [
            Validators.required,
            Validators.minLength(1),
            validateRace
          ]
        }),

        defendantGender: new FormControl(initialGender, {
          validators: [
            Validators.required, 
            Validators.minLength(1), 
            validateGender
          ]
        }),

      // casedescription: new FormControl(),
       chargeFilterInput: new FormControl(),
        chargeDescription: new FormControl(),
        radioGroup: new FormControl(),
       amountOfDrugPossessed: new FormControl(),
       crimialHistoryCategory:new FormControl(),
       estimatedSentence: new FormControl(),
       givenSentence: new FormControl(),
       
    
      

    });
     

    this.validateDefendantName = this.defendantAndCaseForm.controls['defendantname'];
    this.validateDefendantGender= this.defendantAndCaseForm.controls.defendantGender;

    this.validateDefendantRace = this.defendantAndCaseForm.controls.defendantRace;
    this.validateFilter = this.defendantAndCaseForm.controls['chargeFilterInput']
    this.charges.forEach(charge => {
      this.filterCharge.push({id: charge, content: charge, selected: false})
    })
  }
  
  validateSelection(control:FormControl){
      if (control.value.length < 2 ){
        return {selection:true}
      }
  }

  // charges tag array
  selected(selection: any) {
    if (selection.item) {
      this.tempTagFilter.push(selection.item);
    }
    this.selectedItemTag = this.tempTagFilter;
  }

  onClose(selection) {
    alert(selection);
  }

  // charge filtering from available charges
  mySearch(search) {
    // add code
    let tempList: Array<ListItem> = [];
    this.searchText.next(search.target.value);
    this.searchText.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query?) =>  this._filter(query))
    )
    .subscribe(val => {
      if (val) {
        tempList.push({id: val, content: val, selected: false});
      } else {
        tempList = [];
      }
      this.filterCharge = tempList;
    });
  }

  // should be moved to modal service file and change to backend call
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.charges.filter(option => option.toLowerCase().includes(filterValue));
  }

  // progress indicator update
  showProgress() {
    this.current = (this.stepCounter === 'First') ? 0:1;
  }

  // form next or submit
  goNextOrSave() {

     if (this.stepCounter !== 'Second') { // updating modal with second step on progress indicator
        this.selectedItemTag = [];
       this.textForButton = 'Finish';
        this.stepCounter = 'Second';
        this.showProgress()
      
      } else {
        this.showProgress();
        this.modalSvc.submitForm(this.defendantAndCaseForm.value)
        .subscribe((data: any) => {
            // wait for data success and then close modal
            this.modalService.destroy()
            this.closeModal();
          },
          (err) => {
            console.error('Error: ' + JSON.stringify(err));
            this.modalService.destroy()
            this.closeModal();
          });
      }
    }
  

  // radio selection
  radioSelection(selection) {
    
    if (selection.value === 'yes') {
      // enable view
      this.enableRadioSelection = true;
    } else {
      this.enableRadioSelection = false;
    }
    
  }

  chargeDescriptionFilterTag(){
    if (this.selectedItemTag.length > 0) {
      this.defendantAndCaseForm.value.chargeDescription = this.selectedItemTag;
    }
  }

  validateCasedetails(){   
      this.caseDetailsIsSelected = this.validateDefendantRace.value[0] == ''; 
      this.genderIsSelected = this.validateDefendantGender.value[0] == '';
  }

  private isFormControlInvalid(formControlName: string): boolean {
    return this.defendantAndCaseForm.get(formControlName).touched && 
      this.defendantAndCaseForm.get(formControlName).invalid;
  }
}