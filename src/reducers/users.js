import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION: 
            return {
                ...state,
                [action.authedUser]: { 
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.question.id])
                }
            }
        case ANSWER_QUESTION:
            const { answer, qid, authedUser } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: { ...state[authedUser].answers, [qid]: answer}
                }
            }
        default:
            return state
    }
} 