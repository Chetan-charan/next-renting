
const updateDaysReducer = (state = 0,action) => {

    switch(action.type){
        case 'UPDATEDAYS': 
            return action.payload;
        default:
            return state; 
    }

}

export default updateDaysReducer;