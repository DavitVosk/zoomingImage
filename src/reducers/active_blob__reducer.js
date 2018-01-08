import * as aT from '../actions/types';

export default (state = '23', action) => {
	switch (action.type) {
		case aT.CHANGE_ACTIVE_BLOB:
			return action.payload.activeBlob
	}
	return state;
}
