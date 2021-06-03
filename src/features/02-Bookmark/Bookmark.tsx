import {useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/redux-store";
import {Photo} from "../03-Photo/Photo";
import s from "./Bookmark.module.css"
import React from "react";
import MyAlert from "../../main/ui/MyAlert/MyAlert";
import {InitialStateType} from "../../main/bll/bookmarkReducer";

export const Bookmark = () => {

    const bookmarkPhotosPage = useSelector<AppRootStateType, InitialStateType>(state => state.favorite)

    return (
        <div className={s.favoritePageContainer}>

            <div className={s.photos}>
                {bookmarkPhotosPage.bookmark.length === 0
                    ?
                    <MyAlert errorMessage={" No favorite photos "} isOpen={true}/>
                    :
                    <></>
                }
                {bookmarkPhotosPage.bookmark.map(photo =>
                    <Photo key={photo.bookmarkPhotoId}
                           photo={photo.bookmarkPhoto}
                           isFavorite={isPhotoFavorite(photo.bookmarkPhotoId, bookmarkPhotosPage)}
                    />
                )}
            </div>
        </div>
    )
}

function isPhotoFavorite(bookmarkPhotoId: string, bookmarkPhotosPage: InitialStateType): boolean | undefined {
    throw new Error("Function not implemented.");
}
