import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import {PATH} from "../Routes/Routes";
export const Navbar = () => {
    return (
        <div className={styles.navBlock}>
            <NavLink to={PATH.IMAGE_SEARCH}>
                <ImageSearchIcon fontSize={"large"}/>
            </NavLink>
            <NavLink to={PATH.BOOKMARK}>
                < BookmarksIcon fontSize={"large"}/>
            </NavLink>
        </div>
    );
}