import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import s from './Header.module.css'
import {AppBar, Toolbar} from "@material-ui/core";


export const Header = () => {
    return <AppBar position="static" style={{background: '#434348'}}>
        <Toolbar style={{display: "flex", justifyContent: "space-between", width: "98%"}}>
            <div className={s.title}><h1>IMAGE FINDER</h1></div>
            <AccountCircleIcon fontSize="large"/>
        </Toolbar>
    </AppBar>
}