import {combineReducers} from 'redux';
import orderCountReducer from './itemCounter';
import itemUpdateReducer from './itemsUpdate';
import orderAmountReducer from './orderAmount';
import customerDetailsReducer from './customerDetails';
import daterangeReducer from './dateRange';
import updateDaysReducer from './updateDays';


const allReducers = combineReducers({
     orderCountReducer,
     itemUpdateReducer,
     orderAmountReducer,
     customerDetailsReducer,
     daterangeReducer,
     updateDaysReducer
});

export default allReducers;