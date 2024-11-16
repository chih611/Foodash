import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import AddLocationAltRounded from "@mui/icons-material/AddLocationAltRounded";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";

const DetailForm = ({ pickup, setPickup }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="d-flex w-100">
        <AccountCircleRounded className="standard-icon" />
        <p className="subtitle ms-2">Recipient Name</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          {...register("name", { required: "Recipient name is required" })}
          placeholder="Enter recipient name"
          className="form_item1"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="d-flex w-100 mt-3">
        <AddLocationAltRounded className="standard-icon" />
        <p className="subtitle ms-2">Address</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          {...register("address", { required: "Address is required" })}
          placeholder="Enter delivery address"
          className="form_item1"
        />
        {errors.address && (
          <p className="text-danger">{errors.address.message}</p>
        )}
      </div>

      <div className="d-flex w-100 mt-3">
        <EmailIcon className="standard-icon" />
        <p className="subtitle ms-2">Email</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter email"
          className="form_item1"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="d-flex w-100 mt-3">
        <LocalPhoneOutlined className="standard-icon" />
        <p className="subtitle ms-2">Contact</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          {...register("contact", {
            required: "Contact is required",
            pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" },
          })}
          placeholder="Enter contact number"
          className="form_item1"
        />
        {errors.contact && (
          <p className="text-danger">{errors.contact.message}</p>
        )}
      </div>

      <div className="d-flex w-100 mt-3">
        <EventIcon className="standard-icon" />
        <p className="subtitle ms-2">Scheduled Delivery Date</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          type="date"
          {...register("scheduledDate", {
            required: "Scheduled delivery date is required",
          })}
          className="form_item1"
        />
        {errors.scheduledDate && (
          <p className="text-danger">{errors.scheduledDate.message}</p>
        )}
      </div>

      <div className="w-100 d-flex my-2">
        <button type="button" onClick={() => setPickup(false)}>
          <div className={!pickup ? "button-3 bg-headline-color" : "button-3"}>
            <p className="button-title-text my-1">Delivery</p>
          </div>
        </button>
        <button type="button" onClick={() => setPickup(true)}>
          <div className={pickup ? "button-3 bg-headline-color" : "button-3"}>
            <p className="button-title-text my-1">Pick Up</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DetailForm;
