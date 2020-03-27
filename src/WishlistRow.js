import React, {Component} from 'react';

export class WishlistRow extends Component{
    render = () =>
    <tr>
        <td>{this.props.item.want}</td>
        <td>
            <input type="checkbox" checked={this.props.item.recieved} onChange={() =>this.props.callback(this.props.item)}/>
        </td>
    </tr>
}