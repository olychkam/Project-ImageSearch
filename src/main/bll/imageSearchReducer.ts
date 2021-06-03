import {ThunkType} from "./redux-store";
import {photoAPI, PhotoType} from "../dal/API";

const SET_PHOTOS = "IMAGE-SEARCH-REDUCER/SET-PHOTOS";
const SET_PHOTOS_IS_RECEIVING_PROGRESS = "IMAGE-SEARCH-REDUCER/SET-PHOTOS-IS-RECEIVING-PROGRESS";
const SET_SEARCH_NAME = "IMAGE-SEARCH-REDUCER/SET-SEARCH-NAME";
const ADD_TAG = "IMAGE-SEARCH-REDUCER/ADD-TAG";
const DELETE_TAG = "IMAGE-SEARCH-REDUCER/DELETE-TAG";
const SET_PAGE = "IMAGE-SEARCH-REDUCER/SET-PAGE";
const SET_NEW_NAME = "IMAGE-SEARCH-REDUCER/SET_NEW_NAME"
const SET_NEW_ERROR = "IMAGE-SEARCH-REDUCER/SET_NEW_ERROR"


export type PhotoStoreType = {
    farm: number
    id: string
    isfamily: number
    isfriend: number
    ispublic: number
    owner: string
    secret: string
    server: string
    title: string
    tags: Array<string>
}

export type InitialStateImageSearchType = typeof initialState

const initialState = {
    searchName: "",
    page: 1,
    pages: 0,
    perpage: 0,
    total: "",
    photo: [] as Array<PhotoStoreType>,
    receivingPhotosSuccess: true,
    receivingPhotosProgress: false,
    newName: "",
    someError: ""
}


export const imageSearchReducer =
    (state = initialState, action: ImageSearchActionsType): InitialStateImageSearchType => {
        switch (action.type) {
            case SET_PHOTOS:
                return {
                    ...state,
                    page: action.page,
                    pages: action.pages,
                    photo: action.photos.map(p => ({...p, tags: []})),
                    receivingPhotosSuccess: action.photos.length !== 0
                }

            case SET_PHOTOS_IS_RECEIVING_PROGRESS:
                return {...state, receivingPhotosProgress: action.receivingPhotosProgress}

            case SET_SEARCH_NAME:
                return {...state, searchName: action.searchName}

            case ADD_TAG:
                return {
                    ...state,
                    photo: state.photo.map(
                        p => (
                            (p.id === action.id && !p.tags.includes(action.tag)) // check for duplicate tag
                                ?
                                {
                                    ...p,
                                    tags: [...p.tags, action.tag]
                                }
                                : p)
                    )
                }

            case DELETE_TAG:
                return {
                    ...state,
                    photo: state.photo.map(
                        p => {
                            if (p.id === action.id) {
                                let tagIndex = p.tags.indexOf(action.tag) // to find index of tag
                                let newtags = [...p.tags] // copy for splice
                                if (tagIndex > -1)    // no possibility to use 2 several same tags
                                    newtags.splice(tagIndex, 1)
                                return {
                                    ...p
                                    ,
                                    tags: newtags
                                }
                            } else return p
                        }
                    )
                }
            case SET_PAGE:
                return {
                    ...state,
                    page: action.page
                }
            case SET_NEW_NAME:
                return {
                    ...state,
                    newName: action.name
                }
            case SET_NEW_ERROR:
                return {
                    ...state,
                    someError: action.err
                }

            default:
                return state
        }
    }

export const setPhotos = (photos: Array<PhotoType>, page: number, pages: number) => (
    {type: SET_PHOTOS, photos, page, pages} as const);
export const setIsReceivingProgress = (receivingPhotosProgress: boolean) =>
    ({type: SET_PHOTOS_IS_RECEIVING_PROGRESS, receivingPhotosProgress} as const);
export const setSearchName = (searchName: string) => ({type: SET_SEARCH_NAME, searchName} as const);
export const addTag = (id: string, tag: string) => ({type: ADD_TAG, id, tag} as const);
export const deleteTag = (id: string, tag: string) => ({type: DELETE_TAG, id, tag} as const);
export const setPage = (page: number) => ({type: SET_PAGE, page} as const);
export const setNewName = (name: string) => ({type: SET_NEW_NAME, name} as const);
export const setNewError = (err: string) => ({type: SET_NEW_ERROR, err} as const);


export const getPhotos = (text: string, page: number): ThunkType =>
    async (dispatch) => {
        dispatch(setIsReceivingProgress(true));
        dispatch(setPage(page));
        try {
            const data = await photoAPI.getPhotos(text, page);
            if (data.stat === "ok") {
                dispatch(setPhotos(data.photos.photo, data.photos.page, data.photos.pages))
                dispatch(setNewError(""))
            }
        } catch {
            dispatch(setNewError("no connection"))
        }
        dispatch(setIsReceivingProgress(false));
    }

export type ImageSearchActionsType =
    ReturnType<typeof setPhotos> | ReturnType<typeof setIsReceivingProgress> |
    ReturnType<typeof setSearchName> | ReturnType<typeof addTag>
    | ReturnType<typeof deleteTag> |
    ReturnType<typeof setPage> |
    ReturnType<typeof setNewName> | ReturnType<typeof setNewError>
