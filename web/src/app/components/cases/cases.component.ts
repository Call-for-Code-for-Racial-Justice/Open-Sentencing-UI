import { TemplateRef, Component, ViewChild, OnInit, Input } from '@angular/core';
import { CaseService } from './cases.service';
import { Table,
         TableModel,
         TableItem,
         TableHeaderItem,
         ModalService
       } from 'carbon-components-angular';
import { ModalComponent } from '../modal/modal.component';
// import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CaseComponent implements OnInit {
  @ViewChild('overflowMenuItemTemplate', { static: true })
  protected overflowMenuItemTemplate: TemplateRef<any>;
  // table values
  model: TableModel;
  skeletonModel = Table.skeletonModel(10, 5);
  skeleton = true;
  originalModelData;
  tableSize = 'md';
  striped = true;
  isDataGrid = false;
  sortable = true;
  stickyHeader = false;
  showSelectionColumn = false;
  enableSingleSelect = false;

  // mock case data
  pageLength = 10;
  totalDataLength = 105;

  // modal values
  showCreateCase: boolean;

  constructor(private caseService: CaseService, protected modalService: ModalService) {}

  selectPage(page) {
    this.caseService.getPage(page, this.model.pageLength)
      .subscribe((data: Array<Array<any>>) => {
        // set the data and update page
        // let data = this.caseService.getPage(page, this.pageLength);
        this.model.data = this.tableModelData(data);
        this.model.currentPage = page;

        // for search
        this.originalModelData = this.model.data;
        this.skeleton = false;
    });
  }

  ngOnInit() {
    this.model = new TableModel();
    this.model.header = this.tableModelHeader();
    this.model.pageLength = this.pageLength;
    this.model.totalDataLength = this.totalDataLength;
    this.selectPage(1);
  }

  tableModelData(data) {
    const modelData = [];
    for (const i of data) {
      const temp = i.splice(',');
      const caseIdentifier = temp[0];
      const charge = temp[1];
      const caseId = temp[2];
      const row = [
        new TableItem({data: caseIdentifier}),
        new TableItem({data: charge}),
        new TableItem({data: {id: caseId}, template: this.overflowMenuItemTemplate})
      ];

      modelData.push(row);
    }

    return modelData;
  }

  tableModelHeader() {
    const header = [
      new TableHeaderItem({ data: 'Case ID' }),
      new TableHeaderItem({ data: 'Charge' }),
      new TableHeaderItem({ data: '' })
    ];

    return header;
  }

  onRowClick(index: number) {
    console.log('Row item selected:', index);
  }

  openCaseModal() {
    this.modalService.create({
      component: ModalComponent
    });
  }

  filterModelData(searchValue: string) {
    if (searchValue) {
      searchValue = searchValue.toLowerCase();
      this.model.data = this.model.data.filter(
        (item) => item[0].data.toLowerCase().includes(searchValue)
               || item[1].data.toLowerCase().includes(searchValue)
      );
    } else {
      this.model.data = this.originalModelData;
    }
  }

  sortColumn(index) {
    // enable sorting for the first 4 columns only
    if (index <= 3) {
      this.model.header[index].ascending = !this.model.header[index].ascending;
      this.model.sort(index);
    }
  }
}
