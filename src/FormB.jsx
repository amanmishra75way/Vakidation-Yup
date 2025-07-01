import React, { useState } from "react";
import * as Yup from "yup";

const FormB = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validatorSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Phone no must have 10 digits")
      .required("Phone no is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // clear error when user types
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await validatorSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted ✅", formData);
      setErrors({}); // clear errors on success
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((validationError) => {
          formErrors[validationError.path] = validationError.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} noValidate>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your phone no"
          />
          {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormB;
