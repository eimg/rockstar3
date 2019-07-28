import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

class App extends React.Component {
    state = {
        items: [
            { id: 1, name: 'Foo', des: 'Foo description' },
            { id: 2, name: 'Bar', des: 'Bar description' },
        ]
    };

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/user'>User</Link></li>
                        <li><Link to='/items'>Items</Link></li>
                    </ul>
                    <div style={{border: '1px solid black', padding: 20}}>
                        <Route exact path="/" component={Home} />
                        <Route path="/user" component={User} />
                        <Route path="/items" render={() => (
                            <Items items={this.state.items}/>
                        )} />
                        <Route path="/view/:id" render={props => (
                            <View item={this.state.items.find(item => {
                                return item.id === parseInt(props.match.params.id);
                            })} />
                        )} />
                    </div>
                </div>
            </Router>
        );
    }
}

const Home = props => <h1>Home</h1>;
const User = props => <h2>User</h2>;
const Items = props => (
    <ul>
        {props.items.map(item => {
            return (
                <li key={item.id}>
                    <Link to={`/view/${item.id}`}>
                        {item.name}
                    </Link>
                </li>
            )
        })}
    </ul>
);
const View = props => (
    <div>
        <h4>{props.item.id} - {props.item.name}</h4>
        <div>{props.item.des}</div>
    </div>
);

export default App;
