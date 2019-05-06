import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { DataService } from '../services/data.service';
import * as fromUsers from '../reducers/users.reducer';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user.model';
import * as UserActions from '../actions/users.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  userId: string;
  user: Object;

  constructor(private route: ActivatedRoute, private data: DataService, private store: Store<fromUsers.UsersState>) {
    this.route.params.subscribe(params => this.userId = params.id);
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.data.getUser(this.userId).subscribe(user => {
      this.store.dispatch(new UserActions.GetUserSuccess(user));
      this.user = user;
    });
  }

}
