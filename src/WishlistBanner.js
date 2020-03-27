import React, {Component} from 'react';

export class WishlistBanner extends Component{
    render = () =>
    <h4 className="bg-primary text-white text-center p-2">
        {this.props.name}'s WishlistBanner
        ({this.props.want.filter(w=>!w.recieved).length} items left)
    </h4>
}