import React from 'react';
import {Route, Router, Redirect} from "react-router";
import {history} from "../utils";
import {Login} from "./Login";
import {Members} from "./Members";
import {Students} from "./Students";
import {StudentsLogs} from "./StudentsLogs";
import {Settings} from "./Settings";
import {LOGIN, LOG, MEMBERS, SETTINGS, STUDENTS} from "../routes";

export default() => (
    <Router history={history}>
        <Route exact path='/'>
           <Redirect to={LOGIN}/>
        </Route>
        <Route exact path={LOGIN}>
            <Login/>
        </Route>
        <Route exact path={MEMBERS}>
            <Members/>
        </Route>
        <Route exact path={STUDENTS}>
            <Students/>
        </Route>
        <Route exact path={LOG}>
            <StudentsLogs/>
        </Route>
        <Route exact path={SETTINGS}>
            <Settings/>
        </Route>
    </Router>
)
