import { Post } from '../models/post.model';
import * as PostActions from '../actions/posts.actions';

export interface PostsState {
    list: Post[];
    pending: Boolean;
    success: Boolean;
    error: string;
}

const default_state: PostsState = {
    list: [],
    pending: true,
    success: false,
    error: ''
};

export function PostsReducer(state: PostsState = default_state, action: PostActions.Actions) {
    switch (action.type) {
        case PostActions.PostActionTypes.PostsSuccess:
            return Object.assign({}, state, {list: [...state.list, ...action.payload]});
        default:
            return state;
    }
}
