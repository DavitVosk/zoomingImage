import * as aT from '../actions/types';

export default (state = 'PORTRAIT', action) => {
	switch (action.type) {
		case aT.SET_ORIENTATION:
			return action.payload
	}
	return state;
}
