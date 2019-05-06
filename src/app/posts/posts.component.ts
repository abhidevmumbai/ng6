import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { Store } from '@ngrx/store';

import { DataService } from '../services/data.service';
import * as fromPosts from '../reducers/posts.reducer';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import * as PostActions from '../actions/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
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
export class PostsComponent implements OnInit {
  $posts: Observable<Post[]>;
  pending: Boolean;
  success: Boolean;
  constructor(private data: DataService, private store: Store<fromPosts.PostsState>) {
    this.store.select('posts').subscribe(posts => {
      this.$posts = posts.list;
      this.pending = posts.pending;
      this.success = posts.success;
    });
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.data.getPosts().subscribe(posts => {
      this.store.dispatch(new PostActions.GetPostsSuccess(posts));
    }, (err) => {
      this.store.dispatch(new PostActions.GetPostsError(err));
    });
  }
}
