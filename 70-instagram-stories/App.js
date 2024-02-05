import {StatusBar} from 'expo-status-bar';
import {Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import usersStories from './stories'
import {useState} from "react";
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
    const [userIndex, setUserIndex] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);

    const user = usersStories[userIndex];
    const story = user.stories[storyIndex];


    const goToNextUser = () => {
        setUserIndex(index => {
            if (index === usersStories.length - 1) {
                console.warn('end of stories')
                return 0;
            }
            return index + 1;
        })
    }
    const goToPrevUser = () => {
        setUserIndex(index => {
            if (index === 0) {
                console.warn('beginning of stories')
                return usersStories.length - 1;
            }
            return index - 1;
        })
    }

    const goToPrevStory = () => {
        setStoryIndex(index => {
            if (index === 0) {
                goToPrevUser();
                return 0;
            }
            return index - 1;
        });
    }
    const goToNextStory = () => {
        setStoryIndex(index => {
            if (index === user.stories.length - 1) {
                goToNextUser();
                return 0;
            }
            return index + 1
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.storyContainer}>
                <Image source={{uri: story.uri}} style={styles.image}/>
                <Pressable style={styles.navPressable} onPress={goToPrevStory}/>
                <Pressable style={[styles.navPressable, {right: 0}]} onPress={goToNextStory}/>
                <View style={styles.header}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.7)', 'transparent']}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.indicatorRow}>
                        {user.stories.map((story, index) => (
                            <View style={styles.indicatorBG}>
                                <View key={index}
                                      style={[styles.indicator, index <= storyIndex && styles.watchedIndicator]}
                                />
                            </View>
                        ))}
                    </View>
                    <Text style={styles.username}>{user.username}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TextInput style={styles.input} placeholder={'Send message...'} placeholderTextColor={'white'}/>
            </View>
            <StatusBar style="light"/>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    storyContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    header: {
        position: "absolute",
        top: 0,
        width: '100%',
        padding: 20,
        paddingTop: 5,
    },
    username: {
        color: 'white',
        fontWeight: 'bold'
    },
    footer: {
        width: '100%',
        backgroundColor: 'black'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 50,
        color: 'white'
    },
    navPressable: {
        position: 'absolute',
        width: '30%',
        height: '100%',
    },
    indicatorRow: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 20,
        paddingTop: 5,
    },
    indicator: {
        flex: 1,
        height: 4,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    indicatorBG: {
        flex: 1,
    },
    watchedIndicator: {
        backgroundColor: 'ghostwhite',
    }
});
