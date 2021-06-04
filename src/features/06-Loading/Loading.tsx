import CircularProgress from '@material-ui/core/CircularProgress';
import s from './Loading.module.css'

const Loading = () => {

    return (
        <div className={s.loading}>
            <CircularProgress color="secondary" />
        </div>
    );
}

export default Loading