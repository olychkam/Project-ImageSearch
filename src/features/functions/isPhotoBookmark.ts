import {InitialStateType} from "../../main/bll/bookmarkReducer";


export const isPhotoBookmark =  (id: string, bookmarkPhotosPage: InitialStateType)=> {
    return bookmarkPhotosPage?.bookmark.some(fP => fP.bookmarkPhotoId === id)
}