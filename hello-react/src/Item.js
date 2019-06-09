import React from "react";

class Item extends React.Component {
    render() {
        return (
            <li>{this.props.name}</li>
        )
    }
}

export default Item;
