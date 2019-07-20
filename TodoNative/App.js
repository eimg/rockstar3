import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
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
            <TouchableOpacity onPress={this.add}>
                <MaterialIcons
                    name='check-box-outline-blank' size={32} color='white' />
            </TouchableOpacity>
            <Text style={styles.itemText}>
                {item.subject}
            </Text>
            <TouchableOpacity onPress={this.add}>
                <MaterialIcons
                    name='delete' size={32} color='#a567ff' />
            </TouchableOpacity>
        </View>
    );

    _renderDone = ({item}) => (
        <View style={{...styles.item, ...styles.done}}>
            <TouchableOpacity onPress={this.add}>
                <MaterialIcons
                    name='check-box' size={32} color='white' />
            </TouchableOpacity>
            <Text style={{...styles.itemText, ...styles.itemTextDone}}>
                {item.subject}
            </Text>
            <TouchableOpacity onPress={this.add}>
                <MaterialIcons
                    name='delete' size={32} color='#a567ff' />
            </TouchableOpacity>
        </View>
    );

    add = () => {
        this.setState({
            data: [
                ...this.state.data,
                { _id: "3", subject: this.state.text }
            ],
            text: ''
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Native Todo
                    </Text>
                    <TouchableOpacity onPress={this.add}>
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
            </View>
        )
    }
}

export default App;
