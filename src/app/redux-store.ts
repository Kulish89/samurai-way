import { AuthActionsType, authReducer } from "../features/Login/auth-reducer";
import {
  DialogsActionsType,
  dialogsReducer,
} from "../features/Dialogs/dialogs-reducer";

import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import appReducer, { AppReducerActionsType } from "./app-reducer";
import {
  ProfileActionsType,
  profileReducer,
} from "../features/Profile/profile-reducer";
import usersReducer, {
  UserReduserActionsType,
} from "../features/Users/users-reducer";

const rootReducer = combineReducers({
  profileReducer,
  dialogsReducer,
  usersReducer,
  authReducer,
  appReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// =====================================================

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<AppStateType, any, AppActionsType>;
export type AppActionsType =
  | UserReduserActionsType
  | ProfileActionsType
  | DialogsActionsType
  | AuthActionsType
  | AppReducerActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionsType
>;
