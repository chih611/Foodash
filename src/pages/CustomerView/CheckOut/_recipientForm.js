import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import AddLocationAltRounded from "@mui/icons-material/AddLocationAltRounded";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";

const DetailForm = ({
  pickup,
  setPickup,
  setRecipientDetails,
  customerProfile,
  recipientDetails, // Add recipientDetails prop
  setScheduledDate, // New prop for scheduling date
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:
        recipientDetails.name ||
        `${customerProfile?.FIRST_NAME || ""} ${
          customerProfile?.LAST_NAME || ""
        }`,
      address: recipientDetails.address || customerProfile?.ADDRESS || "",
      contact: recipientDetails.contact || customerProfile?.PHONE_NUMBER || "",
      email: recipientDetails.email || customerProfile?.EMAIL || "",
    },
  });

  // Update form with customerProfile when it changes
  useEffect(() => {
    reset({
      name:
        recipientDetails.name ||
        `${customerProfile?.FIRST_NAME || ""} ${
          customerProfile?.LAST_NAME || ""
        }`,
      address: recipientDetails.address || customerProfile?.ADDRESS || "",
      contact: recipientDetails.contact || customerProfile?.PHONE_NUMBER || "",
      email: recipientDetails.email || customerProfile?.EMAIL || "",
    });
  }, [customerProfile, recipientDetails, reset]);

  const onSubmit = (data) => {
    setRecipientDetails({
      name: data.name,
      address: data.address,
      contact: data.contact,
      email: data.email,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Add Recipient Name */}
      <div className="d-flex w-100">
        <AccountCircleRounded className="standard-icon" />
        <p className="subtitle ms-2">Recipient Name</p>
      </div>

      <div className="w-100 d-flex mb-3">
        <input
          name="name"
          placeholder="Enter recipient name"
          className="form_item1"
          {...register("name", { required: "Recipient name is required" })}
          onChange={handleInputChange} // Update state on change
        />
        <button type="submit">
          <ArrowRightRounded className="standard-icon" />
        </button>
      </div>
      {errors.name && <p className="text-danger">{errors.name.message}</p>}

      {/* Add Address */}
      <div className="d-flex w-100 mt-3">
        <AddLocationAltRounded className="standard-icon" />
        <p className="subtitle ms-2">Address</p>
      </div>

      <div className="w-100 d-flex mb-3">
        <input
          name="address"
          placeholder="Enter delivery address"
          className="form_item1"
          {...register("address", { required: "Address is required" })}
          onChange={handleInputChange} // Update state on change
        />
        <button type="submit">
          <ArrowRightRounded className="standard-icon" />
        </button>
      </div>
      {errors.address && (
        <p className="text-danger">{errors.address.message}</p>
      )}

      {/* Add Email */}
      <div className="d-flex w-100 mt-3">
        <EmailIcon className="standard-icon" />
        <p className="subtitle ms-2">Email</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          name="email"
          placeholder="Enter Email"
          className="form_item1"
          {...register("email", {
            required: "Email is required",
          })}
          onChange={handleInputChange} // Update state on change
        />
        <button type="submit">
          <ArrowRightRounded className="standard-icon" />
        </button>
      </div>
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      {/* Add Contact */}
      <div className="d-flex w-100 mt-3">
        <LocalPhoneOutlined className="standard-icon" />
        <p className="subtitle ms-2">Contact</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          name="contact"
          placeholder="Enter contact number"
          className="form_item1"
          {...register("contact", {
            required: "Contact number is required",
            pattern: {
              value: /^[0-9]{10}$/, // Example for a 10-digit phone number
              message: "Invalid phone number format",
            },
          })}
          onChange={handleInputChange} // Update state on change
        />
        <button type="submit">
          <ArrowRightRounded className="standard-icon" />
        </button>
      </div>
      {errors.contact && (
        <p className="text-danger">{errors.contact.message}</p>
      )}

      {/* Add Delivery Option */}
      <div className="d-flex w-100 my-2">
        <p className="subtitle ms-2">Delivery Method</p>
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

      {/* Scheduled Delivery Date */}
      <div className="d-flex w-100 mt-3">
        <EventIcon className="standard-icon" />
        <p className="subtitle ms-2">Scheduled Delivery Date</p>
      </div>
      <div className="w-100 d-flex mb-3">
        <input
          type="date"
          className="form_item1"
          onChange={(e) => setScheduledDate(e.target.value)}
        />
      </div>
    </form>
  );
};

export default DetailForm;
