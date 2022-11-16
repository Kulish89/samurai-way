import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import usersReducer from "./users-reducer";
import thunk from "redux-thunk";
let rootReducer = combineReducers({
  profileReducer,
  dialogsReducer,
  usersReducer,
  authReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStateType = ReturnType<typeof rootReducer>;
export default store;
