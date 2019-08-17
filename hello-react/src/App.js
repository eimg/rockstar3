import React from "react";
import List from "./List";
import Header from "./Header";

class App extends React.Component {
    state = {
        data: ['Bob', 'Alice', 'Tom']
    };

    input = React.createRef();

    add = () => {
        this.setState({
            data: [...this.state.data, this.input.current.value],
        });
    }

    render() {
        return (
            <div>
                <Header />
                <List data={this.state.data} />
                <input type="text" ref={this.input} />
                <button onClick={this.add}>+</button>
            </div>
        );
    }
}

export default App;
