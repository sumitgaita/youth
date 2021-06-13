import { Component, OnDestroy, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
/*import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';*/
import { AccountService, CompanyService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  //@ViewChild('addTag') addTag: NgbModal;
  //modalOptions: NgbModalOptions;
  company = null;
  /*closeResult: string;*/
  status: string;
  statusList: string[] = ['Active', 'Inactive'];
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private companyService: CompanyService, private router: Router
   ) {

    this.columnDefs = [
      {
        headerName: 'Company Name',
        field: '',
        width: 168,
        tooltipField: 'companyName',
        cellRenderer: function (param: any) {
          if (param.data.id !== '') {
            const eDiv = document.createElement('div');
            let cellDef = '';
            cellDef += `<a class='companynamecell'><span class='editBtn'><i class='fa fa-pencil' aria-hidden='true'></i></span> ${param.data.companyName}</a>`;
            eDiv.innerHTML = cellDef;
            if (eDiv.querySelector('.companynamecell')) {
              eDiv.querySelector('.companynamecell').addEventListener('click', (ev: any) => {
                CompanyService.onEditCompanyRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      },

      { headerName: 'Contact Number', width: 170, tooltipField: 'contactNumber', field: 'contactNumber', sortable: true, filter: true },
      { headerName: 'Email ID', field: 'emailID', tooltipField: 'emailID', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'City', width: 150, field: 'city', tooltipField: 'city', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'State', width: 150, tooltipField: 'state', field: 'state', sortable: true, filter: true },
      { headerName: 'Country', width: 150, field: 'country', sortable: true, filter: true },
      { headerName: 'Status', width: 100, field: 'status', sortable: true, filter: true }
    ];
  }

  ngOnInit() {
    this.status = 'Active';
    this.company = [{
      id: '1', companyName: 'Company Name1', contactNumber: 'Contact Number1', emailID: 'Email ID1', city: 'City1', state: 'State1'
      , country: 'Country1', status: 'Status', isDeleting: false
    },
    {
      id: '2', companyName: 'Company Name1', contactNumber: 'Contact Number2', emailID: 'Email ID2', city: 'City2', state: 'State2'
      , country: 'Country2', status: 'Status', isDeleting: false
    },
    {
      id: '3', companyName: 'Company Name1', contactNumber: 'Contact Number3', emailID: 'Email ID3', city: 'City3', state: 'State3'
      , country: 'Country3', status: 'Status', isDeleting: false
    },
    {
      id: '4', companyName: 'Company Name', contactNumber: 'Contact Number4', emailID: 'Email ID4', city: 'City4', state: 'State4'
      , country: 'Country4', status: 'Status', isDeleting: false
    }];
    this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.company);
  }

  //onPageSizeChanged(event: any) {
  //  this.gridApi.paginationSetPageSize(Number(event.target.value));
  //}

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscription = [];
  }

  setupSubscription() {
    if (this.subscription.length === 0) {
      this.subscription.push(CompanyService.onEditCompanyRow.subscribe((item: any) => {
        if (item) {
          //this.router.navigate(['edit/1']);
          this.router.navigate(['/company/edit/' + item.data.id]);

        }
      }));
    }

  }

  deleteCompany(id: string) {
    const company = this.company.find(x => x.id === id);
    company.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.company = this.company.filter(x => x.id !== id));
  }
  

}
