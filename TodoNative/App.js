import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Button,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    item: {
        padding: 20,
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 23
    },
    input: {
        padding: 10,
        fontSize: 21,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
});

class App extends React.Component {
    state = {
        data: [
            { _id: '1', subject: 'Milk' },
            { _id: '2', subject: 'Milo'},
        ]
    }

    _keyExtractor = (item, index) => item._id;

    _renderItem = ({item}) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>
                {item.subject}
            </Text>
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
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <Button onPress={this.add} title="Add" />
                </View>

                <FlatList
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

export default App;
