import {FlatList, StyleSheet, View} from 'react-native';
import {CATEGORIES, MEALS} from "../data/dummy-data";
import MealItem from "../components/MealItem";
import {useEffect, useLayoutEffect} from "react";

function MealsOverviewScreen({route, navigation}) {
    const categoryId = route.params.categoryId;

    const categoryMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId));

    const categoryTitle = CATEGORIES.find((category) => category.id === categoryId).title;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: categoryTitle
        });
    }, [categoryId, navigation]);


    function renderMealItem({item, index}) {
        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            complexity: item.complexity,
            duration: item.duration,
        }
        return <MealItem {...mealItemProps} />
    }

    return (
        <View style={styles.container}>
            <FlatList data={categoryMeals}
                      keyExtractor={(item) => item.id}
                      renderItem={renderMealItem}
            />
        </View>
    );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});
