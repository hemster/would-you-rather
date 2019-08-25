import { getQuestions, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function handleReceiveQuestions() {
    return (dispatch) => {
        dispatch(showLoading())

        return getQuestions()
            .then((questions) => dispatch(receiveQuestions(questions)))
            .then(() => dispatch(hideLoading()))
    }
}

function answerQuestion( {authedUser, qid, answer} ) {
    return {
        type: ANSWER_QUESTION,
        qid,
        authedUser,
        answer
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())

        return saveQuestionAnswer({authedUser, qid, answer})
            .then(() => dispatch(answerQuestion({ authedUser, qid, answer })))
            .then(() => dispatch(hideLoading()))
    }
}