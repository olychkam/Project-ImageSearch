import CircularProgress from '@material-ui/core/CircularProgress';
import s from './Loading.module.css'
/*
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                margin: theme.spacing(2),
            },
        },
    }),
);
*/

const Loading = () => {

    return (
        <div className={s.loading}>
            <CircularProgress color="secondary" />
        </div>
    );
}

export default Loading