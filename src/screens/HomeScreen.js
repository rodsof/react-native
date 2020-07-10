import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native';

import UserService from '../services/UserService';

export default class UserList extends React.Component {

    static navigationOptions = {
        title: 'Mi primer app en RN',
    };

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            isLoading: true
        };
    }

    componentDidMount() {
        UserService.getUsers().then((results) => {
            if(results && results.data && results.data.results) {
                console.log(results.data.results);
                this.setState({
                    users: results.data.results,
                    isLoading: false
                });
            }
        }).catch((err) => {
            console.log("Err", err);
        });
    }

    render() {
        if(this.state.isLoading) {
            return (
                <ActivityIndicator />
            );
        }

        return (
            <View>
                <FlatList
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <Text style={[styles.title, { marginTop: 10, color: '#0093bf' }]}>Lista de usuarios</Text>
                                <View style={{ height: 1, backgroundColor: '#0093bf', opacity: .1, width: '50%', alignSelf: 'center', marginVertical: 10 }}></View>
                            </View>
                        );
                    }}
                    data={this.state.users}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('DetailsScreen', {
                                        user: item
                                    });
                                }}
                                style={[styles.itemContainer, item.gender == 'male' ? styles.male : styles.female]}>
                                <Image
                                    source={{ uri: item.picture.medium }}
                                    style={styles.itemImage}
                                />

                                <View style={{ flexDirection : 'column' }}>
                                    <Text style={styles.itemTitle}>{item.name.first + ' ' + item.name.last}</Text>
                                    <Text style={[styles.itemTitle, { fontSize: 13 }]}>Toca para más detalles</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    itemContainer: {
        //Estilos para el itemContainer
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        marginBottom: 1
    },
    itemTitle: {
        fontSize: 20,
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        marginLeft: 10,
        color: 'white'
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    male: {
        backgroundColor: '#0093bf'
    },
    female: {
        backgroundColor: '#cf0092'
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    }
});