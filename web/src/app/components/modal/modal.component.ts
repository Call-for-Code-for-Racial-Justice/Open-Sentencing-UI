import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseModal, ListItem, ModalService } from 'carbon-components-angular';
import { ModalSvc } from './modal.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sample-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends BaseModal implements OnInit {
  modalText = 'Add a new case';
  isValid = true;
  helperText;
  message;
  modalSize;

  // combo box
  selectedItems = [];
  tempTagFilter = [];
  filterCharge = [];
  selectedItemTag = [];
  public searchText = new Subject<string>();

  // charges record
  charges = [
    'Administration of Justice',
    'Aggravated Assault Police Officer',
    'Aggravated Battery Police Officer',
    'Aggravated Battery With A Firearm',
    'Aggravated Battery',
    'Aggravated Discharge Firearm',
    'Aggravated DUI',
    'Aggravated Fleeing and Eluding',
    'Aggravated Identity Theft',
    'Aggravated Robbery',
    'Antitrust',
    'Armed Robbery',
    'Armed Violence',
    'Arson and Attempt Arson',
    'Arson',
    'Attempt Armed Robbery',
    'Attempt Arson',
    'Attempt First Degree Murder',
    'Attempt Homicide',
    'Attempt Sex Crimes',
    'Attempt Vehicular Hijacking',
    'Battery',
    'Bomb Threat',
    'Bribery',
    'Bribery/Corruption',
    'Burglary',
    'Burglary/Trespass',
    'Child Abduction',
    'Child Pornography',
    'Commercialized Vice',
    'Communicating With Witness',
    'Credit Card Cases',
    'Criminal Damage to Property',
    'Criminal Trespass To Residence',
    'Deceptive Practice',
    'Disarming Police Officer',
    'Dog Fighting',
    'Domestic Battery',
    'Driving With Suspended Or Revoked License',
    'Drug Possession',
    'Drug Trafficking',
    'DUI',
    'Environmental',
    'Escape - Failure to Return',
    'Extortion/Racketeering',
    'FALSIFICATION OF ACCOUNTS',
    'Failure to Register as a Sex Offender',
    'Firearms',
    'Food and Drug',
    'Forgery',
    'Forgery/Counter/Copyright',
    'Fraud',
    'Fraud/Theft/Embezzlement',
    'Fraudulent ID',
    'Gambling',
    'Gun - Non UUW',
    'Gun Running',
    'Hate Crimes',
    'Home Invasion',
    'Homicide',
    'Human Trafficking',
    'Identity Theft',
    'Immigration',
    'Impersonating Police Officer',
    'Intimidation',
    'Invidual Rights',
    'Kidnapping',
    'Major Accidents',
    'Manslaughter',
    'Money Laundering',
    'Murder',
    'Narcotics',
    'National Defense',
    'Obscenity/Other Sex Offenses',
    'Obstructing Justice',
    'Official Misconduct',
    'Other Offense',
    'Other',
    'Pandering',
    'Perjury',
    'Possession Of Burglary Tools',
    'Possession of Contraband in Penal Institution',
    'Possession of Explosives',
    'Possession of Stolen Motor Vehicle',
    'Prison Offenses',
    'PROMIS Conversion',
    'Prostitution',
    'Reckless Discharge of Firearm',
    'Reckless Homicide',
    'Residential Burglary',
    'Retail Theft',
    'REVOKED/SUSPENDED 2ND+ DUI',
    'Robbery',
    'Sex Crimes',
    'SEX WITH ANIMAL/<18 PRESENT',
    'Sexual Abuse',
    'Stalking',
    'Stalking/Harassing',
    'Tampering',
    'Tax',
    'Theft by Deception',
    'Theft',
    'Unlawful Restraint',
    'UUW - Unlawful Use of Weapon',
    'Vehicular Hijacking',
    'Vehicular Invasion',
    'Violate Bail Bond',
    'VIO BAIL BOND/CLASS X CONVIC',
    'Violation of Sex Offender Registration',
    'Violation Order Of Protection'
  ];

  // step-1 model
  textForButton = 'Next: Case details';

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

  // radio selection
  enableRadioSelection = false;

  // new form initialization
  defendantAndCaseForm = new FormGroup({
    defendantname: new FormControl(),
    // casedescription: new FormControl(),
    chargedescription: new FormControl(),
    defendantrace: new FormControl(),
    defendantgender: new FormControl(),
    radioGroup: new FormControl(),
    amountOfDrugPossessed: new FormControl(),
    crimialHistoryCategory: new FormControl(),
    estimatedSentence: new FormControl(),
    givenSentence: new FormControl()
  });

  constructor(
    protected modalService: ModalService,
    protected modalSvc: ModalSvc
  ) {
    super();
  }

  // init function
  ngOnInit() {
    this.modalSize = 'lg';
    this.showProgress();
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
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((query) =>  this._filter(query))
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

  // form next or submit
  goNextOrSave() {
    this.isValid = this.validateData(this.defendantAndCaseForm.value);
    if (!this.isValid) {
      this.message = 'All the fields are required. Please enter the valid information and submit again.';
    } else {
      if (this.stepCounter !== 'Second') { // updating modal with second step on progress indicator
        this.message = undefined;
        this.selectedItemTag = [];
        this.textForButton = 'Finish';
        this.stepCounter = 'Second';
        this.showProgress();
      } else {
        this.showProgress();
        this.modalSvc.submitForm(this.defendantAndCaseForm.value)
        .subscribe((data: any) =>  {
          // wait for data success and then close modal
          this.modalService.destroy();
        });
      }
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

  // form validation
  validateData(formData): boolean {
    if (this.stepCounter === 'First') {
      if (
        !formData ||
        !formData.defendantname ||
        !formData.defendantrace ||
        !formData.defendantgender
      ) {
        return false;
      }
      return true;
    } else {
      if (this.selectedItemTag.length > 0) {
        formData.chargedescription = this.selectedItemTag;
      }
      if (
        !formData ||
        !formData.chargedescription || !formData.amountOfDrugPossessed ||
        !formData.crimialHistoryCategory || !formData.estimatedSentence || !formData.givenSentence
      ) {
        return false;
      }
      return true;
    }
  }
}
