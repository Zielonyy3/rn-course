import {FlatList, StyleSheet, View} from 'react-native';
import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

function CategoriesScreen({navigation}) {

    function renderCategoryItem({item, index}) {
        function pressHandler() {
            navigation.navigate('MealsOverview', {
                categoryId: item.id,
                categoryTitle: item.title,
            });
        }

        return <CategoryGridTile color={item.color} title={item.title} onPress={pressHandler}/>
    }

    return (
        <View>
            <FlatList data={CATEGORIES}
                      keyExtractor={(item) => item.id}
                      renderItem={renderCategoryItem}
                      numColumns={2}
            />
        </View>
    );
}

export default CategoriesScreen;


const styles = StyleSheet.create({

});
