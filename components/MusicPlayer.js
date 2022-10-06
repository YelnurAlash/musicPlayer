import { View, Text, StyleSheet, Dimensions, Pressable, Image, FlatList, Animated } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import songs from '../model/data';
import Slider from '@react-native-community/slider';

const {height, width} = Dimensions.get('window');

const MusicPlayer = () => {
    const [songIndex, setSongIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        scrollX.addListener(({value}) => {
            console.log(`ScrollX ${value} | Device width: ${width}`)
            const index = Math.round(value / width)
            setSongIndex(index);
        })
    }, []);

    return (
        <View style={styles.container}>
        <View style={styles.mainContainer}>
            <Animated.FlatList
                data={songs}
                renderItem = {({item}) => (
                    <Animated.View style={styles.imageWrapper}>
                        <Image style={styles.image} source={item.artwork} />
                    </Animated.View>
                )}
                horizontal
                padingEnabled
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {x: scrollX}
                            }
                        }
                    ],
                    {useNativeDriver: true}
                )

                }
            />
            <View style={styles.songTextWrapper}>
                <Text style={styles.songTitle}>{songs[songIndex].title}</Text>
                <Text style={styles.songArtist}>{songs[songIndex].artist}</Text>
            </View>
            <View>
                <Slider 
                    style={styles.progressBar}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#FFD369"
                    minimumTrackTintColor="#FFD369"
                    maximumTrackTintColor="#fff"
                />
            </View>
            <View style={styles.progressDuration}>
                <Text style={styles.progressDurationText}>00:00</Text>
                <Text style={styles.progressDurationText}>00:00</Text>
            </View>
            <View style={styles.musicControls}>
                <Pressable>
                    <Ionicons name='play-skip-back-outline' size={30} color='#FFD369' />
                </Pressable>
                <Pressable>
                    <Ionicons name='ios-pause-circle' size={70} color='#FFD369' />
                </Pressable>
                <Pressable>
                    <Ionicons name='play-skip-forward-outline' size={30} color='#FFD369' />
                </Pressable>
            </View>
        </View>
        <View style={styles.bottomContainer}>
            <Pressable>
                <Ionicons name='heart-outline' size={30} color='white' />
            </Pressable>
            <Pressable>
                <Ionicons name='repeat' size={30} color='white' />
            </Pressable>
            <Pressable>
                <Ionicons name='share-outline' size={30} color='white' />
            </Pressable>
            <Pressable>
                <Ionicons name='ellipsis-horizontal' size={30} color='white' />
            </Pressable>
        </View>
        </View>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageWrapper: {
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        height: 300,
        width: 300,
        borderRadius: 15
    },
    songTextWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    songTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
    },
    songArtist: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    bottomContainer: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'white'
    },
    progressBar: {
        width: 340,
        height: 20,
        flexDirection: 'row',
        marginTop: 20
    },
    progressDuration: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressDurationText: {
        color: 'white'
    },
    musicControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '60%',
        marginBottom: 10
    }
})