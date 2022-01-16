

export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const addItem = (arr) => {
    return {
        type: 'ADDITEM',
        payload: arr
    }
} 

export const removeItem = (arr) => {
    return {
        type: 'REMOVEITEM',
        payload: arr
    }
} 

export const updateOrderAmount = (amount) => {
    return {
        type: 'UPDATEORDERAMOUNT',
        payload: amount
    }
}

export const updateCustomerDetails = (customer) => {
    return {
        type: 'UPDATECUSTOMERDETAILS',
        payload: customer
    }
}

export const updateDays = (num) => {
    return {
        type: 'UPDATEDAYS',
        payload: num
    }
}

export const updateDateRange = (arr) => {
    return {
        type: 'UPDATEDATERANGE',
        payload: arr
    }
}