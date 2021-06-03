import s from './App.module.css';
import {HashRouter} from 'react-router-dom';
import {Navbar} from "./main/ui/Header/Navbar/Navbar";
import {Header} from "./main/ui/Header/Header";
import {Provider} from "react-redux";
import {store} from "./main/bll/redux-store";
import React from "react";
import {Footer} from "./main/ui/Footer/Footer";
import Routes from "./main/ui/Header/Routes/Routes";


const App = () => {

    return (
        <Provider store={store}>
            <HashRouter>
                <div className={s.app}>
                    <Header/>
                    <div className={s.appHeader}>
                        <div className={s.head}>
                            <Navbar/>
                            <Routes/>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </HashRouter>
        </Provider>
    );
}

export default App;
