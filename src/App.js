import React, {Component} from 'react';
import {WishlistBanner} from "./WishlistBanner";
import {WishlistRow} from "./WishlistRow";
import {WishlistCreator} from "./WishlistCreator";
import {VisibilityControl} from "./VisibilityControl";

export default class App extends Component{
constructor(props){
  super(props);
  this.state={
    userName:"Abz",
    wishlistItems: [
      {
        want: "wedding dress",
        recieved: false
      },
      {
        want:"Engagement subscription box",
        recieved: false
      },
      {
        want:"Engagement Ring",
        recieved:true
      }
    ],
    showRecieved:true
  }
}//end constructor

//I dont understand what this does
updateNewTextValue = (event) => {
  this.setState({newItemText:event.target.value});
}

//this adds the new wish to the wishlist
createNewWant=(wish)=>{
  if(!this.state.wishlistItems.find(x=>x.action===wish)){
    this.setState({
      wishlistItems:[
        ...this.state.wishlistItems,
        {
          //do the next 2 have to be different
          want: wish,
          recieved: false
        }
      ]
    },
     ()=>localStorage.setItem("wants", JSON.stringify(this.state))
    )
  }
}

//calling on the wishlist row component (child component) to make the table
wishlistTableRows=(recievedValue)=> this.state.wishlistItems.filter(item=>item.recieved===recievedValue).map(item=>
  <WishlistRow key={item.want} item={item} callback={this.toggleRecieved}/>
  );

//I dont know what this does
toggleRecieved = (wish)=> this.setState(
  {
    wishlistItems: this.state.wishlistItems.map(item=>item.want===wish.want?{...item, recieved:!item.recieved}:item)
  },
   ()=>localStorage.setItem("wants", JSON.stringify(this.state))
);

//save what we add to how the browser does stuff with cookies
componentDidMount=()=>{
  let data = localStorage.getItem("wants");
  this.setState(
    data != null?JSON.parse(data):
    {
      userName:"Abz",
      wishlistItems: [
        {
          want: "wedding dress",
          recieved: false
        },
        {
          want:"Engagement subscription box",
          recieved: false
        },
        {
          want:"Engagement Ring",
          recieved:true
        }
      ],
      showRecieved:true
    }
  )
}

render (){
  return(
    <div>
      <WishlistBanner name={this.state.userName} want={this.state.wishlistItems}/>
      <div className="container-fluid">
        <WishlistCreator callback={this.createNewWant}/>
        <table className="table table-striped table bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Recieved</th>
            </tr>
          </thead>
          <tbody>
            {this.wishlistTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Recieved Items" isChecked={this.state.showRecieved} callback={(checked)=>this.setState({showRecieved:checked})}/>
        </div>
        {this.state.showRecieved &&
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Recieved</th>
            </tr>
          </thead>
          <tbody>
            {this.wishlistTableRows(true)}
          </tbody>
          </table>
          }
      </div>
    </div>
  );
}

};