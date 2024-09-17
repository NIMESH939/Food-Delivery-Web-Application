import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChnageHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let respose = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    console.log(respose.data);

    if (respose.data.success) {
      const { session_url } = respose.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={onChnageHandler}
              value={data.firstName}
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={onChnageHandler}
              value={data.lastName}
            />
          </div>
          <input
            required
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChnageHandler}
            value={data.email}
          />
          <input
            required
            type="text"
            placeholder="Street"
            name="street"
            onChange={onChnageHandler}
            value={data.street}
          />
          <div className="multi-fields">
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              onChange={onChnageHandler}
              value={data.city}
            />
            <input
              required
              type="text"
              placeholder="State"
              name="state"
              onChange={onChnageHandler}
              value={data.state}
            />
          </div>
          <div className="multi-fields">
            <input
              required
              type="text"
              placeholder="Zip code"
              name="zipcode"
              onChange={onChnageHandler}
              value={data.zipcode}
            />
            <input
              required
              type="text"
              placeholder="Country"
              name="country"
              onChange={onChnageHandler}
              value={data.country}
            />
          </div>
          <input
            required
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={onChnageHandler}
            value={data.phone}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
