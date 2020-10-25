import React from 'react';
import {Route, Router, Redirect} from "react-router";
import {history} from "../utils";
import {Login} from "./Login";
import {Members} from "./Members";
import {Students} from "./Students";
import {StudentsLogs} from "./StudentsLogs";
import {Settings} from "./Settings";

export default() => (
    <Router history={history}>
        <Route exact path='/'>
           <Redirect to='/login'/>
        </Route>
        <Route exact path='/login'>
            <Login/>
        </Route>
        <Route exact path='/members'>
            <Members/>
        </Route>
        <Route exact path='/students'>
            <Students/>
        </Route>
        <Route exact path='/log'>
            <StudentsLogs/>
        </Route>
        <Route exact path='/settings'>
            <Settings/>
        </Route>
    </Router>
)
