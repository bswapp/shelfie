import React, { Component } from "react";
import "./Form.css";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      name: "",
      price: "",
      img:
        "https://t3.ftcdn.net/jpg/02/03/65/94/240_F_203659482_n1ur56bmpbs5z5EONuXNWYkJtwIsrTTV.jpg"
    };
  }

  componentDidMount() {
    if (this.state.image) {
      this.setState({ preview: this.state.img });
    }
    if (this.props.location.state) {
      this.selectedEdit(this.props.location.id);
    }
  }

  componentDidUpdate(lastprops) {
    if (lastprops.location.pathname !== this.props.location.pathname) {
      this.clearInput();
    }
  }

  getInventory = () => {
    axios
      .get("/api/inventory")
      .then(res => this.setState({ inventory: res.data }));
  };

  selectedEdit = id => {
    axios.get(`/api/product/${id}`).then(res => {
      const { name, price, img } = res.data[0];
      this.setState({
        name,
        price,
        image: img,
        imagepreview: img
      }).then(this.getInventory());
    });
  };

  editItem = () => {
    axios
      .put(`/api/product/${this.props.location.state.id}`, {
        name: this.state.name,
        price: this.state.price,
        image: this.state.image
      })
      .then(this.getInventory())
      .catch(err => console.log(err));
  };

  handleNameChange = name => {
    this.setState({ name });
  };

  handlePriceChange = price => {
    this.setState({ price });
  };

  onError = () => {
    this.setState({
      img:
        "https://t3.ftcdn.net/jpg/02/03/65/94/240_F_203659482_n1ur56bmpbs5z5EONuXNWYkJtwIsrTTV.jpg"
    });
  };

  handleImageChange = img => {
    img
      ? this.setState({ image: img, img: img })
      : this.setState({
          img:
            "https://t3.ftcdn.net/jpg/02/03/65/94/240_F_203659482_n1ur56bmpbs5z5EONuXNWYkJtwIsrTTV.jpg"
        });
  };

  addToDatabase = () => {
    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image
        ? this.state.image
        : "https://t3.ftcdn.net/jpg/02/03/65/94/240_F_203659482_n1ur56bmpbs5z5EONuXNWYkJtwIsrTTV.jpg"
    };
  };

  clearInput = () => {
    this.setState({ name: "", price: "", image: "" });

    axios
      .post("/api/product", newProduct)
      .then(res => {
        console.log(res);
        this.clearInput();
      })
      .catch(err => console.log(`client side err: ${err}`));
    this.clearInput();
  };

  clearInput = () => {
    this.setState({ name: "", price: "", image: "" });
  };

  render() {
    return (
      <div className="form">
        <div className="input-holder">
          <input placeholder="image"></input>
          <input placeholder="name"></input>
          <input placeholder="price"></input>
        </div>
        <div className="button-holder">
          <button>Add</button>
          <button>Cancel</button>
        </div>
      </div>
    );
  }
}

export default Form;
