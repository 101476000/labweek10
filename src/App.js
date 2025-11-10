import React, { useState } from "react";
import "./App.css";

export default function App() {
  // Track form state for all fields including an optional address2 and terms agreement.
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postalCode: "",
    agreeTerms: false,
  });

  // Save the submitted form values for display after successful submission
  const [submitted, setSubmitted] = useState(null);
  // Track validation errors for each field
  const [errors, setErrors] = useState({});

  // Generic change handler handles both text and checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate required fields. If a field is invalid or missing, add a message to errors.
  const validate = () => {
    const next = {};
    // basic email validation
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.fullName.trim()) next.fullName = "Full Name is required.";
    if (!form.address1.trim()) next.address1 = "Address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.province.trim()) next.province = "Province is required.";
    if (!form.postalCode.trim()) next.postalCode = "Postal Code is required.";
    if (!form.agreeTerms) next.agreeTerms = "You must agree to the terms.";
    return next;
  };

  // Submit handler checks for errors then saves the form data to the submitted state
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitted(form);
      // Optionally reset the form after submission
      // setForm({ email: "", fullName: "", address1: "", address2: "", city: "", province: "", postalCode: "", agreeTerms: false });
    }
  };

  return (
    <div className="container">
      <h1>Lab Week 10 — Data Entry Form</h1>
      <form className="card" onSubmit={handleSubmit} noValidate>
        {/* Top row: Email and Full Name */}
        <div className="grid2">
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="row">
            <label htmlFor="fullName">Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
        </div>

        {/* Address and Address 2 */}
        <div className="row">
          <label htmlFor="address1">Address</label>
          <input
            id="address1"
            name="address1"
            type="text"
            value={form.address1}
            onChange={handleChange}
            placeholder="1234 Main St"
          />
          {errors.address1 && <p className="error">{errors.address1}</p>}
        </div>
        <div className="row">
          <label htmlFor="address2">Address 2</label>
          <input
            id="address2"
            name="address2"
            type="text"
            value={form.address2}
            onChange={handleChange}
            placeholder="Apartment, studio, or floor"
          />
        </div>

        {/* City, Province and Postal Code */}
        <div className="grid3">
          <div className="row">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="row">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              name="province"
              value={form.province}
              onChange={handleChange}
            >
              <option value="">Choose…</option>
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="New Brunswick">New Brunswick</option>
              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Saskatchewan</option>
            </select>
            {errors.province && <p className="error">{errors.province}</p>}
          </div>
          <div className="row">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
            />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>
        </div>

        {/* Terms checkbox */}
        <div className="row-check">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            checked={form.agreeTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeTerms">Agree Terms &amp; Condition?</label>
          {errors.agreeTerms && <p className="error">{errors.agreeTerms}</p>}
        </div>

        <button type="submit" className="btn">Submit</button>
      </form>
      {submitted && (
        <div className="output card">
          <h2>Submitted Information</h2>
          <div className="kv">
            <span className="k">Email:</span>
            <span className="v">{submitted.email}</span>
          </div>
          <div className="kv">
            <span className="k">Name:</span>
            <span className="v">{submitted.fullName}</span>
          </div>
          <div className="kv">
            <span className="k">Address:</span>
            <span className="v">{submitted.address1}</span>
          </div>
          {submitted.address2 && (
            <div className="kv">
              <span className="k">Address 2:</span>
              <span className="v">{submitted.address2}</span>
            </div>
          )}
          <div className="kv">
            <span className="k">City:</span>
            <span className="v">{submitted.city}</span>
          </div>
          <div className="kv">
            <span className="k">Province:</span>
            <span className="v">{submitted.province}</span>
          </div>
          <div className="kv">
            <span className="k">Postal Code:</span>
            <span className="v">{submitted.postalCode}</span>
          </div>
          <div className="kv">
            <span className="k">Agreed Terms:</span>
            <span className="v">{submitted.agreeTerms ? "Yes" : "No"}</span>
          </div>
        </div>
      )}
    </div>
  );
}