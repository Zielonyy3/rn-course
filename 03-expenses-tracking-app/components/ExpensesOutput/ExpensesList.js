import {FlatList, StyleSheet, Text} from 'react-native';
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({item, index}) {
    return <ExpenseItem expense={item}/>
}

function ExpensesList({expenses}) {

    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderExpenseItem}
        />
    );
}

export default ExpensesList;

const styles = StyleSheet.create({});
