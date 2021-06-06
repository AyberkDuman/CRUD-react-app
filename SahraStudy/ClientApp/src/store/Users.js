import { useReducer } from "react";

const requestUsersType = 'REQUEST_USERS';
const recieveUsersType = 'RECEIVE_USERS';
const addUserType = 'ADD_USER';
const initialState = { users: [], isLoading: false };

const allusers = [
    {
        name: "isim1",
        surname: "soyad1",
        phoneNumber: "905111111111"
    },
    {
        name: "isim2",
        surname: "soyad2",
        phoneNumber: "905222222222"
    },
    {
        name: "isim3",
        surname: "soyad3",
        phoneNumber: "905333333333"
    }
]

export const actionCreators = {
    requestUsers: () => async (dispatch, getState) => {

        dispatch({ type: requestUsersType });

        dispatch({ type: recieveUsersType, allusers });
    },

    addUser: (user) => async (dispatch, getState) => {

        dispatch({ type: addUserType, user });
    }

};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestUsersType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === recieveUsersType) {
        return {
            ...state,
            users: action.allusers,
            isLoading: false
        };
    }

    if (action.type === addUserType) {
        var newusers = allusers;

        newusers.push({ name: action.user.name, surname: action.user.surname, phoneNumber: action.user.phoneNumber })

        return {
            ...state,
            users: newusers,
            isLoading: false
        };
    }

    return state;
};