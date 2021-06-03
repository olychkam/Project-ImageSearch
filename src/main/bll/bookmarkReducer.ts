import {ActionsType, AppRootStateType, ThunkType} from "./redux-store";
import {ThunkDispatch} from "redux-thunk";
import {PhotoStoreType} from "./imageSearchReducer";

const SET_PHOTO_TO_BOOKMARK = "BOOKMARK-REDUCER/SET_BOOKMARK_PHOTO";
const DELETE_PHOTO_FROM_BOOKMARK = "BOOKMARK-REDUCER/DELETE-BOOKMARK-PHOTO";
const ADD_TAG_TO_BOOKMARK = "BOOKMARK-REDUCER/ADD-TAG-TO-BOOKMARK";
const DELETE_TAG_FROM_BOOKMARK = "BOOKMARK-REDUCER/DELETE-TAG-BOOKMARK";

export type BookmarkPhotoType = {
    bookmarkPhotoId: string,
    bookmarkPhoto: PhotoStoreType
}

export type InitialStateType = {
    bookmark: Array<BookmarkPhotoType>
}


const LocalStorage = (): InitialStateType => {
    let LocalstorageInitialState: InitialStateType = {bookmark: []}
    try {
        let keys: Array<string> = Object.keys(localStorage)
        let i = keys.length;
        while (i--) {
            let value = JSON.parse(localStorage.getItem(keys[i]) as string);
            let k: string = keys[i]
            LocalstorageInitialState.bookmark.push({bookmarkPhotoId: k, bookmarkPhoto: value})
        }
    } catch {
        console.log("The app can't get data from localeStorage")
    }
    return LocalstorageInitialState;
}

const initialState: InitialStateType = LocalStorage()

export const bookmarkReducer =
    (state = initialState, action: BookmarkActionsType): InitialStateType => {
        switch (action.type) {

            case SET_PHOTO_TO_BOOKMARK:
                return {
                    ...state,
                    bookmark: [
                        ...state.bookmark, {
                            bookmarkPhotoId: action.bookmarkPhotoId,
                            bookmarkPhoto: action.bookmarkPhoto
                        }
                    ]
                }
            case DELETE_PHOTO_FROM_BOOKMARK:
                return {
                    ...state,
                    bookmark: state.bookmark.filter(selectPhoto => selectPhoto.bookmarkPhotoId !== action.id)
                }
            case ADD_TAG_TO_BOOKMARK:
                return {
                    ...state,
                    bookmark: state.bookmark.map(selectPhoto => (selectPhoto.bookmarkPhotoId !== action.id)
                        ? selectPhoto //if photo is not favorite
                        : {
                            ...selectPhoto, bookmarkPhoto:
                                {
                                    ...selectPhoto.bookmarkPhoto, tags:
                                        (selectPhoto.bookmarkPhoto.tags.includes(action.tag)) // don't add 2 several tags
                                            ? [...selectPhoto.bookmarkPhoto.tags]
                                            : [...selectPhoto.bookmarkPhoto.tags, action.tag]
                                }
                        }
                    )
                }
            case DELETE_TAG_FROM_BOOKMARK:

                return {
                    ...state,
                    bookmark: state.bookmark.map(selectPhoto => (selectPhoto.bookmarkPhotoId !== action.id)
                        ? selectPhoto
                        : {
                            ...selectPhoto, bookmarkPhoto:
                                {
                                    ...selectPhoto.bookmarkPhoto,
                                    tags: [...selectPhoto.bookmarkPhoto.tags.filter(t => t !== action.tag)]
                                }
                        }
                    )
                }
            default:
                return state
        }
    }

export const setPhotoToBookmark = (bookmarkPhotoId: string, bookmarkPhoto: PhotoStoreType) => (
    {type: SET_PHOTO_TO_BOOKMARK, bookmarkPhotoId, bookmarkPhoto} as const);
export const deletePhotoFromBookmark = (id: string) => (
    {type: DELETE_PHOTO_FROM_BOOKMARK, id} as const);
export const addTagToBookmark = (id: string, tag: string) => (
    {type: ADD_TAG_TO_BOOKMARK, id, tag} as const);
export const deleteTagFromBookmark = (id: string, tag: string) => (
    {type: DELETE_TAG_FROM_BOOKMARK, id, tag} as const);

export const addPhotoToBookmark = (bookmarkPhotoId: string, bookmarkPhoto: PhotoStoreType): ThunkType =>
    (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
        dispatch(setPhotoToBookmark(bookmarkPhotoId, bookmarkPhoto));
        try {
            localStorage.setItem(bookmarkPhotoId, JSON.stringify(bookmarkPhoto))
        } catch {
            console.log("image can't be added to LocaleStorage")
        }
    }

export const removeBookmarkPhoto = (bookmarkPhotoId: string): ThunkType =>
    (dispatch) => {
        dispatch(deletePhotoFromBookmark(bookmarkPhotoId));
        try {
            localStorage.removeItem(bookmarkPhotoId)
        } catch {
            console.log("image can't be deleted from LocaleStorage")
        }
    }

export const addTagToBookmarkTC = (id: string, tag: string): ThunkType =>
    (dispatch) => {
        dispatch(addTagToBookmark(id, tag));
        try {
            let bookmarkPhoto: PhotoStoreType = JSON.parse(localStorage.getItem(id) as string)
            bookmarkPhoto = {...bookmarkPhoto, tags: [...bookmarkPhoto.tags, tag]}
            localStorage.setItem(id, JSON.stringify(bookmarkPhoto))
        } catch {
            console.log("tag can't be added to LocaleStorageTS")
        }

    }

export const deleteTagFromBookmarkTC = (id: string, tag: string): ThunkType =>
    (dispatch) => {
        dispatch(deleteTagFromBookmark(id, tag));
        try {
            let bookmarkPhoto: PhotoStoreType = JSON.parse(localStorage.getItem(id) as string)
            bookmarkPhoto = {...bookmarkPhoto, tags: [...bookmarkPhoto.tags.filter(t => t !== tag ? 1 : -1)]}
            localStorage.setItem(id, JSON.stringify(bookmarkPhoto))
        } catch {
            console.log("tag can't be deleted from LocaleStorageTS")
        }
    }

export type BookmarkActionsType =
    ReturnType<typeof setPhotoToBookmark> | ReturnType<typeof deletePhotoFromBookmark>
    | ReturnType<typeof addTagToBookmark> | ReturnType<typeof deleteTagFromBookmark>
