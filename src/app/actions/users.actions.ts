import { Action } from '@ngrx/store';

export enum UserActionTypes {
    UserSuccess = '[User] SUCCESS',
    UsersSuccess = '[Users] SUCCESS',
    Error = '[Users] ERROR'
}

export class GetUserSuccess implements Action {
    readonly type = UserActionTypes.UserSuccess;

    constructor(public payload: any) {}
}

export class GetUsersSuccess implements Action {
    readonly type = UserActionTypes.UsersSuccess;

    constructor(public payload: any) {}
}

export class GetUsersError implements Action {
    readonly type = UserActionTypes.Error;

    constructor(public payload: string) {}
}

export type Actions = GetUserSuccess | GetUsersSuccess | GetUsersError;
