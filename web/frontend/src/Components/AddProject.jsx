import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Create an instance of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8007/api/projects", { name, description })
      .then((response) => {
        console.log("Success:", response.data);
        navigate("/projects"); // Navigate to the project list page
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Project</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;
