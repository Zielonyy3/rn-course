import {createContext, useReducer} from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {
    },
    setExpenses: (expenses) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, {description, amount, date}) => {
    }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const ordered = action.payload.reverse();
            return ordered;
        case 'UPDATE':
            return state.map(expense => {
                if (expense.id === action.payload.id) {
                    return {...expense, ...action.payload.data};
                }
                return expense;
            });
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    function addExpense(expenseDate) {
        dispatch({type: 'ADD', payload: expenseDate});
    }

    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;