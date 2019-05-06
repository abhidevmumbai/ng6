import { Action, createFeatureSelector } from '@ngrx/store';

import { User, UserDetails } from '../models/user.model';
import * as UserActions from '../actions/users.actions';

export interface UsersState {
    list: User[];
    details: UserDetails;
    pending: boolean;
    success: boolean;
    error: string;
}

const default_state: UsersState = {
    list: [],
    details: null,
    pending: true,
    success: false,
    error: ''
};

export function UsersReducer (state: UsersState = default_state, action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.UserActionTypes.UserSuccess:
            return Object.assign({}, state, { details: action.payload, pending: false, success: true});
        case UserActions.UserActionTypes.UsersSuccess:
            return Object.assign({}, state, { list: [...state.list, ...action.payload], pending: false, success: true});
            case UserActions.UserActionTypes.Error:
            return Object.assign({}, state, { error: action.payload});
        default:
            return state;
    }
}

export const getUsersState = createFeatureSelector<UsersState>('users');
