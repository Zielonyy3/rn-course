import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import MealDetails from "./MealDetails";

function MealItem({id, title, imageUrl, duration, complexity, affordability}) {
    const navigation = useNavigation();

    function pressHandler() {
        navigation.navigate('Meal', {
            mealId: id,
            mealTitle: title,
        });
    }

    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{color: '#ccc'}}
                       onPress={pressHandler}
                       style={({pressed}) => [pressed && styles.buttonPressed]}
            >
                <View style={styles.innerContainer}>
                    <Image style={styles.image} source={{uri: imageUrl}}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <MealDetails
                    affordability={affordability}
                    duration={duration}
                    complexity={complexity}/>
            </Pressable>
        </View>
    );
}

export default MealItem;


const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        overflow: Platform.OS === 'android' ? 'hidden' : "visible"
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8
    },
    buttonPressed: {
        opacity: 0.5,
    },
});
