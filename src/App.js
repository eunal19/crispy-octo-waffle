// IMPORTS ------------------------------------------------------

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Cart } from "./components/Cart";
import { FullProductPage } from "./components/FullProductPage";
import { List } from "./components/List";
import { NavbarComponent } from "./components/NavbarComponent";

// APP ----------------------------------------------------------

const App = () => {
  //     products: This state variable holds an array representing the products. It is initialized with an empty array.
  //  setProducts: This is the function used to update the products state.
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);


  // This will work only one time for fetching data and setting the document title once
  useEffect(() => { fetchProducts(); document.title = activeCategory; }, []);

  // This will work whenever active category and quantity changes
  useEffect(() => { document.title = `${activeCategory} (${favorites.length})`; }, [activeCategory, favorites]);


  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products"); // The await keyword is used to wait for the response. Make a GET request to the API endpoint   
    const data = await res.json();  // This line also uses await to wait for the JSON parsing to complete. Parse the response body as JSON.
    setProducts(data); // Update the state with the fetched product data
    getCategories(data); // This function likely extracts unique categories from the product data and updates the categories state. Extract and set categories based on the fetched data.
  };

  const getCategories = (data) => {
    // This code uses a Set to ensure that only unique categories are included. The reduce function is used to iterate over the product data and collect the unique categories. The initial value of the accumulator is set to ["ALL"] to ensure that "ALL" is included as a category.
    const allCategories = [
      ...new Set(
        data.reduce(
          (acc, item) => {
            acc.push(item.category);
            return acc;
          },
          ["ALL"]
        )
      ),
    ];
    // After extracting the unique categories, the setCategories function is called to update the categories state with the new array of categories.
    setCategories(allCategories);
  };


  const addToCart = (id) => {
    const ifExists = cart.some((product) => product.id === id); // Check if the product with the given id already exists in the cart
    if (!ifExists) {
      // If the product doesn't exist in the cart, add a new entry with quantity 1
      const newProduct = products.find((product) => product.id === id);
      setCart([...cart, { ...newProduct, quantity: 1 }]);
    } else {
      // If the product already exists in the cart, update the quantity
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    }
    // Log the updated cart to the console
    console.log(cart);
  };



  const updateQuantity = (id, num) => {
    // Create a new cart array with updated quantity for the specified product
    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity = num;
      }
      return item;
    });
    // Update the cart state with the new cart array
    setCart(newCart);
  };



  const toggleFavorites = (productId) => {
    // Check if the product with the given id already exists in favorites
    const ifExists = favorites.some((product) => product.id === productId);
    if (ifExists) {
      // If the product exists in favorites, remove it
      const newFavorites = favorites.filter(
        (product) => product.id !== productId
      );
      setFavorites(newFavorites);
    } else {
      // If the product doesn't exist in favorites, add it
      const newFavProduct = products.find(
        (product) => product.id === productId
      );
      const arr = [...favorites, newFavProduct];
      setFavorites(arr);
    }
  };



  const deleteFromCart = (id) => {
    // Create a new cart array without the product with the specified id
    const newCart = cart.filter((item) => item.id !== id);
    // Update the cart state with the new cart array
    setCart(newCart);
  };



  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <NavbarComponent
            setActiveCategory={setActiveCategory}
            categories={categories}
            activeCategory={activeCategory}
            cart={cart}
          />
        </div>
        <Routes>
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                deleteFromCart={deleteFromCart}
              />
            }
          />
          <Route
            path="/"
            element={
              <List
                renderedProducts={products}
                favorites={favorites}
                addToCart={addToCart}
                toggleFavorites={toggleFavorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <List
                renderedProducts={favorites}
                favorites={favorites}
                addToCart={addToCart}
                toggleFavorites={toggleFavorites}
              />
            }
          />
          <Route
            path={`/${activeCategory.replaceAll(" ", "-")}`}
            element={
              <List
                renderedProducts={products.filter(
                  (product) => product.category === activeCategory
                )}
                favorites={favorites}
                addToCart={addToCart}
                toggleFavorites={toggleFavorites}
              />
            }
          />
          <Route
            path="/products/:id"
            element={<FullProductPage products={products} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// EXPORT ---------------------------------------------------------

export default App;
