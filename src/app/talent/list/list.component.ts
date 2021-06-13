import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, TalentService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  talent = null;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private talentService: TalentService, private router: Router) {
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
                TalentService.onEditTalentRow.emit({ data: param.data });
              })
            }
            return eDiv;
          }
        },
        sortable: false
      },
      { headerName: 'Candidate Name', width: 500, tooltipField: 'candidateName', field: 'candidateName', sortable: true, filter: true },
      { headerName: 'Source', width: 538, tooltipField: 'source', field: 'source', sortable: true, filter: true }
    ];
  }
  

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.talent = [{ id: '1', candidateName: 'arun das1', source: 'ABC ABC1'},
      { id: '2', candidateName: 'arun das2', source: 'ABC ABC2' },
      { id: '3', candidateName: 'arun das3', source: 'ABC ABC3' },
      { id: '4', candidateName: 'arun das4', source: 'ABC ABC4' }];
    this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.talent);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscription = [];
  }

  setupSubscription() {
    if (this.subscription.length === 0) {
      this.subscription.push(TalentService.onEditTalentRow.subscribe((item: any) => {
        if (item) {
          //this.router.navigate(['edit/1']);
          this.router.navigate(['/talent/edit/' + item.data.id]);

        }
      }));
    }

  }
  //deleteUser(id: string) {
  //  const user = this.users.find(x => x.id === id);
  //  user.isDeleting = true;
  //  this.accountService.delete(id)
  //    .pipe(first())
  //    .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  //}
}
