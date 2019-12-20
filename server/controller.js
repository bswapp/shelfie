module.exports = {
  getProducts: (req, res) => {
    const db = req.app.get("db");
    db.get_products()
      .then(products => res.status(200).send(products))
      .catch(error => console.log(err));
  },

  getProduct: (req, res) => {
    const db = req.app.get("db"),
      { id } = req.params;
    db.get_product(id)
      .then(product => res.status(200).send(product))
      .catch(error => console.log(error));
  },

  addProduct: (req, res) => {
    const db = req.app.get("db"),
      { name, price, image } = req.body;
    db.add_product(name, price, image)
      .then(products => {
        res.sendStatus(200);
      })
      .catch(error => console.log(error));
  },

  deleteProduct: (req, res) => {
    const db = req.app.get("db"),
      { id } = req.params;
    db.delete_product(id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(error => res.status(500).send(console.log(error)));
  },

  editProduct: (req, res) => {
    const db = req.app.get("db"),
      { id } = req.params,
      { name, price, image } = req.body;
    db.edit_product(id, name, price, image)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(error => res.status(500).send(error));
  }
};
