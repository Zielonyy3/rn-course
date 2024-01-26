import {Image, ScrollView, Text, View, StyleSheet} from 'react-native';
import {MEALS} from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import {useLayoutEffect} from "react";
import FavoriteButton from "../components/FavoriteButton";

function MealDetailScreen({route, navigation}) {
    const mealId = route.params.mealId;

    const meal = MEALS.find(meal => meal.id === mealId);

    function headerButtonPressHandler() {
        console.log('test')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <FavoriteButton onPress={headerButtonPressHandler}/>
        });
    }, [navigation, headerButtonPressHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{uri: meal.imageUrl}}/>
            <Text style={styles.title}>{meal.title}</Text>
            <MealDetails
                affordability={meal.affordability}
                duration={meal.duration}
                complexity={meal.complexity}
                textStyle={styles.detailText}/>
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients: </Subtitle>
                    <List data={meal.ingredients}/>

                    <Subtitle>Steps: </Subtitle>
                    <List data={meal.steps}/>
                </View>
            </View>

        </ScrollView>
    );
}

export default MealDetailScreen;


const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: '#fff',
    },
    image: {
        width: '100%',
        height: 350,
    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%'
    }
});