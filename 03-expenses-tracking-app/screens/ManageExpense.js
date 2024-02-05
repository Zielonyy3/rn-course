import {StyleSheet, View} from 'react-native';
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({route, navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsLoading(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (e) {
            setError('Could not delete expense - please try again later!');
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function submitHandler(data) {
        setIsLoading(true);
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, data)
                await updateExpense(editedExpenseId, data);
            } else {
                const id = await storeExpense(data);
                expensesCtx.addExpense({...data, id})
            }
            navigation.goBack();

        } catch (e) {
            setError('Could not save data - please try again later!')
            setIsLoading(false);
        }

    }

    if (error && !isLoading) {
        return <ErrorOverlay message={error} />
    }

    if (isLoading) {
        return <LoadingOverlay/>
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={submitHandler}
                defaultValues={selectedExpense}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
            />
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon={'trash'}
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            }
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
});
