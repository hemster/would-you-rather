import { getQuestions, getUsers } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([
            getQuestions(),
            getUsers()
        ])
        .then(([questions, users ]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}