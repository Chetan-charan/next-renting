import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Calendar from "react-calendar";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import ListItemEach from "../components/ListItemEach";
import checkoutStyles from "../styles/checkout.module.css";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  updateOrderAmount,
  updateDateRange,
  updateDays,
  updateCustomerDetails,
} from "../actions";

export default function CheckOut() {
  const router = useRouter();
  const items = useSelector((state) => state.itemUpdateReducer);
  const amount = useSelector((state) => state.orderAmountReducer);
  const days = useSelector((state) => state.updateDaysReducer);
  const dateRange = useSelector((state) => state.daterangeReducer);

  const dispatch = useDispatch();

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: { name: "", email: "", phone: "" },
      validationSchema: formValidationSchema,

      onSubmit: async (values) => {
        dispatch(updateOrderAmount(amount * days));
        dispatch(updateCustomerDetails(values));
        router.push("/placeorder");
      },
    });

  const onChange = (dateRange) => {
    dispatch(updateDateRange(dateRange));
    dispatch(
      updateDays(
        Math.round(
          Math.abs((dateRange[1] - dateRange[0]) / (24 * 60 * 60 * 1000))
        )
      )
    );
  };

  return (
    <div className={checkoutStyles.orderitemlist}>
      <div>
        <h3>Ordered Items</h3>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {items.map((item) => (
            <ListItemEach
              key={item.name}
              name={item.name}
              pic={item.pic}
              price={item.price}
            />
          ))}
        </List>
        <ListItem alignItems="center">
          <ListItemText
            style={{ marginLeft: "110px" }}
            primary={"Total Amount per day : ₹" + amount}
          />
        </ListItem>
      </div>
      <div>
        <p style={{ fontWeight: 300 }}>Select Date range for Hiring :</p>
        <Calendar
          selectRange
          minDate={new Date()}
          onChange={onChange}
          value={dateRange}
        />
        <form onSubmit={handleSubmit}>
          <div className={checkoutStyles.customerdetails}>
            <TextField
              name="name"
              onBlur={handleBlur}
              helperText={errors.name && touched.name && errors.name}
              value={values.name}
              onChange={handleChange}
              id="name"
              label="name"
              variant="standard"
            />

            <TextField
              name="phone"
              onBlur={handleBlur}
              helperText={errors.phone && touched.phone && errors.phone}
              value={values.phone}
              onChange={handleChange}
              id="phone"
              label="phone"
              variant="standard"
            />

            <TextField
              name="email"
              onBlur={handleBlur}
              helperText={errors.email && touched.email && errors.email}
              value={values.email}
              onChange={handleChange}
              id="email"
              label="email"
              variant="standard"
            />

            <Button variant="contained" type="submit" color="success">
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const formValidationSchema = yup.object({
  name: yup
    .string()
    .min(4, "Minimum 4 characters required!!")
    .required("required"),
  phone: yup.number().required("required"),
  email: yup.string().required("required"),
});
