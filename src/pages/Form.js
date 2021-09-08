import React, { useState } from "react";

const Form = ({ initialTodo, handleSubmit, buttonLabel, history }) => {
  // ~~~~~ The Form Data State ~~~~~
  // Initiallize the form with the initialTodo state
  const [formData, setFormData] = useState(initialTodo);

  // ~~~~~ Functions ~~~~~
  // Standard React Form HandleChange Function
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // Function to run when form is submitted
  const handleSubmission = (event) => {
    event.preventDefault(); // prevent form refresh
    handleSubmit(formData); // pass formData to handleSubmit prop function
    history.push("/"); // push user back to main page
  };

  return (
    <form onSubmit={handleSubmission}>
      {/* input field for subject */}
      <input
        type="text"
        onChange={handleChange}
        value={formData.subject}
        name="subject"
      />
      {/* input field for details */}
      <input
        type="text"
        onChange={handleChange}
        value={formData.details}
        name="details"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;
