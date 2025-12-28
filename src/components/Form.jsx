import { useState } from "react";
import styles from "../css/form.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { checkEmailExists } from '../services/userService';
import Show from '../assets/images/show.png';
import Hide from "../assets/images/eye-closed.png";


function Form({createData,error}) {
    const patternName=/^[A-Za-zÁÉÍÓÚáéíóúÑñÜüçÇ'\-]+$/;
    const patternEmail=/^([A-Za-z0-9_-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
  if (error === true) {
    alert(errorMessage || "API Error");
  }
}, [error, errorMessage]);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanValue = name === "name" ? value.trim() : value;

    setFormValues((prev) => ({ ...prev, [name]: cleanValue }));
  };
  const handleBlur = async (e) => {
  const { name, value } = e.target;
  let error = "";

  switch (name) {
    case "name":
      if (value.trim() === "") {
        error = "Empty field";
      } else if (!patternName.test(value)) {
        error = "Invalid name";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters long";
      }
      break;

    case "email":
      if (value.trim() === "") {
        error = "Empty field";
      } else if (!patternEmail.test(value)) {
        error = "Invalid Email";
      } else {
        const exists = await checkEmailExists(value);
        if (exists) {
          error = "Email already registered";
        }
      }
      break;

    case "password":
      if (value.trim() === "") {
        error = "Empty field";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      }else if(/\s/.test(value)){
        error = "Password cannot contain whitespace";
      }
      break;

    default:
      return;
  }

  setFormErrors((prev) => ({ ...prev, [name]: error }));
};

  const validateName = (value) => {
  if (value.trim() === "") return "Empty field";
  if (!patternName.test(value)) return "Invalid name";
  if (value.trim().length < 2) return "Name must be at least 2 characters long";
  return "";
};
const validateEmail = (value,exists) => {
  if (value.trim() === "") return "Empty field";
  if (!patternEmail.test(value)) return "Invalid Email";
  if (exists) return "Email already registered";
  return "";
};
const validatePassword = (value) => {
  if (value.trim() === "") return "Empty field";
  if (value.trim().length < 8) return "Password must be at least 8 characters long";
  if(/\s/.test(value)) return "Password cannot contain whitespace";
  return "";
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formValues.name || !formValues.email || !formValues.password) { 
    alert("All fields are required"); 
    return; }
    const exists = await checkEmailExists(formValues.email);
  const newErrors = {
    name: validateName(formValues.name),
    email: validateEmail(formValues.email,exists),
    password: validatePassword(formValues.password),
  };
  setFormErrors(newErrors);
  if (Object.values(newErrors).some(err => err)) {
    alert("Please fix form errors");
    return;
  }
  const res = await createData(formValues);
  if (res.err) {
    alert(res.message || "Server error");
    return;
  }
  navigate("/submit", { state: res });
};
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className={styles.field}>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                name="name"
                type="text"
                accessKey="n"
                tabIndex={1}
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? "nameError" : undefined}
                />
            <span
                id="nameError"
                role="alert"
                className={`error ${formErrors.name ? styles.visible : ""}`}>
                {formErrors.name || "\u00A0"}
            </span>
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email:</label>
          <input
                id="email"
                name="email"
                type="text"
                accessKey="e"
                tabIndex={2}
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "emailError" : undefined}
            />
          <span id="emailError" role="alert" className={`error ${formErrors.email ? styles.visible : ""}`}>
          {formErrors.email || "\u00A0"}
          </span>
      </div>

      <div className={styles.field}>
          <label htmlFor="password">Password:</label>
          <div className={styles.passwordWrapper}>
          <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              accessKey="p"
              tabIndex={3}
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!formErrors.password}
              aria-describedby={formErrors.password ? "passError" : undefined}
              className={styles.passwordInput}
                />
                <img
                 src={showPassword ? Show : Hide}
                alt="toggle password visibility"
                className={styles.togglePassword}
                onClick={() => setShowPassword(prev => !prev)}
            /></div>
        <span id="passError" role="alert" className={`error ${formErrors.password ? styles.visible : ""}`}>
          {formErrors.password || "\u00A0"}
        </span>
    </div>
    <button type="submit" className={styles.join} tabIndex={4} accessKey="b" role="button" name="submit">Join Now</button>
  </form>
    {errorMessage && <div>{errorMessage}</div>}
</>
  );
}
export default Form;