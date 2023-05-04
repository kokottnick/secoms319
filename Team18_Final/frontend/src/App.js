/*
 * @author Kenneth Schueman & Nick Kokott
 */

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import React, { useState, useEffect } from "react";

//Navbar sends user to desired section of webpage
const Navbar = ({ onViewChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          Video Game Central
        </a>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a
                className="nav-link text-white"
                aria-current="page"
                href="#"
                onClick={() => onViewChange("products")}
              >
                Products
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="#"
                onClick={() => onViewChange("about")}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="#"
                onClick={() => onViewChange("productEdit")}
              >
                Catalog Edit
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mr-auto text-white"
                href="#"
                onClick={() => onViewChange("cart")}
              >
                Shopping Cart 🛒
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const ProductGrid = ({ Products, onAddToCart, onRemoveOneFromCart }) => {
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleIncrement = (itemId) => {
    setQuantities({ ...quantities, [itemId]: (quantities[itemId] || 0) + 1 });
  };

  const handleDecrement = (itemId) => {
    const newQuantities = { ...quantities };
    newQuantities[itemId]--;
    if (newQuantities[itemId] < 0) {
      newQuantities[itemId] = 0;
    }
    setQuantities(newQuantities);
  };

  const filteredProducts = Products.filter((item) => {
    return item.productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function adder(item) {
    onAddToCart({ ...item, quantity: (quantities[item._id] || 0) + 1 });
    handleIncrement(item._id);
  }

  function subtractor(item) {
    onRemoveOneFromCart({
      ...item,
      quantity: (quantities[item._id] || 0) - 1,
    });
    handleDecrement(item._id);
  }

  return (
    <div>
      <div
        className="d-flex justify-content-center mb-4"
        style={{ paddingTop: 1 + "rem" }}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search games by title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map((item) => (
          <div className="col" key={item._id}>
            <div className="card">
              <img
                src={item.url}
                className="card-img-top"
                alt={item.productName}
              />
              <div className="card-body">
                <h5 className="card-title">{item.productName}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text green">
                  ${item.price}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Developer: {item.developer} <br />
                    Game type: {item.gameType} <br />
                    Size: {item.size} <br />
                    Release date: {item.releaseDate} <br />
                    Rating: {item.rating.rate} ({item.rating.count})
                  </small>
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => adder(item)}
                    >
                      Add to Cart (+)
                    </button>
                    <span className="fs-5">{quantities[item._id] || 0}</span>
                  </div>
                  <div>
                    {/*Plus and Minus Buttons*/}
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => subtractor(item)}
                    >
                      -
                    </button>
                    {/*<button className="btn btn-secondary" onClick={() => handleIncrement(iten.id)}>+</button>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="container mt-3">
      <h4>Created By:</h4>
      <h5>Kenneth Schueman - Backend Development</h5>
      <h5>Nick Kokott - Fontend Development</h5>
      <p>Online marketplace developed for SE/COMS 319 assignmnet 2</p>
    </div>
  );
};

function Cart({ cart, cartTotal, onRemoveFromCart, onViewChange }) {
  return (
    <div style={{ paddingTop: 1 + "rem" }}>
      <button
        className="btn btn-danger"
        onClick={() => onViewChange("products")}
      >
        <i className="bi bi-arrow-return-left" /> Return
      </button>
      <div className="cart-section fixed">
        {/* Cart content here */}
        <div className="form-wrapper" id="form-wrapper">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h1>View Your Cart</h1>
              <div className="cartItems">
                {cart.length > 0 ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => onRemoveFromCart(item._id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="total-price">Total: ${cartTotal}</div>
                    <small>
                      * To keep current cart items select the "Products" option
                      for navbar
                    </small>
                    <br />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => onViewChange("payment")}
                    >
                      <i className="bi bi-arrow-return-left" /> Procced to Payment
                    </button>
                  </>
                ) : (
                  <p style={{ color: "#ff0000" }}>Your cart is empty</p>
                )}
              </div>
            </div>
            {/*Footer*/}
            <footer className="bd-footer py-4 py-md-5 mt-5">
              <div className="container py-4 py-md-5 px-4 px-md-3">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <b>Video Games Central</b>
                    <p>Developed by: Kenneth Schueman & Nick Kokott</p>
                    <p>Assignment 2 - SE/COMS 319</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Payment({ onViewChange }) {
  
  return (
    <div>
      {/* Payment Forum */}
      <h1 style={{ paddingTop: 5 + "rem" }}>Payment Information</h1>

      <div id="liveAlertPlaceholder"></div>

      <form className="row g-3" id="checkout-form">
        <div className="col-md-6">
          <label for="inputName" className="form-label" name="inputName">
            Full Name
          </label>
          <input type="text" className="form-control" id="inputName" name="fullName" required />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Must be like, "John Doe"</div>
        </div>

        <div className="col-md-6">
          <label for="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Must be like, "abc@xyz.efg"</div>
        </div>

        <div className="col-12">
          <label for="inputCard" className="form-label">
            Card
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi-credit-card-fill"></i>
            </span>
            <input
              type="text"
              id="inputCard"
              className="form-control"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              aria-label="Username"
              aria-describedby="basic-addon1"
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">
              Must be like, "7777-7777-7777-7777"
            </div>
          </div>
        </div>

        <div className="col-12">
          <label for="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            required
          />
        </div>
        <div className="col-12">
          <label for="inputAddress2" className="form-label">
            Address 2
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-md-6">
          <label for="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" required />
        </div>
        <div className="col-md-6">
          <label for="inputState" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="inputState"
            required
          />
        </div>
        <div className="col-md-2">
          <label for="inputZip" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" id="inputZip" required />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => {
              onViewChange("confirmation");
            }}>
            {" "}
            <i className="bi-bag-check"></i> Order
          </button>
        </div>
      </form>
    </div>
  );
}

function Confirmation({ cart, cartTotal, onViewChange }) {

  return (
    <div style={{ paddingTop: 1 + "rem" }}>
      <button
        className="btn btn-danger"
        onClick={() => onViewChange("products")}
      >
        <i className="bi bi-arrow-return-left" /> Return
      </button>
      <div className="cart-section fixed">
        {/* Cart content here */}
        <div className="form-wrapper" id="form-wrapper">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h1>Order Confirmation</h1>
              <div className="cartItems">
                {cart.length > 0 ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="total-price">Total: ${cartTotal}</div>
                    <h2 style={{ paddingTop: 2 + "rem" }}>
                      Thank you for your purchase!
                    </h2>
                    <p>
                      An email confirmation has been sent.
                    </p>
                    {/* <p>Your order will email will be sent as soon as possible.</p> */}
                    {/* <p>Total: ${cartTotal.toFixed(2)}</p> */}
                    <div className="col-12" style={{ paddingTop: 10 + "rem" }}>
                      <button type="submit" className="btn btn-success">
                        {" "}
                        <i className="bi bi-bag-check"></i>
                        <a className="navbar-brand" href="/">
                          {" "}
                          Confirm my order!
                        </a>
                      </button>
                      <br />
                      <small>
                        *Warning, this will bring you to a fresh webpage
                      </small>
                    </div>
                  </>
                ) : (
                  <div>
                    <p style={{ color: "#ff0000" }}>
                      Your cart is empty you can not place an order
                    </p>
                    <small>*Please select the return button</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Footer*/}
      <footer className="bd-footer py-4 py-md-5 mt-5 ">
        <div className="container py-4 py-md-5 px-4 px-md-3">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <b>Video Games Central</b>
              <p>Developed by: Kenneth Schueman & Nick Kokott</p>
              <p>Assignment 2 - SE/COMS 319</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductEdit({ product }) {
  //const [oneProduct, setOneProduct] = useState([]);
  //const [viewer2, setViewer2] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [viewer4, setViewer4] = useState(false);

  const [addNewProduct, setAddNewProduct] = useState({
    _id: "",
    productName: "",
    size: "",
    developer: "",
    gameType: "",
    description: "",
    price: "",
    releaseDate: "",
    url: "",
    rating: "",
  });

  // function getOneProduct(id) {
  //   console.log(id);
  //   if (id >= 1 && id <= 20) {
  //     fetch("http://localhost:4000/" + id)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Show one product :", id);
  //         console.log(data);
  //         const dataArr = [];
  //         dataArr.push(data);
  //         setOneProduct(dataArr);
  //       });
  //     setViewer2(!viewer2);
  //   } else {
  //     console.log("Wrong number of Product id.");
  //   }
  // }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "productName") {
      setAddNewProduct({ ...addNewProduct, productName: value });
    } else if (evt.target.name === "size") {
      setAddNewProduct({ ...addNewProduct, size: value });
    } else if (evt.target.name === "developer") {
      setAddNewProduct({ ...addNewProduct, developer: value });
    } else if (evt.target.name === "gameType") {
      setAddNewProduct({ ...addNewProduct, gameType: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "releaseDate") {
      setAddNewProduct({ ...addNewProduct, releaseDate: value });
    } else if (evt.target.name === "url") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, url: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  // const showOneItem = oneProduct.map((el) => (
  //   <div key={el._id}>
  //     <img src={el.image} width={30} /> <br />
  //     Title: {el.title} <br />
  //     Category: {el.category} <br />
  //     Price: {el.price} <br />
  //     Rate :{el.rating.rate} and Count:{el.rating.count} <br />
  //   </div>
  // ));

  return (
    <div>
      <div>
        <h3>Add a new product :</h3>
        <form action="">
          <input
            required
            type="number"
            placeholder="id?"
            name="_id"
            value={addNewProduct._id}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="title?"
            name="productName"
            value={addNewProduct.productName}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="developer?"
            name="developer"
            value={addNewProduct.developer}
            onChange={handleChange}
          />
          <input
            required
            type="number"
            placeholder="price?"
            name="price"
            value={addNewProduct.price}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="description?"
            name="description"
            value={addNewProduct.description}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="game type?"
            name="gameType"
            value={addNewProduct.gameType}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="size?"
            name="size"
            value={addNewProduct.size}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="release date?"
            name="releaseDate"
            value={addNewProduct.releaseDate}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="image?"
            name="url"
            value={addNewProduct.url}
            onChange={handleChange}
          />
          <input
            required
            type="number"
            placeholder="rate?"
            name="rate"
            value={addNewProduct.rating.rate}
            onChange={handleChange}
          />
          <input
            required
            type="number"
            placeholder="count?"
            name="count"
            value={addNewProduct.rating.count}
            onChange={handleChange}
          />
          <br />
          <button type="submit" onClick={handleOnSubmit}>
            submit
          </button>
        </form>
      </div>

      <div>
        <h3>Delete one product:</h3>
        <input
          type="checkbox"
          id="acceptdelete"
          name="acceptdelete"
          checked={checked4}
          onChange={(e) => setChecked4(!checked4)}
        />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(product[index]._id)}>
          Delete
        </button>
        {checked4 && (
          <div key={product[index]._id}>
            <img
              src={product[index].url}
              width={100}
              style={{ paddingTop: 1 + "rem" }}
            />{" "}
            <br />
            Id: {product[index]._id} <br />
            Title: {product[index].productName} <br />
            developer: {product[index].developer} <br />
            Price: {product[index].price} <br />
            description: {product[index].description} <br />
            Game Type: {product[index].gameType} <br />
            Size: {product[index].size} <br />
            Release Date: {product[index].releaseDate} <br />
            Rate: {product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        )}
        <div style={{ paddingTop: 1 + "rem" }}>
          <button type="submit" className="btn btn-success">
            {" "}
            <i className="bi bi-bag-check"></i>
            <a className="navbar-brand" href="/">
              {" "}
              Save
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState("products");
  const [cartItems, setCartItems] = useState([]);
  const [checked4, setChecked4] = useState(false);
  
  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleAddToCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item._id === product._id);
    if (itemIndex === -1) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      const newCartItems = [...cartItems];
      newCartItems[itemIndex].quantity++;
      setCartItems(newCartItems);
    }
  };

  const handleRemoveOneFromCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item._id === product._id);
    if (itemIndex === -1) {
      // The item does not exist in the cart, so there's nothing to remove
      return;
    }
    const newCartItems = [...cartItems];
    newCartItems[itemIndex].quantity--;
    if (newCartItems[itemIndex].quantity === 0) {
      newCartItems.splice(itemIndex, 1);
    }
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(newCartItems);
  };

  const calculateTotal = () => {
    let t = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return t;
  };

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
  }
  
  return (
    <div>
      <Navbar onViewChange={handleViewChange} cartItems={cartItems} />
      <div className="container">
        {view === "products" && (
          <ProductGrid
            Products={product}
            onAddToCart={handleAddToCart}
            onRemoveOneFromCart={handleRemoveOneFromCart}
          />
        )}
        {view === "about" && <About />}
        {view === "productEdit" && (
          <ProductEdit product={product} onViewChange={handleViewChange} />
        )}
        {view === "cart" && (
          <Cart
            cart={cartItems}
            cartTotal={calculateTotal()}
            onRemoveFromCart={handleRemoveFromCart}
            onViewChange={handleViewChange}
          />
        )}
        {view === "payment" && (
          <Payment 
            onViewChange={handleViewChange}
          />
        )}
        {view === "confirmation" && (
          <Confirmation
            cart={cartItems}
            cartTotal={calculateTotal()}
            onViewChange={handleViewChange}
          />
        )}
      </div>
    </div>
  );
} // App end

export default App;
