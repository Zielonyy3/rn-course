import {StyleSheet} from 'react-native';
import {CATEGORIES, MEALS} from "../data/dummy-data";
import {useLayoutEffect} from "react";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({route, navigation}) {
    const categoryId = route.params.categoryId;

    const categoryMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId));

    const categoryTitle = CATEGORIES.find((category) => category.id === categoryId).title;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: categoryTitle
        });
    }, [categoryId, navigation]);

    return (
        <MealsList meals={categoryMeals} />

    );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({

});
