import thunk, {ThunkAction} from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {ImageSearchActionsType, imageSearchReducer} from "./imageSearchReducer";
import {BookmarkActionsType, bookmarkReducer} from "./bookmarkReducer";

const rootReducer = combineReducers({
    photos: imageSearchReducer,
    favorite:bookmarkReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type ActionsType =ImageSearchActionsType | BookmarkActionsType

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>

