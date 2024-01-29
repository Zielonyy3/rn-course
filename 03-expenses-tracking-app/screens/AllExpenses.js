import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {StyleSheet} from 'react-native';
import {DUMMY_EXPENSES} from "./RecentExpenses";

function AllExpenses() {
    return (
        <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod={'Total'}/>
    );
}

export default AllExpenses;

const styles = StyleSheet.create({});
