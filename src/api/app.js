import axios from "axios";
import {
    API_URL,
    SIGN_IN,
    SIGN_OUT,
    RAISE_HAND,
    GET_USERS
} from "../constants";

axios.defaults.baseURL = API_URL;

const signIn = data => axios.post(SIGN_IN, data)

const signOut = userId => axios.get(SIGN_OUT, {params: {userId: userId}})

const raiseHand = userId => axios.post(RAISE_HAND, null, {params: {userId: userId}})

const getUsers = () => axios.get(GET_USERS)

export const api = {
    signIn,
    signOut,
    raiseHand,
    getUsers
}