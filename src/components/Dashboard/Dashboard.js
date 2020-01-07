import React, { Component } from "react";
import Product from "../Product/Product";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      inventory: []
    };
  }
  componentDidMount() {
    this.getInventory();
  }
  // * axios methods * //

  getInventory = () => {
    axios
      .get("/api/inventory")
      .then(res => this.setState({ inventory: res.data }))
      .catch(err => console.log(err));
  };
  // * Giving me a Get 500 error at Dashboard.js 20. Check Server with Postman to double check?? //

  deleteProduct = id => {
    axios.delete(`/api/product/${id}`).then(() => {
      this.getInventory();
    });
  };

  render() {
    return (
      <ul>
        {this.state.inventory.map((el, i) => {
          return (
            <Product
              selectItem={this.props.selectItem}
              deleteProduct={this.deleteProduct}
              key={i}
              item={el}
            />
          );
        })}
      </ul>
    );
  }
}

export default Dashboard;
