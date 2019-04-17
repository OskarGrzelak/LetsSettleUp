import React, { Component } from 'react';

class Input extends Component {
    state = {
        valid: false
    }

    validateInput = (e, type) => {
        let valid = false;
        switch (type) {
            case 'number':
                valid = (e.target.value !== '');
                break;
            case 'text':
                valid = (e.target.value !== '');
                break;
        }
        this.setState({valid: valid});
    }

    render() {
        const style = this.state.valid ? {border: '2px solid green'} : {border: '2px solid transparent'};
        return <input 
                    type={this.props.type} 
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    style={style} 
                    onChange={(e) => this.validateInput(e, this.props.type)}
                    onChange={this.props.updateTitle} />
    }
}

export default Input;