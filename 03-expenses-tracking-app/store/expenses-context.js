import {createContext, useReducer} from "react";

export const DUMMY_EXPENSES = [
    {
        id: 'e1',
        amount: 100,
        description: 'Nike shoes',
        date: new Date('2024-01-17')
    },
    {
        id: 'e2',
        amount: 199.99,
        description: 'Adidas shoes',
        date: new Date('2024-01-22')
    },
    {
        id: 'e3',
        amount: 50,
        description: 'Grocery',
        date: new Date('2024-01-26')
    },
    {
        id: 'e4',
        amount: 14.99,
        description: 'A Book',
        date: new Date('2024-01-27')
    },
    {
        id: 'e5',
        amount: 18.43,
        description: 'Another Book',
        date: new Date('2024-01-23')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, {description, amount, date}) => {
    }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [
                {...action.payload, id},
                ...state
            ];
        case 'UPDATE':
            return state.map(expense => {
                if(expense.id === action.payload.id) {
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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

    function addExpense(expenseDate) {
        dispatch({type: 'ADD', payload: expenseDate});
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
        deleteExpense,
        updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;