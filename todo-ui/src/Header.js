import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = {
    title: {
        marginLeft: 20,
        flex: 1
    }
}

class Header extends React.Component {
    state = {
        anchorEl: null,
        menu: false
    }

    showMenu = (e) => {
        this.setState({
            anchorEl: e.currentTarget,
            menu: true
        });
    }

    hideMenu = () => {
        this.setState({
            menu: false
        });
    }

    clear = () => {
        this.props.clear();
        this.hideMenu();
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Badge badgeContent={this.props.count} color="secondary">
                        <LineWeightIcon />
                    </Badge>
                    <Typography variant="h6" style={styles.title}>
                        Todo List
                    </Typography>
                    <IconButton color="inherit" onClick={this.showMenu}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={this.state.menu}
                        onClose={this.hideMenu}>
                        <MenuItem onClick={this.clear}>Clear All Done</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
