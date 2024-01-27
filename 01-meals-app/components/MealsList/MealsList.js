import {FlatList, StyleSheet, View} from 'react-native';
import MealItem from "./MealItem";

function MealsList({meals}) {
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
            <FlatList data={meals}
                      keyExtractor={(item) => item.id}
                      renderItem={renderMealItem}
            />
        </View>
    );
}

export default MealsList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});
