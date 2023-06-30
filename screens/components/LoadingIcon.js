import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Skeleton, LinearGradient } from '@rneui/themed'

const LoadingIcon = () => 
    <View style={styles.loadingIcon}>
        <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={80}
            height={40}
        />
    </View>

const styles = StyleSheet.create({
    loadingIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
})

export default LoadingIcon