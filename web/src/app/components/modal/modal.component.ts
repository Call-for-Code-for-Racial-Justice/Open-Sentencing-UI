import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  stepCounter:string = 'First';
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
  enableRadioSelection:boolean;

  // new form initialization
  defendantAndCaseForm :FormGroup;

  constructor(
    protected modalService: ModalService,
    protected modalSvc: ModalSvc,
    private fb:FormBuilder
  ) {
    super();

  }

  // init function
  ngOnInit() {
    this.showProgress();
    this.defendantAndCaseForm = this.fb.group({

      defendantBackground :new FormGroup({
        defendantname: new FormControl([Validators.required]),
        defendantrace: new FormControl([Validators.required]),
        defendantgender: new FormControl([Validators.required]),
      }),
     
      // casedescription: new FormControl(),
      caseDescription :new FormGroup({
      chargeDescription: new FormControl([Validators.required]),
       radioGroup: new FormControl(),
      amountOfDrugPossessed: new FormControl([Validators.required]),
      crimialHistoryCategory:new FormControl([Validators.required]),
      estimatedSentence: new FormControl([Validators.required]),
      givenSentence: new FormControl([Validators.required]),
      })

    });
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
    this.current = (this.stepCounter === 'First') ? 0:1;
  }

  // form next or submit
  goNextOrSave() {

      if (this.stepCounter !== 'Second') { // updating modal with second step on progress indicator
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
  

  // radio selection
  radioSelection(selection) {
    if (selection.value === 'yes') {
      // enable view
      this.enableRadioSelection = true;
    } else {
      this.enableRadioSelection = false;
    }
  }


}
