import React, {ChangeEvent, FC, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {addTag, PhotoStoreType} from "../../main/bll/imageSearchReducer";
import {useDispatch} from "react-redux";
import {Tags} from "../05-Tag/Tags";
import s from "./Photo.module.css"
import {addPhotoToBookmark, addTagToBookmarkTC, removeBookmarkPhoto} from "../../main/bll/bookmarkReducer";

type PhotoPropsType = {
    photo: PhotoStoreType
    bookmark?: boolean
}
export const Photo: FC<PhotoPropsType> = React.memo((props) => {
    const {farm, tags, id, secret, server} = props.photo
    const dispatch = useDispatch()
    const [tagInput, setTagInput] = useState("")
    const [error, setError] = useState<string>("")

    const inputTagHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length < 16) {
            setTagInput(e.currentTarget.value)
            setError("")
        } else {
            setError("long tag")
        }
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== "") setError("")
        if (e.key === "Enter") addTagHandler()
    }

    const addTagHandler = () => {
        if (tagInput.trim() !== "") {
            dispatch(addTag(id, tagInput))
            if (props.bookmark) {
                dispatch(addTagToBookmarkTC(id, tagInput))
            }
            setTagInput("")
        } else {
            setError("Please, add tag.")
        }
    }

    const OnClickHandler = () => {
        if (props.bookmark) {
            dispatch(removeBookmarkPhoto(id))
        } else {
            dispatch(addPhotoToBookmark(id, props.photo))
        }
    }

    const imgSrc = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg)`
debugger
    return (
        <div className={s.photoContainer}>
            <img className={s.photoImage} src={imgSrc} alt="img is loading :)"/>
            <div className={s.button}>
                <Button
                    onClick={OnClickHandler}
                    variant="outlined"
                    color="primary"
                >
                    {props.bookmark ? "Remove!" : "Bookmark!"}</Button>
            </div>
            <Tags
                tags={tags}
                photoId={id}
                bookmark={props.bookmark}
            />
            <TextField className={s.button}
                       type="text"
                       value={tagInput}
                       label="some tags?"
                       onChange={inputTagHandler}
                       onKeyPress={onKeyPressHandler}
                       variant="outlined"
                       error={!!error}
                       helperText={error}
            />
        </div>
    )
})