import { combineReducers } from 'redux';
import planetReducer from './planets-reducers';

export default combineReducers({ planets: planetReducer });
