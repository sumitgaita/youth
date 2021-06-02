import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  users = null;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    //this.accountService.getAll()
    //    .pipe(first())
    //    .subscribe(users => this.users = users);
    this.users = [{ id: '1', firstName: 'sumit', lastName: 'maity', username: 'sumit@gmail.com', isDeleting:false },
      { id: '2', firstName: 'sumit2', lastName: 'maity2', username: 'sumit@gmail.com1', isDeleting: false },
      { id: '3', firstName: 'sumit3', lastName: 'maity3', username: 'sumit@gmail.com2', isDeleting: false },
      { id: '4', firstName: 'sumit4', lastName: 'maity4', username: 'sumit@gmail.com3', isDeleting: false }    ];
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
