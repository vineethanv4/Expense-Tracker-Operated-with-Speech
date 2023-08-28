// Reducers in Redux are functions that specify how the application's state changes in response to actions
// const transactions = [
//     { id: 1 },
//     { id: 2 }
// ]
const contextReducer = (state, action) => {
    let transactions;
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            transactions = state.filter((t) => t.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state];
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        default:
            return state;
    }
}

export default contextReducer;