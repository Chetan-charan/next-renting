

const itemUpdateReducer = (state = [],action) => {

    switch(action.type){
        case 'ADDITEM': 
            return action.payload;
        case 'REMOVEITEM':
            return action.payload;
        default:
            return state; 
    }

}

export default itemUpdateReducer;