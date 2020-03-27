import React, {Component} from 'react';

export class WishlistCreator extends Component{
    constructor(props){
        super(props);
        this.state = {
            newItemText:""
        }
    }
    updateNewTextValue = (event) => this.setState({newItemText: event.target.value});
    
    createNewWant = () => {
        this.props.callback(this.state.newItemText);
        this.setState({newItemText:""});
    }
    render = () =>
    <div className="form-control">
    <input className="form-control" value={this.state.newItemText} onChange={this.updateNewTextValue}/>
    <button className="btn btn-primary mt-1" onClick={this.createNewWant}>Add</button>
    </div>
}