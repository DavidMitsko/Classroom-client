import axios from "axios";
import {
    API_URL,
    SIGN_IN,
    SIGN_OUT,
    RAISE_HAND,
    GET_AUTHORIZED_STUDENTS,
    GET_ALL_STUDENTS,
    GET_STUDENTS_LOGS
} from "../constants";

axios.defaults.baseURL = API_URL;

const signIn = data => axios.post(SIGN_IN, data)

const signOut = userId => axios.get(SIGN_OUT, {params: {userId: userId}})

const raiseHand = userId => axios.post(RAISE_HAND, null, {params: {userId: userId}})

const getAuthorizedStudents = () => axios.get(GET_AUTHORIZED_STUDENTS)

const getAllStudents = () => axios.get(GET_ALL_STUDENTS)

const getStudentsLogs = studentId => axios.get(GET_STUDENTS_LOGS, {params: {studentId: studentId}})

export const api = {
    signIn,
    signOut,
    raiseHand,
    getAuthorizedStudents,
    getAllStudents,
    getStudentsLogs
}