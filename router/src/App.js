import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
} from '@material-ui/core';

import {
    Menu as MenuIcon,
} from '@material-ui/icons';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const styles = {
    header: {
        height: 100,
        width: 300,
        background: '#aaa'
    },
    content: {
        padding: 20
    }
}

class App extends React.Component {
    state = {
        items: [
            { id: 1, name: 'Foo', des: 'Foo description' },
            { id: 2, name: 'Bar', des: 'Bar description' },
        ],
        drawer: false
    };

    openDrawer = () => this.setState({drawer: true});
    closeDrawer = () => this.setState({drawer: false});

    render() {
        return (
            <Router>
                <div>
                    <Drawer open={this.state.drawer} onClose={this.closeDrawer}>
                        <div style={styles.header}></div>
                        <List>
                            <ListItem button onClick={this.closeDrawer}>
                                <Link to='/'>Home</Link>
                            </ListItem>
                            <ListItem button onClick={this.closeDrawer}>
                                <Link to='/user'>User</Link>
                            </ListItem>
                            <ListItem button onClick={this.closeDrawer}>
                                <Link to='/items' onClick={this.hideDrawer}>Items</Link>
                            </ListItem>
                        </List>
                    </Drawer>

                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.openDrawer}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                My App
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div style={styles.content}>
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
    <List>
        {props.items.map(item => {
            return (
                <ListItem key={item.id} button>
                    <Link to={`/view/${item.id}`}>
                        <ListItemText primary={item.name}></ListItemText>
                    </Link>
                </ListItem>
            )
        })}
    </List>
);
const View = props => (
    <Card>
        <CardContent>
            <Typography variant="h5">
                {props.item.id} - {props.item.name}
            </Typography>
            <Typography variant="body">
                {props.item.des}
            </Typography>
        </CardContent>
    </Card>
);

export default App;
