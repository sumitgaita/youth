import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, ContactsService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {

  contacts = null;
  //@ViewChild('addTag') addTag: NgbModal;
  //modalOptions: NgbModalOptions;
  //closeResult: string;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  constructor(private accountService: AccountService,
    private modalService: NgbModal, private contactsService: ContactsService, private router: Router)
  {
    this.columnDefs = [
      {
        headerName: 'Full Name',
        field: 'fullName',
        width: 170,
        tooltipField: 'fullName',
        sortable: true,
        filter: true
      },

      { headerName: 'Company', width: 170, tooltipField: 'companyName', field: 'companyName', sortable: true, filter: true },
      { headerName: 'Location', width: 247, field: 'location', tooltipField: 'location', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Primary Phone Number', width: 250, field: 'primaryPhoneNumber', tooltipField: 'primaryPhoneNumber', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Primary email Address', width: 250, tooltipField: 'primaryemailAddress', field: 'primaryemailAddress', sortable: true, filter: true }
    ];
  }

  ngOnInit() {
    
    this.contacts = [{ id: '1', fullName: 'sumit maity', location: 'Canada', companyName: 'ABC Company', primaryemailAddress: 'ABC@gmail.com', primaryPhoneNumber: '0222-87544', isDeleting: false },
      { id: '2', fullName: 'sumit maity', location: 'Canada', companyName: 'ABC Company', primaryemailAddress: 'ABC@gmail.com', primaryPhoneNumber: '0222-87544', isDeleting: false },
      { id: '3', fullName: 'sumit maity', location: 'Canada', companyName: 'ABC Company', primaryemailAddress: 'ABC@gmail.com', primaryPhoneNumber: '0222-87544', isDeleting: false },
      { id: '4', fullName: 'sumit maity', location: 'Canada', companyName: 'ABC Company', primaryemailAddress: 'ABC@gmail.com', primaryPhoneNumber: '0222-87544', isDeleting: false }];
    //this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.contacts);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  onCellClicked(event: any) {
    this.router.navigate(['/contacts/edit/' + event.data.id]);
  }
  ngOnDestroy() {
    //this.subscription.forEach(sub => {
    //  sub.unsubscribe();
    //});
    //this.subscription = [];
  }

  //setupSubscription() {
  //  if (this.subscription.length === 0) {
  //    this.subscription.push(ContactsService.onEditContactsRow.subscribe((item: any) => {
  //      if (item) {
  //        //this.router.navigate(['edit/1']);
  //        this.router.navigate(['/contacts/edit/' + item.data.id]);

  //      }
  //    }));
  //  }

  //}
  deleteUser(id: string) {
    const user = this.contacts.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.contacts = this.contacts.filter(x => x.id !== id));
  }
  //openPopup() {
  //  this.openModel(this.addTag);
  //}
  //private openModel(content) {
  //  this.modalService.open(content, { centered: true, backdrop: "static", size: "lg" }).result.then((result) => {
  //    this.closeResult = `Closed with: ${result}`;
  //  }, (reason) => {
  //    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //  });
  //}
  //private getDismissReason(reason: any): string {
  //  if (reason === ModalDismissReasons.ESC) {
  //    return 'by pressing ESC';
  //  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //    return 'by clicking on a backdrop';
  //  } else {
  //    return `with: ${reason}`;
  //  }
  //}
}
