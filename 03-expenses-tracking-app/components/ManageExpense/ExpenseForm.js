import {StyleSheet, Text, View} from 'react-native';
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../utils/date";
import {GlobalStyles} from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues?.amount.toString() || (0).toString(),
            isValid: true,
        },
        date: {
            value: defaultValues?.date ? getFormattedDate(defaultValues?.date) : getFormattedDate(new Date()),
            isValid: true,
        },
        description: {
            value: defaultValues?.description || 'Your text',
            isValid: true
        },
    });

    function inputChangedHandler(inputId, enteredValue) {
        setInputs(prevState => ({
            ...prevState,
            [inputId]: {value: enteredValue, isValid: true},
        }))
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString().toLowerCase() !== 'invalid date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs(curInputs => ({
                amount: {value: curInputs.amount.value, isValid: amountIsValid},
                date: {value: curInputs.date.value, isValid: dateIsValid},
                description: {value: curInputs.description.value, isValid: descriptionIsValid},
            }))
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label={'Amount'}
                       style={styles.rowInput}
                       invalid={!inputs.amount.isValid}
                       inputConfig={{
                           keyboardType: 'decimal-pad',
                           onChangeText: inputChangedHandler.bind(this, 'amount'),
                           value: inputs.amount.value
                       }}
                />
                <Input label={'Date'}
                       invalid={!inputs.date.isValid}
                       style={styles.rowInput}
                       inputConfig={{
                           placeholder: 'YYYY-MM-DD',
                           maxLength: 10,
                           onChangeText: inputChangedHandler.bind(this, 'date'),
                           value: inputs.date.value
                       }}
                />
            </View>
            <Input label={'Description'}
                   invalid={!inputs.date.isValid}
                   inputConfig={{
                       multiline: true,
                       onChangeText: inputChangedHandler.bind(this, 'description'),
                       value: inputs.description.value
                   }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your data</Text>}
            <View style={styles.buttonsContainer}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>

        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
