import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
} from '@material-ui/core';

import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Face as FaceIcon,
    Dns as DnsIcon,
    Label as LabelIcon,
    ArrowBack as ArrowBackIcon,
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
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        color: '#333',
        width: '100%',
    }
}

class App extends React.Component {
    state = {
        items: [
            { id: 1, name: 'Foo', des: 'Foo description' },
            { id: 2, name: 'Bar', des: 'Bar description' },
        ],
        drawer: false,
        back: false,
    };

    openDrawer = () => this.setState({drawer: true});
    closeDrawer = () => this.setState({drawer: false});
    back = () => this.setState({back: true});

    render() {
        return (
            <Router>
                <div>
                    <Drawer open={this.state.drawer} onClose={this.closeDrawer}>
                        <div style={styles.header}></div>
                        <List>
                            <ListItem button onClick={this.closeDrawer}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <Link style={styles.link} to='/'>Home</Link>
                            </ListItem>
                            <ListItem button onClick={this.closeDrawer}>
                                <ListItemIcon>
                                    <FaceIcon />
                                </ListItemIcon>
                                <Link style={styles.link} to='/user'>User</Link>
                            </ListItem>
                            <ListItem button onClick={this.closeDrawer}>
                                <ListItemIcon>
                                    <DnsIcon />
                                </ListItemIcon>
                                <Link style={styles.link} to='/items' onClick={this.hideDrawer}>Items</Link>
                            </ListItem>
                        </List>
                    </Drawer>

                    <AppBar position="static">
                        <Toolbar>
                            {this.state.back ?
                                <Link to='/items' onClick={() => {
                                    this.setState({back: false})
                                }}>
                                    <IconButton edge="start" color="inherit">
                                        <ArrowBackIcon style={{color: 'white'}} />
                                    </IconButton>
                                </Link>
                            :
                                <IconButton edge="start" color="inherit" onClick={this.openDrawer}>
                                    <MenuIcon />
                                </IconButton>
                            }
                            <Typography variant="h6" color="inherit">
                                My App
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/user" component={User} />
                        <Route path="/items" render={() => (
                            <Items items={this.state.items} back={this.back} />
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

const Home = props => <h1 style={styles.content}>Home</h1>;
const User = props => <h2 style={styles.content}>User</h2>;
const Items = props => (
    <List>
        {props.items.map(item => {
            return (
                <ListItem key={item.id} button onClick={props.back}>
                    <ListItemIcon>
                        <LabelIcon />
                    </ListItemIcon>
                    <Link style={styles.link} to={`/view/${item.id}`}>
                        <ListItemText primary={item.name}></ListItemText>
                    </Link>
                </ListItem>
            )
        })}
    </List>
);
const View = props => (
    <div style={styles.content}>
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
    </div>
);

export default App;
