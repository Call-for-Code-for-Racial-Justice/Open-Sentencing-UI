import { TemplateRef, Component, ViewChild, OnInit, Input } from '@angular/core';
import { CaseService } from './cases.service';
import { TableModel, TableItem, TableHeaderItem, ModalService } from 'carbon-components-angular';
import { ModalComponent } from '../modal/modal.component';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CaseComponent implements OnInit {
  @ViewChild('overflowMenuItemTemplate', { static: true })
  protected overflowMenuItemTemplate: TemplateRef<any>;
  // table values
  model = new TableModel();
  originalModelData;
  tableSize = 'md';
  striped = true;
  isDataGrid = false;
  sortable = true;
  stickyHeader = false;
  skeleton = false;

  // modal values
  chargesModalForm = {
    caseName: 'test',
    caseDescription: 'test',
    charges: 'test'
  };
  defendantBackgroundForm = {
    defendantName: 'test',
    defendantRace: 'test',
    defandantCharges: 'test'
  };
  showCreateCase: boolean;

  @Input() modalText = 'Add a new case';
  @Input() modalSize = 'lg';

  constructor(private caseService: CaseService, protected modalService: ModalService) {}

  selectPage(page) {
    this.caseService.getPage(page);
    //   .subscribe((data: Array<Array<any>>) => {
    //     // set the data and update page
    //     this.resultsModel.data = this.prepareData(data);
    //     this.resultsModel.currentPage = page;
    // });
  }

  ngOnInit() {
    this.model.data = [
      [new TableItem({ data: 'han v US' }), new TableItem({ data: 'This case is about an armed robbery.' }),
      new TableItem({ data: 1927 }), new TableItem({ data: 43 }),
      new TableItem({ data: { id: '1' }, template: this.overflowMenuItemTemplate })],
      [new TableItem({ data: 'Spivack v US' }), new TableItem({ data: 'This case is about an armed robbery.' }),
      new TableItem({ data: 1927 }), new TableItem({ data: 43 }),
      new TableItem({ data: { id: '2' }, template: this.overflowMenuItemTemplate })],
      [new TableItem({ data: 'Spivack v US' }), new TableItem({ data: 'This case is about an armed robbery.' }),
      new TableItem({ data: 1927 }), new TableItem({ data: 43 }),
      new TableItem({ data: { id: '3' }, template: this.overflowMenuItemTemplate })],
      [new TableItem({ data: 'Spivack v US' }), new TableItem({ data: 'This case is about an armed robbery.' }),
      new TableItem({ data: 1927 }), new TableItem({ data: 43 }),
      new TableItem({ data: { id: '4' }, template: this.overflowMenuItemTemplate })],
      [new TableItem({ data: 'Spivack v US' }), new TableItem({ data: 'This case is about an armed robbery.' }),
      new TableItem({ data: 1927 }), new TableItem({ data: 43 }),
      new TableItem({ data: { id: '5' }, template: this.overflowMenuItemTemplate })],
      [new TableItem({ data: 'Spivack v US' }), new TableItem({ data: 'This case is about an armed robbery.' }),
      new TableItem({ data: 1927 }), new TableItem({ data: 43 }),
      new TableItem({ data: { id: '6' }, template: this.overflowMenuItemTemplate })],
      [new TableItem({ data: 'Spivack v US' }), new TableItem({ data: 'This case is about an armed robbery.' }),
      new TableItem({ data: 1927 }), new TableItem({ data: 43 }),
      new TableItem({ data: { id: '7' }, template: this.overflowMenuItemTemplate })],
    ];
    this.model.header = [
      new TableHeaderItem({ data: 'Case name' }),
      new TableHeaderItem({ data: 'Case description' }),
      new TableHeaderItem({ data: '# of document' }),
      new TableHeaderItem({ data: '# of insights' }),
      new TableHeaderItem({ data: '' })
    ];
    this.originalModelData = this.model.data;
  }

  onRowClick(index: number) {
    console.log('Row item selected:', index);
  }

  openCaseModal() {
    this.modalService.create({
      component: ModalComponent,
      inputs: {
        modalText: this.modalText,
        size: this.modalSize
      }
    });
  }

  filterModelData(searchValue: string) {
    if (searchValue) {
      searchValue = searchValue.toLowerCase();
      this.model.data = this.model.data.filter(
        (item) => item[0].data.toLowerCase().includes(searchValue)
               || item[1].data.toLowerCase().includes(searchValue)
      )
    } else {
      this.model.data = this.originalModelData;
    }
  }
}
