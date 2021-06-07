const requestUsersType = 'REQUEST_USERS';
const recieveUsersType = 'RECEIVE_USERS';
const addUserType = 'ADD_USER';
const updateUserType = 'UPDATE_USER';
const deleteUserType = 'DELETE_USER';
const initialState = { users: [], user: {}, isLoading: false };

let allusers = [];
let currentuser = {};

export const actionCreators = {
    requestUsers: () => async (dispatch, getState) => {

        dispatch({ type: requestUsersType });

        const url = 'https://60bc7706b8ab37001759f212.mockapi.io/api/users';
        const response = await fetch(url);
        const allusers = await response.json();

        dispatch({ type: recieveUsersType, allusers });
    },


    addUser: (user) => async (dispatch, getState) => {
        const baseURL = "https://60bc7706b8ab37001759f212.mockapi.io/api/users";
        const data = JSON.stringify(
            {name: user.name, surname: user.surname, phoneNumber: user.phoneNumber}
        );

        const fetchTask = fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: addUserType, user: data });
            });
    },

    updateUser: (user) => async (dispatch, getState) => {
        const baseURL = "https://60bc7706b8ab37001759f212.mockapi.io/api/users";

        const data = JSON.stringify(
            { id: user.id, name: user.name, surname: user.surname, phoneNumber: user.phoneNumber }
        );

        const fetchTask = fetch(baseURL + "/" + user.id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: updateUserType, user: data });
            });
    },

    deleteUser: (user) => async (dispatch, getState) => {
        const baseURL = "https://60bc7706b8ab37001759f212.mockapi.io/api/users";

        const data = JSON.stringify(
            { id: user.id, name: user.name, surname: user.surname, phoneNumber: user.phoneNumber }
        );

        const fetchTask = fetch(baseURL + "/" + user.id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: deleteUserType, user: data });
            });
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
        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === updateUserType) {
        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === deleteUserType) {
        return {
            ...state,
            isLoading: false
        };
    }

    return state;
};