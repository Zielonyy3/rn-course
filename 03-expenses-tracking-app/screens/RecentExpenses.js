import {StyleSheet} from 'react-native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../utils/date";
import {getExpenses} from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);

    async function fetchExpenses() {
        setIsFetching(true)
        try {
            const expenses = await getExpenses();
            expensesCtx.setExpenses(expenses);
        } catch (e) {
            setError('Could not fetch expenses');
        }
        setIsFetching(false)
    }

    useEffect(() => {
        fetchExpenses();
    }, []);


    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const startDate = getDateMinusDays(new Date(), 7);
        return expense.date > startDate;
    })

    function errorHandler() {
        setError(null);
        fetchExpenses();
    }

    if (isFetching) {
        return <LoadingOverlay/>
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    return (
        <ExpensesOutput expenses={recentExpenses}
                        expensesPeriod={'Last 7 days'}
                        fallbackText={'No recent expenses'}/>
    );
}

export default RecentExpenses;

const styles = StyleSheet.create({});
