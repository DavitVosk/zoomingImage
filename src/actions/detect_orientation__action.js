import * as aT from './types';

export const keepOrientation = ({orientation}) => {
	return { type: aT.SET_ORIENTATION, payload: orientation  };
};