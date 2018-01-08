import { combineReducers } from 'redux';
import toggleMenuReducer from './side_menu__reducer';
import activeBlob from './active_blob__reducer';
import mobileOrientation from './detect_orientation__reducer';


export default combineReducers({
	menuOpen: toggleMenuReducer,
	activeBlob: activeBlob,
	orientation: mobileOrientation
})

