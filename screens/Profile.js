import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
    const { id } = route.params; // Assuming you're using React Navigation and passing the ID via the route params
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserDetails(id).then(fetchedUser => setUser(fetchedUser));
    }, [id]);

    if (!user) {
        // You might want to return a loading spinner or similar here
        return null;
    }

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: user.profilePictureUrl }}
                style={styles.image}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            {/* You can add more user details here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
    },
});

export default ProfileScreen;
