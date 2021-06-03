import React from "react";
import {Switch, Route} from "react-router-dom";
import styles from './Routes.module.css';
import ImageSearch from "../../../../features/01-ImageSearch/ImageSearch";
import {Bookmark} from "../../../../features/02-Bookmark/Bookmark";
import Error404 from "../../Error404/Error404";

export const PATH = {
    LOGIN: "/login",
    IMAGE_SEARCH:"/",
    BOOKMARK:"/bookmark"
}

function Routes() {
    return (
        <div className={styles.mainContainer}>
            <Switch>
                <Route exact path={"/"} render={() => <ImageSearch/>}/>
                <Route exact path={PATH.BOOKMARK} render={() => <Bookmark/>}/>
                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    );
}

export default Routes;
