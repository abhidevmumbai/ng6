import { Action } from '@ngrx/store';

export enum PostActionTypes {
    PostsSuccess = '[Posts] Success',
    PostsError = '[Posts] Error'
}

export class GetPostsSuccess implements Action {
    readonly type = PostActionTypes.PostsSuccess;

    constructor(public payload: any) {}
}

export class GetPostsError implements Action {
    readonly type = PostActionTypes.PostsError;

    constructor(public payload: string) {}
}

export type Actions = GetPostsSuccess | GetPostsError;
