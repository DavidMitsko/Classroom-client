import axios from "axios";
import {
    API_URL,
    SIGN_IN,
    SIGN_OUT,
    RAISE_HAND,
    GET_AUTHORIZED_STUDENTS,
    GET_ALL_STUDENTS,
    GET_STUDENTS_LOGS,
    GET_STUDENTS_LOGS_FILTER,
    CHANGE_EMAIL,
    REPORT_INFO,
    TURN_OFF_REPORTS,
    TURN_ON_REPORTS,
    SET_UP_REPORTS
} from "../constants";

axios.defaults.baseURL = API_URL;

const signIn = data => axios.post(SIGN_IN, data)

const signOut = userId => axios.get(SIGN_OUT, {params: {userId: userId}})

const raiseHand = userId => axios.post(RAISE_HAND, null, {params: {userId: userId}})

const getAuthorizedStudents = () => axios.get(GET_AUTHORIZED_STUDENTS)

const getAllStudents = () => axios.get(GET_ALL_STUDENTS)

const getAllStudentsLogs = (studentId, time) => axios.get(GET_STUDENTS_LOGS,
    {params: {studentId, time}})

const getStudentsLogs = (actions, studentId, time) => axios.get(GET_STUDENTS_LOGS_FILTER,
    {params: {actions, studentId, time}})

const changeEmail = data => axios.post(CHANGE_EMAIL, data)

const getReportInfo = userId => axios.get(REPORT_INFO, {params: {userId}})

const turnOnReports = data => axios.post(TURN_ON_REPORTS, data);

const turnOffReports = userId => axios.post(TURN_OFF_REPORTS, null, {params: {userId}});

const setUpReports = data => axios.post((SET_UP_REPORTS, data));

export const api = {
    signIn,
    signOut,
    raiseHand,
    getAuthorizedStudents,
    getAllStudents,
    getAllStudentsLogs,
    getStudentsLogs,
    changeEmail,
    getReportInfo,
    turnOffReports,
    turnOnReports,
    setUpReports
}