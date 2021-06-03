import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import s from './Header.module.css'
import {AppBar, Toolbar} from "@material-ui/core";


export const Header = () => {
    return <AppBar position="static" className={s.app}>
        <Toolbar className={s.toolbar}>
            <div className={s.title}><h1>IMAGE FINDER</h1></div>
            <AccountCircleIcon fontSize="large"/>
        </Toolbar>
    </AppBar>
}