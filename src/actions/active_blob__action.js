import * as aT from './types';

export const changeActiveBlob = ({ activeBlob }) => {
	return { type: aT.CHANGE_ACTIVE_BLOB, payload: { activeBlob }  };
};