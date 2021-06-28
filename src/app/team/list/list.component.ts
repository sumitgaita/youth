import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, TeamService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  teams = null;
  columnDefs;
  private gridApi: any;
  private gridColumnApi: any;
  defaultPageSize = 10;
  //private subscription: Subscription[] = [];
  constructor(private accountService: AccountService, private teamService: TeamService, private router: Router) {
    this.columnDefs = [
     
      { headerName: 'Team Name', width: 500, tooltipField: 'teamName', field: 'teamName', sortable: true, filter: true },
      { headerName: 'User Name', width: 538, tooltipField: 'userName', field: 'userName', sortable: true, filter: true }
    ];
  }
  

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.teams = [{ id: '1', teamName: 'arun das1', userName: 'ABC ABC1'},
      { id: '2', teamName: 'arun das2', userName: 'ABC ABC2' },
      { id: '3', teamName: 'arun das3', userName: 'ABC ABC3' },
      { id: '4', teamName: 'arun das4', userName: 'ABC ABC4' }];
   // this.setupSubscription();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.teams);
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  onCellClicked(event: any) {
    this.router.navigate(['/team/edit/' + event.data.id]);
  }
  ngOnDestroy() {
    //this.subscription.forEach(sub => {
    //  sub.unsubscribe();
    //});
    //this.subscription = [];
  }

  //setupSubscription() {
  //  if (this.subscription.length === 0) {
  //    this.subscription.push(TeamService.onEditTeamRow.subscribe((item: any) => {
  //      if (item) {
  //        //this.router.navigate(['edit/1']);
  //        this.router.navigate(['/team/edit/' + item.data.id]);

  //      }
  //    }));
  //  }

  //}
  //deleteUser(id: string) {
  //  const user = this.users.find(x => x.id === id);
  //  user.isDeleting = true;
  //  this.accountService.delete(id)
  //    .pipe(first())
  //    .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  //}
}
