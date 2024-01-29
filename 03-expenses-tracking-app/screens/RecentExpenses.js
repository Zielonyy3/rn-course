import {StyleSheet, Text, View} from 'react-native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export const  DUMMY_EXPENSES = [
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

function RecentExpenses() {
    return (
        <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod={'Last 7 days'}/>
    );
}

export default RecentExpenses;

const styles = StyleSheet.create({

});
