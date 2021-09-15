import { Component, OnDestroy, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
/*import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';*/
import { AccountService, CompanyService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  //@ViewChild('addTag') addTag: NgbModal;
  //modalOptions: NgbModalOptions;
  company = null;
  allCompany = null;
  /*closeResult: string;*/
  status: string;
  statusList: string[] = ['All', 'Active', 'Inactive'];
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  //private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private companyService: CompanyService, private router: Router
  ) {

    this.columnDefs = [
      {
        headerName: 'Company Name',
        field: 'companyName',
        width: 168,
        tooltipField: 'companyName',
        sortable: true,
        filter: true
      },

      { headerName: 'Website', width: 170, tooltipField: 'website', field: 'website', sortable: true, filter: true },
      { headerName: 'Contact Number', width: 150, field: 'contactNumber', tooltipField: 'contactNumber', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Email ID', field: 'emailID', tooltipField: 'emailID', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Primary Location', width: 150, field: 'primaryLocation', tooltipField: 'primaryLocation', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      {
        headerName: 'Status', width: 100, field: '', tooltipField: 'status', cellRenderer: function (param: any) {
          if (param.data.id !== '') {
            const eDiv = document.createElement('div');
            let cellDef = '';
            if (param.data.status === 'Active') {
              cellDef += `<div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
            </div>`;
            }
            else {
              cellDef += `<div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            </div>`;
            }
            eDiv.innerHTML = cellDef;
            if (eDiv.querySelector('.companynamecell')) {
              eDiv.querySelector('.companynamecell').addEventListener('click', (ev: any) => {
                // AccountService.onEditUsersRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      }

    ];
  }

  ngOnInit() {
    localStorage.removeItem('fromCompany');
    this.status = 'All';
   // this.getAllCompany();
    this.company = [{
      id: '1', companyName: 'Company Name1', website: 'wwww.google.com', contactNumber: 'Contact Number1', emailID: 'Email ID1', primaryLocation: 'Torento', status: 'Active', isDeleting: false
    },
    {
      id: '2', companyName: 'Company Name2', website: 'wwww.google.com', contactNumber: 'Contact Number2', emailID: 'Email ID2', primaryLocation: 'Torento', status: 'Inactive', isDeleting: false
    },
    {
      id: '3', companyName: 'Company Name3', website: 'wwww.google.com', contactNumber: 'Contact Number3', emailID: 'Email ID3', primaryLocation: 'Torento', status: 'Inactive', isDeleting: false
    },
    {
      id: '4', companyName: 'Company Name4', website: 'wwww.google.com', contactNumber: 'Contact Number4', emailID: 'Email ID4', primaryLocation: 'Torento', status: 'Active', isDeleting: false
    }];
    // this.setupSubscription();
    this.allCompany = this.company;
  }

  search(value: string): void {
    this.company = this.allCompany;
    if (value === "") {
      this.company = this.company;
    }
    else {
      this.company = this.company.filter((val) => val.companyName.toLowerCase().includes(value));
    }
  }

  private getAllCompany() {
    this.company = [];
    this.companyService.getAllCompany().subscribe((res: any) => {
      if (res && res.length > 0) {
        this.company = res;
        console.log(res);
      }
      else {
        console.log(res);
      }
    });
  }

  changeStatus() {
    this.company = this.allCompany;
    if (this.status === "All") {
      this.company = this.company;
    }
    else {
      this.company = this.company.filter((val) => val.status.includes(this.status));
    }
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.company);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

  //onPageSizeChanged(event: any) {
  //  this.gridApi.paginationSetPageSize(Number(event.target.value));
  //}
  onCellClicked(event: any) {
    if (event.colDef.headerName === 'Status') {

    }
    else {
      this.router.navigate(['/company/edit/' + event.data.id]);
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
    const company = this.company.find(x => x.id === id);
    company.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.company = this.company.filter(x => x.id !== id));
  }


}
