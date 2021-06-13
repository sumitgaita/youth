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
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private router: Router) {
    this.columnDefs = [
      {
        headerName: '',
        field: '',
        width: 50,
        tooltipField: '',
        cellRenderer: function (param: any) {
          if (param.data.id !== '') {
            const eDiv = document.createElement('div');
            let cellDef = '';
            cellDef += `<a class='companynamecell'><span class='editBtn'><i class='fa fa-pencil' aria-hidden='true'></i></span></a>`;
            eDiv.innerHTML = cellDef;
            if (eDiv.querySelector('.companynamecell')) {
              eDiv.querySelector('.companynamecell').addEventListener('click', (ev: any) => {
                AccountService.onEditUsersRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      },
      { headerName: 'Name', width: 265, tooltipField: 'name', field: 'name', sortable: true, filter: true },
      { headerName: 'Email Address', width: 270, tooltipField: 'emailAddress', field: 'emailAddress', sortable: true, filter: true },
      { headerName: 'Phone Number', width: 250, field: 'phoneNumber', tooltipField: 'phoneNumber', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true },
      { headerName: 'Username', width: 250, field: 'username', tooltipField: 'username', tooltipComponentParams: { color: '#ececec' }, sortable: true, filter: true }
    ];
  }
  

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.users = [{ id: '1', name: 'sumit', emailAddress: 'sumit@gmail.com', phoneNumber: '556546546546', username:'ABCTYRE', isDeleting:false },
      { id: '2', name: 'sumit', emailAddress: 'sumit@gmail.com', phoneNumber: '65765675675', username: 'ABCTYRE', isDeleting: false },
      { id: '3', name: 'sumit', emailAddress: 'sumit@gmail.com', phoneNumber: '65656456', username: 'ABCTYRE', isDeleting: false },
      { id: '4', name: 'sumit', emailAddress: 'sumit@gmail.com', phoneNumber: '765765875765', username: 'ABCTYRE', isDeleting: false }];
    this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.users);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscription = [];
  }

  setupSubscription() {
    if (this.subscription.length === 0) {
      this.subscription.push(AccountService.onEditUsersRow.subscribe((item: any) => {
        if (item) {
          //this.router.navigate(['edit/1']);
          this.router.navigate(['/users/edit/' + item.data.id]);

        }
      }));
    }

  }
  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
