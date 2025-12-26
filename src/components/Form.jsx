import { useState } from "react";
import styles from "../css/form.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Form({createData,error}) {
    const patternName=/^[A-Za-zÁÉÍÓÚáéíóúÑñÜüçÇ'\s\-]+$/;
    const patternEmail=/^([A-Za-z0-9_-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
      if (error) {
        error.message || "API Error";
     }
  }, [error]);
    
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
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "name":
        if(value.trim()===""){
            error="Empty field";
        }else if (!patternName.test(value)) {
          error = "Invalid name";
        }else if((patternName.test(value)) && (value.trim().length<2)){
            error="Name must be at least 2 characters long"
        }
        break;
      case "email":
        if(value.trim()===""){
            error="Empty field";
        }else if (!patternEmail.test(value)) {
          error = "Invalid Email";
        }
        break;
      case "password":
        if(value.trim()===""){
            error="Empty field";
        }else if (value.length < 8) {
          error = "Password must be at least 8 characters long";
        }
        break;
      default:
        return true;
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formValues.name || !formValues.email || !formValues.password) {
    alert("All fields are required");
    return;
  }
  const hasErrors = Object.values(formErrors).some(err => err);
  if (hasErrors) {
    alert("Please fix form errors");
    return;
  }
  const res = await createData(formValues);
  if (res.err) {
    alert(res.message || "Server error");
    return;
  }
  setErrorMessage(null);
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
                type="email"
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
          <input
              id="password"
              name="password"
              type="password"
              accessKey="p"
              tabIndex={3}
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!formErrors.password}
              aria-describedby={formErrors.password ? "passError" : undefined}
            />
        <span id="passError" role="alert" className={`error ${formErrors.password ? styles.visible : ""}`}>
          {formErrors.password || "\u00A0"}
        </span>
    </div>
    <button type="submit" className={styles.join} tabIndex={4} accessKey="b">Join Now</button>
  </form>
    {errorMessage && <div>{errorMessage}</div>}
</>
  );
}
export default Form;