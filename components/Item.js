import Button from "@mui/material/Button";
import itemStyle from "../styles/item.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addItem, removeItem } from "../actions";
import Image from "next/image";

function Item({ name, pic, price }) {
  const [orderState, setOrderState] = useState(true);
  const items = useSelector((state) => state.itemUpdateReducer);
  const dispatch = useDispatch();

  const styles = {
    height: "550px",
    width: "500px",
    objectFit: "contain",
  };

  const itemDetails = {
    name,
    pic,
    price,
  };

  function handleCart() {
    if (orderState) {
      dispatch(increment());
      dispatch(addItem([...items, itemDetails]));
    } else {
      const array = items;

      dispatch(decrement());
      dispatch(
        removeItem(array.filter((item) => item.name !== itemDetails.name))
      );
    }
    setOrderState(!orderState);
  }

  const stylesButton = {
    marginRight: "20px",
    marginTop: "20px",
    color: "blue",
  };

  return (
    <div className="item">
      <Image loader={() => pic} src={pic} alt={name} width={500} height={500} />

      <div className={itemStyle.itemdetails}>
        <div>
          <p className={itemStyle.itemname}>{name}</p>
          <p className={itemStyle.itemprice}>₹{price}</p>
        </div>
        <div>
          <Button style={stylesButton} onClick={handleCart} variant="outlined">
            {orderState ? "Order" : "Remove"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Item;
