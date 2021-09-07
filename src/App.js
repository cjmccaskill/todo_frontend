import AllPost from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

function App(props) {
  
  // Style Object
  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  // State & Other Variables
  const url = "https://django-todos-cm.herokuapp.com/todos/"; //API url
  const [posts, setPosts] = useState([]); //state to hold list of post

  // Functions
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // useEffects
  useEffect(() => {
    getTodos();
  }, []);

  // returned JSX
  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerprops) => <AllPost {...routerprops} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost {...routerProps} posts={posts} />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form {...routerProps} />}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form {...routerProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
