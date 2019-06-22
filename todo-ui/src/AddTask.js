import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
    input: {
        flex: 1,
        paddingLeft: 10
    },
    paper: {
        display: 'flex'
    }
}

const AddTask = props => {
    let input = React.createRef();

    return (
        <Paper style={styles.paper}>
            <InputBase placeholder="New Task" inputRef={input} style={styles.input} />
            <IconButton onClick={() => {
                props.add(input.current.value);
                input.current.value = "";
                input.current.focus();
            }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default AddTask;
