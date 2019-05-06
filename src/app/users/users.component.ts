import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Store } from '@ngrx/store';

import { DataService } from '../services/data.service';
import * as fromUsers from '../reducers/users.reducer';
import * as UserActions from '../actions/users.actions';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})

export class UsersComponent implements OnInit {
  $users: Observable<User[]>;
  pending: Boolean;
  success: Boolean;
  constructor(private data: DataService, private store: Store<fromUsers.UsersState>) {
    this.store.select('users').subscribe(users => {
      this.$users = users.list;
      this.pending = users.pending;
      this.success = users.success;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.data.getUsers().subscribe(users => {
      this.store.dispatch(new UserActions.GetUsersSuccess(users));
    }, err => {
      this.store.dispatch(new UserActions.GetUsersError(err));
    });
  }

}
