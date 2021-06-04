import React from "react";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {deleteTag} from "../../main/bll/imageSearchReducer";
import styles from "./Tags.module.css"
import {deleteTagFromBookmarkTC} from "../../main/bll/bookmarkReducer";

type TagPropsType = {
    tags: Array<string>,
    photoId: string
    bookmark?: boolean
}


export const Tags: React.FC<TagPropsType> = (props) => {
    const {tags, photoId} = props
    const dispatch = useDispatch()

    const deleteTagHandler = (tag: string) => () => {
        dispatch(deleteTag(photoId, tag))
        if (props.bookmark) {
            dispatch(deleteTagFromBookmarkTC(photoId, tag))
        }
    }
    return (
        <div className={styles.tags}>
            {tags.map((t, index) => (
                <div key={t + index}>
                    <span> {t}</span>
                    <IconButton size="small" onClick={deleteTagHandler(t)}><Delete color="primary"/></IconButton>
                </div>
            ))}</div>
    )

}