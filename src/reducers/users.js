import { RECEIVE_USERS } from '../actions/users';
import { ADD_QUESTION, ADD_ANSWER } from '../actions/questions';

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.payload
			};

		case ADD_QUESTION:
			return {
				...state,
				[action.payload.author]: {
					...state[action.payload.author],
					questions: state[action.payload.author].questions.concat([
						action.payload.id
					])
				}
			};

		case ADD_ANSWER:
			const { qid, answer, authedUser } = action.answerInfo;

			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}
			};

		default:
			return state;
	}
}
