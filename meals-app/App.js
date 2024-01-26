import CategoriesScreen from "./screens/CategoriesScreen";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style={'light'}/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'MealsCategories'} screenOptions={{
                    headerStyle: {backgroundColor: '#351401'},
                    headerTintColor: '#fff',
                    contentStyle: {backgroundColor: '#3f2f25'}
                }}>
                    <Stack.Screen name={'MealsCategories'}
                                  component={CategoriesScreen}
                                  options={{
                                      title: 'All categories',
                                  }}/>
                    <Stack.Screen name={'MealsOverview'}
                                  component={MealsOverviewScreen}
                    />
                    <Stack.Screen name={'Meal'}
                                  component={MealDetailScreen}
                                  options={({route, navigation}) => ({
                                      title: route.params.mealTitle,
                                  })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
