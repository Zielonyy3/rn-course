import {StyleSheet} from 'react-native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../utils/date";


function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const startDate = getDateMinusDays(new Date(), 7);
        return expense.date > startDate;
    })

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod={'Last 7 days'} fallbackText={'No recent expenses'}/>
    );
}

export default RecentExpenses;

const styles = StyleSheet.create({});
