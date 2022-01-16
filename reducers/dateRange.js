

const daterangeReducer = (state = [new Date(),new Date()], action) => {

    switch(action.type) {
        case 'UPDATEDATERANGE': 
        return action.payload;
        default:
            return state;
    }

}

export default daterangeReducer;