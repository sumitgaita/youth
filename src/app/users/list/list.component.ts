import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  users = null;
  allUsers = null;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  status: string;
  statusList: string[] = ['All', 'Active', 'Inactive'];
  //private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private router: Router) {
    this.columnDefs = [
      { headerName: 'Name', width: 265, tooltipField: 'name', field: 'name', sortable: true, filter: true },
      { headerName: 'Email Address', width: 270, tooltipField: 'emailAddress', field: 'emailAddress', sortable: true, filter: true },
      { headerName: 'Phone Number', width: 250, field: 'phoneNumber', tooltipField: 'phoneNumber', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Username', width: 250, field: 'username', tooltipField: 'username', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
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
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.status = 'All';
    this.users = [{ id: '1', name: 'Amit', emailAddress: 'sumit@gmail.com', phoneNumber: '556546546546', username: 'ABCTYRE', status: 'Active', isDeleting: false },
    { id: '2', name: 'Anup', emailAddress: 'sumit@gmail.com', phoneNumber: '65765675675', username: 'ABCTYRE', status: 'Inactive', isDeleting: false },
    { id: '3', name: 'Arpita', emailAddress: 'sumit@gmail.com', phoneNumber: '65656456', username: 'ABCTYRE', status: 'Inactive', isDeleting: false },
    { id: '4', name: 'Avirup', emailAddress: 'sumit@gmail.com', phoneNumber: '765765875765', username: 'ABCTYRE', status: 'Active', isDeleting: false }];
    // this.setupSubscription();
    this.allUsers = this.users;
  }

  search(value: string): void {
    this.users = this.allUsers;
    if (value === "") {
      this.users = this.users;
    }
    else {
      this.users = this.users.filter((val) => val.name.toLowerCase().includes(value));
    }
  }
  changeStatus() {
    this.users = this.allUsers;
    if (this.status === "All") {
      this.users = this.users;
    }
    else {
      this.users = this.users.filter((val) => val.status.includes(this.status));
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.users);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

  ngOnDestroy() {
    //this.subscription.forEach(sub => {
    //  sub.unsubscribe();
    //});
    //this.subscription = [];
  }
  onCellClicked(event: any) {
    if (event.colDef.headerName === 'Status') {

    }
    else {
      this.router.navigate(['/users/edit/' + event.data.id]);
    }
  }
  //setupSubscription() {
  //  if (this.subscription.length === 0) {
  //    this.subscription.push(AccountService.onEditUsersRow.subscribe((item: any) => {
  //      if (item) {
  //        //this.router.navigate(['edit/1']);
  //        this.router.navigate(['/users/edit/' + item.data.id]);

  //      }
  //    }));
  //  }

  //}
  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
