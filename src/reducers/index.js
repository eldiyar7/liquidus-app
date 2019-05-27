import { combineReducers } from 'redux';
import listingsReducer from './listingsReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({ 
    listings: listingsReducer,    
    errors: errorsReducer,    
 });