

const customerDetailsReducer = (state = {}, action) => {

    switch(action.type) {
        case 'UPDATECUSTOMERDETAILS': 
        return action.payload;
        default:
            return state;
    }

}

export default customerDetailsReducer;