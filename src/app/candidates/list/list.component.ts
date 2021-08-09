import { Component, OnDestroy, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, CompanyService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
//import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('viewResume') viewResume: NgbModal;
  modalOptions: NgbModalOptions;
  candidates = null;
  allCandidates = null;
  closeResult: string;
  status: string;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  isAdvanceSearchVisible: boolean = false;
  viewer = 'url';
  selectedType = 'docx';
  DemoDoc: any;
  //private subscription: Subscription[] = [];
  constructor(private accountService: AccountService,
    private companyService: CompanyService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'candidatesName',
        width: 168,
        tooltipField: 'candidatesName',
        sortable: true,
        filter: true
      },
      { headerName: 'Contact Number', width: 168, field: 'contactNumber', tooltipField: 'contactNumber', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Email Address', field: 'emailID', tooltipField: 'emailID', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Location', width: 170, tooltipField: 'location', field: 'location', sortable: true, filter: true },
      { headerName: 'City/State/Country', width: 170, tooltipField: 'city_state_country ', field: 'city_state_country', sortable: true, filter: true },
      {
        headerName: 'View resume', width: 100, field: '', tooltipField: 'resume ', cellRenderer: function (param: any) {
          if (param.data.id !== '') {
            const eDiv = document.createElement('div');
            let cellDef = '';
            cellDef += `<div title="quick view">
             <i class="fa fa-binoculars" aria-hidden="true"></i>
            </div>`;
            eDiv.innerHTML = cellDef;
            return eDiv;
          }
        },
        sortable: false
      }

    ];
  }

  ngOnInit() {
    this.candidates = [{
      id: '1', candidatesName: 'Robart Harihoron1', contactNumber: '098-7543', emailID: 'abc@gmail.com', location: 'Canadian', city_state_country: 'Ontario,TO, Canadian', workauthorization: 'Canadian Citizen', currentsalary: '$290'
    },
    {
      id: '2', candidatesName: 'Robart Harihoron2', contactNumber: '098-7543', emailID: 'abc@gmail.com', location: 'Canadian', city_state_country: 'Brockville, MA, Canadian', workauthorization: 'Canadian Citizen', currentsalary: '$290'
    },
    {
      id: '3', candidatesName: 'Robart Harihoron3', contactNumber: '098-7543', emailID: 'abc@gmail.com', location: 'Canadian', city_state_country: 'Brockville, MA, Canadian', workauthorization: 'Canadian Citizen', currentsalary: '$290'
    },
    {
      id: '4', candidatesName: 'Robart Harihoron4', contactNumber: '098-7543', emailID: 'abc@gmail.com', location: 'Canadian', city_state_country: 'Brockville, MA, Canadian', workauthorization: 'Canadian Citizen', currentsalary: '$290'
    }];
    // this.setupSubscription();
    this.allCandidates = this.candidates;
  }

  search(value: string): void {
    this.isAdvanceSearchVisible = false;
    this.candidates = this.allCandidates;
    if (value === "") {
      this.candidates = this.candidates;
    }
    else {
      this.candidates = this.candidates.filter((val) => val.candidatesName.toLowerCase().includes(value));
    }
  }
  adVanchSearchVisible() {
    this.isAdvanceSearchVisible = this.isAdvanceSearchVisible == false ? true : false;
  }
  isListingVisible() {
    this.isAdvanceSearchVisible = false;
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.candidates);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

  //onPageSizeChanged(event: any) {
  //  this.gridApi.paginationSetPageSize(Number(event.target.value));
  //}
  onCellClicked(event: any) {
    if (event.colDef.headerName === 'View resume') {
      this.spinner.show();
      this.openModel(this.viewResume);
      this.DemoDoc = 'https://drive.google.com/file/d/0B5ImRpiNhCfGZDVhMGEyYmUtZTdmMy00YWEyLWEyMTQtN2E2YzM3MDg3MTZh/preview';
      this.spinner.hide();
    }
    else {
      this.router.navigate(['/candidates/edit/' + event.data.id]);
    }
  }
  ngOnDestroy() {
    //this.subscription.forEach(sub => {
    //  sub.unsubscribe();
    //});
    //this.subscription = [];
  }

  //setupSubscription() {
  //  if (this.subscription.length === 0) {
  //    this.subscription.push(CompanyService.onEditCompanyRow.subscribe((item: any) => {
  //      if (item) {
  //        //this.router.navigate(['edit/1']);
  //        this.router.navigate(['/company/edit/' + item.data.id]);

  //      }
  //    }));
  //  }

  //}

  deleteCompany(id: string) {
    const company = this.candidates.find(x => x.id === id);
    company.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.candidates = this.candidates.filter(x => x.id !== id));
  }

  private openModel(content: any) {
    this.modalService.open(content, { centered: true, backdrop: "static", size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
