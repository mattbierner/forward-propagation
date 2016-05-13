"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

class Site extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

   

    render() {
        return (
            <div id="main">
            </div>);
    }
};


ReactDOM.render(
    <Site choices={texts} />,
    document.getElementById('target'));
