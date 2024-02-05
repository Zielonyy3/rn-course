import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({message, onConfirm}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occured</Text>
            <Text style={styles.text}>{message}</Text>
            {onConfirm ? <Button title={'okay'} onPress={onConfirm}>Okay</Button> : null}
        </View>
    );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});
