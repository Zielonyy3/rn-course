import CategoriesScreen from "./screens/CategoriesScreen";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";
import {Ionicons} from "@expo/vector-icons";
import {Provider} from "react-redux";
import {store} from "./store/redux/store";

const Stack = createNativeStackNavigator();

function DrawerNavigator() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#351401'},
            headerTintColor: '#fff',
            sceneContainerStyle: {backgroundColor: '#3f2f25'},
            drawerContentStyle: {backgroundColor: '#351401'},
            drawerInactiveTintColor: '#fff',
            drawerActiveTintColor: '#351401',
            drawerActiveBackgroundColor: '#e4baa1',
        }}>
            <Drawer.Screen name={'Categories'} component={CategoriesScreen} options={{
                title: 'All categories',
                drawerIcon: ({color, size}) => <Ionicons name={'list'} color={color} size={size}/>
            }}/>
            <Drawer.Screen name={'Favorites'} component={FavoritesScreen} options={{
                drawerIcon: ({color, size}) => <Ionicons name={'star'} color={color} size={size}/>
            }}/>
        </Drawer.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style={'light'}/>
            {/*<FavoritesContextProvider>*/}
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={'MealsCategories'} screenOptions={{
                        headerStyle: {backgroundColor: '#351401'},
                        headerTintColor: '#fff',
                        contentStyle: {backgroundColor: '#3f2f25'}
                    }}>
                        <Stack.Screen name={'MealsCategories'}
                                      component={DrawerNavigator}
                                      options={{
                                          headerShown: false
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
            </Provider>
            {/*</FavoritesContextProvider>*/}
        </>
    );
}
