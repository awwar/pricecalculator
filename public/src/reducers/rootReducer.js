import { combineReducers } from 'redux';
import counterReduser from './counterReduser';
import formReducer from './formReducer';

export default combineReducers({
    counterState: counterReduser,
    formState: formReducer
});
