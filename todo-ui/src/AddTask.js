import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const styles = {
    input: {
        flex: 1
    },
    paper: {
        display: 'flex',
        paddingLeft: 15,
        paddingRight: 15
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
                <AddIcon />
            </IconButton>
        </Paper>
    );
}

export default AddTask;
