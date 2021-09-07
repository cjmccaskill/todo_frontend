import React, { useState } from "react";

const Form = ({ initialTodo, handleSubmit, buttonLabel, history }) => {
  // The Form Data State

  // Initiallize the form with the initialTodo state
  const [formData, setFormData] = useState(initialTodo);

  return <h1>Blog Form</h1>;
};

export default Form;
