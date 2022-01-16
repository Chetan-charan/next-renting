

const orderAmountReducer = (state = 0, action) => {

    switch(action.type) {
        case 'UPDATEORDERAMOUNT': 
        return action.payload;
        default:
            return state;
    }

}

export default orderAmountReducer;