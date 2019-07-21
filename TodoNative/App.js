import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    AppRegistry,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#6200ee',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    itemText: {
        marginLeft: 20,
        fontSize: 23,
        color: '#fff',
        flex: 1,
    },
    itemTextDone: {
        color: '#ccc',
    },
    add: {
        flexDirection: 'row',
        backgroundColor: '#a567ff',
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        padding: 10,
        fontSize: 21,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
        color: '#fff',
    },
    done: {
        backgroundColor: '#4c00b8',
    }
});

class App extends React.Component {
    api = 'http://192.168.100.6:8000/tasks';
    state = {
        data: []
    }

    componentWillMount() {
        fetch(this.api).then(res => res.json()).then(json => {
            this.setState({
                data: json
            })
        });
    }

    _keyExtractor = (item, index) => item._id;

    _renderTask = ({item}) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => {
                this.done(item._id);
            }}>
                <MaterialIcons
                    name='check-box-outline-blank' size={32} color='white' />
            </TouchableOpacity>
            <Text style={styles.itemText}>
                {item.subject}
            </Text>
            <TouchableOpacity onPress={() => {
                this.remove(item._id);
            }}>
                <MaterialIcons
                    name='delete' size={32} color='#a567ff' />
            </TouchableOpacity>
        </View>
    );

    _renderDone = ({item}) => (
        <View style={{...styles.item, ...styles.done}}>
            <TouchableOpacity onPress={() => {
                this.undo(item._id);
            }}>
                <MaterialIcons
                    name='check-box' size={32} color='white' />
            </TouchableOpacity>
            <Text style={{...styles.itemText, ...styles.itemTextDone}}>
                {item.subject}
            </Text>
            <TouchableOpacity onPress={() => {
                this.remove(item._id);
            }}>
                <MaterialIcons
                    name='delete' size={32} color='#a567ff' />
            </TouchableOpacity>
        </View>
    );

    add = () => {
        fetch(this.api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: this.state.text
            })
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                data: [ ...this.state.data, json ],
                text: ''
            });
        });
    }

    remove = (_id) => {
        fetch(`${this.api}/${_id}`, {
            method: 'delete'
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                data: this.state.data.filter(item => item._id !== _id)
            });
        });
    }

    done = (_id) => {
        fetch(`${this.api}/${_id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 1 })
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                data: this.state.data.map(item => {
                    if(item._id === _id) item.status = 1;
                    return item;
                })
            });
        });
    }

    undo = (_id) => {
        fetch(`${this.api}/${_id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 0 })
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                data: this.state.data.map(item => {
                    if(item._id === _id) item.status = 0;
                    return item;
                })
            });
        });
    }

    clear = () => {
        fetch(this.api, {
            method: 'delete'
        }).then(() => {
            this.setState({
                data: this.state.data.filter(item => item.status === 0)
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Native Todo
                    </Text>
                    <TouchableOpacity onPress={this.clear}>
                        <MaterialIcons name='clear-all' size={32} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={styles.add}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <TouchableOpacity onPress={this.add}>
                        <MaterialIcons name='add' size={32} color='white' />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <FlatList
                        data={this.state.data.filter(item => item.status === 0)}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderTask}
                    />

                    <FlatList
                        data={this.state.data.filter(item => item.status === 1)}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderDone}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default App;
AppRegistry.registerComponent('App', () => App);
