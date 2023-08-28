import React, {useReduce, createContext, useReducer} from 'react';
import contextReducer from './contextReducer/contextReducer';
const initialstate = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialstate);

export const Provider = ({children}) => {
    console.log(initialstate);
    const [transactions,dispatch] = useReducer(contextReducer,initialstate);
    console.log(transactions);
    const deleteTransaction = (id) =>{
        dispatch({type:'DELETE_TRANSACTION', payload:id});
    }
    const addTransaction= (transaction) =>{
        dispatch({type:'ADD_TRANSACTION', payload:transaction});
    }

    const balance = transactions.reduce((acc,currVal) => currVal.type ==='Expense' ? acc - currVal.amount : acc + currVal.amount ,0);
    //dispatching something changing the state of transactions

    return (
        //if you want to access the deleteTRansaction and addTransaction accross all the components then
        // we write them inside the value field below
    <ExpenseTrackerContext.Provider value={{
        deleteTransaction,
        addTransaction,
        transactions,
        balance
    }}>
        {children}
    </ExpenseTrackerContext.Provider>
    )
}

// export default Provider