import React, {Component} from 'react';
import {
    ActivityIndicator,
    Platform, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class UserDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('user').name.first.charAt(0).toUpperCase() + navigation.getParam('user').name.first.substring(1, navigation.getParam('user').name.first.length),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.setState({
            user: this.props.navigation.state.params.user
        });
    }

    render() {

        if(this.state.user === null) {
            return (
                <ActivityIndicator />
            );
        }

        return (
            <View style={[styles.container, this.state.user.gender == 'male' ? styles.male : styles.female]}>
                <Image
                    style={styles.itemImage}
                    source={{ uri : this.state.user.picture.large }}
                />
                <Text style={styles.itemText}>Name: {this.state.user.name.first + ' ' + this.state.user.name.last }</Text>
                <Text style={styles.itemText}>Email: {this.state.user.email }</Text>
                <Text style={styles.itemText}>Location: {this.state.user.location.street }</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginVertical: 10
    },
    itemText: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5,
        color: 'white'
    },
    male: {
        backgroundColor: '#0093bf'
    },
    female: {
        backgroundColor: '#cf0092'
    }
});