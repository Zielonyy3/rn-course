import {Pressable, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

function FavoriteButton({icon, onPress}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <Ionicons name={icon} size={24} color={'white'}/>
        </Pressable>
    );
}

export default FavoriteButton;


const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    }
});
