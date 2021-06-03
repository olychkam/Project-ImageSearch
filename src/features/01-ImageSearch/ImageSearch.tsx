import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/redux-store";
import {Photo} from "../03-Photo/Photo";
import React, {ChangeEvent, useEffect, useState} from "react";
import {getPhotos, setNewName} from "../../main/bll/imageSearchReducer";
import Loading from "../06-Loading/Loading";
import {Paginator} from "../07-Paginator/Paginator";
import s from "./ImageSearch.module.css"
import {Button, Grid, TextField} from "@material-ui/core";
import MyAlert from "../../main/ui/MyAlert/MyAlert";
import {InitialStateType} from "../../main/bll/bookmarkReducer";



export default function ImageSearch() {
    const state = useSelector<AppRootStateType, AppRootStateType>(state => state)
    const {photos, favorite} = state
    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>(photos.newName)
    const [error, setError] = useState<string>(state.photos.someError)
    useEffect(() => {
        setError(photos.someError)
    }, [photos.someError])

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== "") setError("")
        if (e.key === "Enter") searchPhotoHandler()
    }

    const searchPhotoHandler = () => {
        if (title.trim() !== "") {
            dispatch(getPhotos(title, photos.page))
            dispatch(setNewName(title))
        } else {
            setError("Please, add name to find image")
        }
    }

    const onPageChanged = (page: number) => {
        dispatch(getPhotos(title, page))
    }
    const isPhotoBookmark =  (id: string, bookmarkPhotos: InitialStateType)=> {
        return bookmarkPhotos?.bookmark.some(fP => fP.bookmarkPhotoId === id)
    }

    if (photos.receivingPhotosProgress) {
        return <Loading/>
    }
debugger
    return <div className={s.imageSearchContainer}>

        {
            !photos.receivingPhotosSuccess &&
            <MyAlert errorMessage={" Empty result of the searsh :( "} isOpen={true}/>
        }
        <div className={s.container1}>
            <Grid container>
                <Grid className={s.item} item xs={8}>
                    <TextField
                        type="text"
                        value={title}
                        onChange={inputHandler}
                        onKeyPress={onKeyPressHandler}
                        variant="outlined"
                        placeholder={"Print your search"}
                        error={error !== ""} // convert sting error to boolean
                        helperText={error}
                        fullWidth={true}
                        size={"medium"}
                    />
                </Grid>
                <Grid className={s.item} item xs={4}>
                    <Button
                        onClick={searchPhotoHandler}
                        variant="outlined"
                        color="primary"
                        size="large"
                    >FIND</Button>
                </Grid>
            </Grid>
        </div>

        <Paginator
            currentPage={photos.page}
            pagesCount={photos.pages > 200 ? 200 : photos.pages}
            onPageChanged={onPageChanged}/>
        <div className={s.photos}>
            {photos.photo.map(ph => <Photo
                    key={ph.id}
                    photo={ph}
                    isFavorite={isPhotoBookmark(ph.id, favorite)}
                />
            )
            }
        </div>
    </div>
}
