import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            }
        case ANSWER_QUESTION: 
            const { answer, qid, authedUser } = action
            let selectedOption = state[qid][answer]
            selectedOption = {
                 ...state[qid][answer], 
                votes: state[qid][answer].votes.concat([authedUser])
            }

            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: selectedOption
                },
            }
        default:
            return state
    }
} 