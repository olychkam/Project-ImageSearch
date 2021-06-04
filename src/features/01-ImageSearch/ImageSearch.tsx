import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/redux-store";
import {Photo} from "../03-Photo/Photo";
import React, {ChangeEvent, useEffect, useState} from "react";
import {getPhotos, setNewName} from "../../main/bll/imageSearchReducer";
import Loading from "../06-Loading/Loading";
import {Paginator} from "../07-Paginator/Paginator";
import s from "./ImageSearch.module.css"
import {Button, Grid, TextField} from "@material-ui/core";
import Search from "../../main/ui/Search/Search";
import {isPhotoBookmark} from "../functions/isPhotoBookmark";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        width: "100%",
        flexGrow: 1,
        margin: "auto"
    },
    item: {
        padding: "20px",
        xs: "12"
    }
}));

export default function ImageSearch() {
    const state = useSelector<AppRootStateType, AppRootStateType>(state => state)
    const {photos, favorite} = state
    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>(photos.newName)
    const [error, setError] = useState<string>(state.photos.someError)
    const styles = useStyles();
    useEffect(() => {
        setError(photos.someError)
    }, [photos.someError])

    const searchPhotoHandler = () => {
        if (title.trim() !== "") {
            dispatch(getPhotos(title, photos.page))
            dispatch(setNewName(title))
        } else {
            setError("Please, enter a name for the image")
        }
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== "") setError("")
        if (e.key === "Enter") searchPhotoHandler()
    }

    const onPageChanged = (page: number) => {
        dispatch(getPhotos(title, page))
    }
    if (photos.receivingPhotosProgress) {
        return <Loading/>
    }
    return <div className={s.imageSearchContainer}>
        {
            !photos.receivingPhotosSuccess &&
            <Search errorMessage={" :=( "} isOpen={true}/>
        }
        <div className={styles.container}>
            <Grid container>
                <Grid className={styles.item} item xs={8}>
                    <TextField
                        type="text"
                        value={title}
                        onChange={inputHandler}
                        onKeyPress={onKeyPressHandler}
                        variant="outlined"
                        placeholder={"Print your search"}
                        error={error !== ""}
                        helperText={error}
                        fullWidth={true}
                        size={"medium"}
                    />
                </Grid>
                <Grid className={styles.item} item xs={4}>
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
                    bookmark={isPhotoBookmark(ph.id, favorite)}
                />
            )
            }
        </div>
    </div>
}
