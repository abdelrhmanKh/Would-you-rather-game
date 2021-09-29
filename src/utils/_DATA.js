let users = {
	sarahedo: {
		id: 'sarahedo',
		name: 'Sarah Edo',
		avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
		answers: {
			'8xf0y6ziyjabvozdd253nd': 'chooseOne',
			'6ni6ok3ym7mf1p33lnez': 'chooseOne',
			am8ehyc8byjqgar0jgpub9: 'chooseTwo',
			loxhs1bqm25b708cmbf3g: 'chooseTwo'
		},
		questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
	},
	tylermcginnis: {
		id: 'tylermcginnis',
		name: 'Tyler McGinnis',
		avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
		answers: {
			vthrdm985a262al8qx3do: 'chooseOne',
			xj352vofupe1dqz9emx13r: 'chooseTwo'
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
	},
	johndoe: {
		id: 'johndoe',
		name: 'John Doe',
		avatarURL: 'https://tylermcginnis.com/would-you-rather/dan.jpg',
		answers: {
			xj352vofupe1dqz9emx13r: 'chooseOne',
			vthrdm985a262al8qx3do: 'chooseTwo',
			'6ni6ok3ym7mf1p33lnez': 'chooseOne'
		},
		questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
	}
};

let questions = {
	'8xf0y6ziyjabvozdd253nd': {
		id: '8xf0y6ziyjabvozdd253nd',
		author: 'sarahedo',
		timestamp: 1467166872634,
		chooseOne: {
			votes: ['sarahedo'],
			text: 'have horrible short term memory'
		},
		chooseTwo: {
			votes: [],
			text: 'have horrible long term memory'
		}
	},
	'6ni6ok3ym7mf1p33lnez': {
		id: '6ni6ok3ym7mf1p33lnez',
		author: 'johndoe',
		timestamp: 1468479767190,
		chooseOne: {
			votes: [],
			text: 'become a superhero'
		},
		chooseTwo: {
			votes: ['johndoe', 'sarahedo'],
			text: 'become a supervillian'
		}
	},
	am8ehyc8byjqgar0jgpub9: {
		id: 'am8ehyc8byjqgar0jgpub9',
		author: 'sarahedo',
		timestamp: 1488579767190,
		chooseOne: {
			votes: [],
			text: 'be telekinetic'
		},
		chooseTwo: {
			votes: ['sarahedo'],
			text: 'be telepathic'
		}
	},
	loxhs1bqm25b708cmbf3g: {
		id: 'loxhs1bqm25b708cmbf3g',
		author: 'tylermcginnis',
		timestamp: 1482579767190,
		chooseOne: {
			votes: [],
			text: 'be a front-end developer'
		},
		chooseTwo: {
			votes: ['sarahedo'],
			text: 'be a back-end developer'
		}
	},
	vthrdm985a262al8qx3do: {
		id: 'vthrdm985a262al8qx3do',
		author: 'tylermcginnis',
		timestamp: 1489579767190,
		chooseOne: {
			votes: ['tylermcginnis'],
			text: 'find $50 yourself'
		},
		chooseTwo: {
			votes: ['johndoe'],
			text: 'have your best friend find $500'
		}
	},
	xj352vofupe1dqz9emx13r: {
		id: 'xj352vofupe1dqz9emx13r',
		author: 'johndoe',
		timestamp: 1493579767190,
		chooseOne: {
			votes: ['johndoe'],
			text: 'write JavaScript'
		},
		chooseTwo: {
			votes: ['tylermcginnis'],
			text: 'write Swift'
		}
	}
};

function generateUID() {
	return (
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15)
	);
}

export function _getUsers() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...users }), 1000);
	});
}

export function _getQuestions() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...questions }), 1000);
	});
}

export function formatQuestion({ chooseOneText, chooseTwoText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		chooseOne: {
			votes: [],
			text: chooseOneText
		},
		chooseTwo: {
			votes: [],
			text: chooseTwoText
		}
	};
}

export function _saveQuestion(question) {
	return new Promise((res, rej) => {
		const authedUser = question.author;
		const formattedQuestion = formatQuestion(question);

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion
			};

			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					questions: users[authedUser].questions.concat([formattedQuestion.id])
				}
			};

			res(formattedQuestion);
		}, 1000);
	});
}
export function _saveQuestionAnswer({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers: {
						...users[authedUser].answers,
						[qid]: answer
					}
				}
			}

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.concat([authedUser])
					}
				}
			}

			res()
		}, 500)
	})
}
