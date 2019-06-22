import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = {
    title: {
        marginLeft: 20,
        flex: 1
    }
}

const Header = props => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Badge badgeContent={props.count} color="secondary">
                    <LineWeightIcon />
                </Badge>
                <Typography variant="h6" style={styles.title}>
                    Todo List
                </Typography>
                <IconButton color="inherit">
                    <MoreVertIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
