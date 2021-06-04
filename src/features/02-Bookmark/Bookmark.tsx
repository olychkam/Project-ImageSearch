import {useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/redux-store";
import {Photo} from "../03-Photo/Photo";
import s from "./Bookmark.module.css"
import React from "react";
import Search from "../../main/ui/Search/Search";
import {InitialStateType} from "../../main/bll/bookmarkReducer";
import {isPhotoBookmark} from "../functions/isPhotoBookmark";

export const Bookmark = () => {

    const bookmarkPhotosPage = useSelector<AppRootStateType, InitialStateType>(state => state.favorite)
debugger
    return (
        <div className={s.bookmarkPageContainer}>

            <div className={s.photos}>
                {bookmarkPhotosPage.bookmark.length === 0
                    ?
                    <Search errorMessage={" No bookmark photos "} isOpen={true}/>
                    :
                    <></>
                }
                {bookmarkPhotosPage.bookmark.map(photo =>
                    <Photo key={photo.bookmarkPhotoId}
                           photo={photo.bookmarkPhoto}
                           bookmark={isPhotoBookmark(photo.bookmarkPhotoId, bookmarkPhotosPage)}
                    />
                )}
            </div>
        </div>
    )
}