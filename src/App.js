import AllPost from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

function App(props) {
  // ~~~~~ Style Object ~~~~~
  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "10px auto",
  };

  // ~~~~~ State & Other Variables ~~~~~
  const url = "https://django-todos-cm.herokuapp.com/todos/"; //API url
  const [posts, setPosts] = useState([]); //state to hold list of post
  const nullTodo = {
    subject: "",
    details: "",
  };

  const [targetTodo, setTargetTodo] = useState(nullTodo);

  // ~~~~~ Functions ~~~~~
  // Function to get list of Todos from API
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // Function to add todo from form data
  const addTodos = async (newTodo) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    getTodos(); // get updated list of todos
  };

  // Function to select todo to edit
  const getTargetTodo = (todo) => {
    setTargetTodo(todo);
    props.history.push("/edit");
  };

  // Function to edit todo on form submission
  const updateTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    getTodos();
  };

  // Function to delete todo on form submission
  const deleteTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "delete",
    });

    // get updated list of todos
    getTodos();
    props.history.push("/");
  };

  // ~~~~~ useEffects ~~~~~
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new">
        <button style={button}>Create New Todo</button>
      </Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerprops) => <AllPost {...routerprops} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost
              {...routerProps}
              posts={posts}
              edit={getTargetTodo}
              deleteTodo={deleteTodo}
            />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialTodo={nullTodo}
              handleSubmit={addTodos}
              buttonLabel="Create Todo"
            />
          )}
        />
        <Route
          path="/edit"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialTodo={targetTodo}
              handleSubmit={updateTodo}
              buttonLabel="Update Todo"
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
