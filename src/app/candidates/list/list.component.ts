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
  candidates = null;
  /*closeResult: string;*/
  status: string;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  //private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private companyService: CompanyService, private router: Router
  ) {

    this.columnDefs = [
      {
        headerName: 'Candidates Name',
        field: 'candidatesName',
        width: 168,
        tooltipField: 'candidatesName',
        sortable: true,
        filter: true
      },     
      { headerName: 'Contact Number', width: 168, field: 'contactNumber', tooltipField: 'contactNumber', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Email ID', field: 'emailID', tooltipField: 'emailID', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'DOB', width: 170, tooltipField: 'dob', field: 'dob', sortable: true, filter: true },
      { headerName: 'Country ', width: 170, tooltipField: 'country ', field: 'country', sortable: true, filter: true },
      { headerName: 'Work Authorization', width: 170, tooltipField: 'workauthorization', field: 'workauthorization', sortable: true, filter: true },
      { headerName: 'Current Salary ', width: 170, tooltipField: 'currentsalary', field: 'currentsalary', sortable: true, filter: true },
     
      
    ];
  }

  ngOnInit() {
    this.candidates = [{
      id: '1', candidatesName: 'Robart Harihoron', contactNumber: '098-7543', emailID: 'abc@gmail.com', dob: '12-04-2001', country: 'Canadian', workauthorization: 'Canadian Citizen', currentsalary:'$290'
    },
    {
      id: '2', candidatesName: 'Robart Harihoron', contactNumber: '098-7543', emailID: 'abc@gmail.com', dob: '12-04-2001', country: 'Canadian', workauthorization: 'Canadian Citizen', currentsalary: '$290'
    },
    {
      id: '3', candidatesName: 'Robart Harihoron', contactNumber: '098-7543', emailID: 'abc@gmail.com', dob: '12-04-2001', country: 'Canadian', workauthorization: 'Canadian Citizen', currentsalary: '$290'
    },
    {
      id: '4', candidatesName: 'Robart Harihoron', contactNumber: '098-7543', emailID: 'abc@gmail.com', dob: '12-04-2001', country: 'Canadian', workauthorization: 'Canadian Citizen', currentsalary: '$290'
    }];
    // this.setupSubscription();
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
    
      this.router.navigate(['/candidates/edit/' + event.data.id]);
   
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


}
