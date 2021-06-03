import {AppBar, Container} from "@material-ui/core";
import s from "./Footer.module.css";

export const Footer = () => {
    return <div className={s.me}>
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <div className={s.me}> Olya Martynova</div>
            </Container>
        </AppBar>
    </div>
}