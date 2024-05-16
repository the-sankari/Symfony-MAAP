import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This retrieves the project ID from the URL
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasChanges, setHasChanges] = useState(false); // track if the form has changes

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8007/api/projects/${id}`)
      .then((response) => {
        setProject(response.data); // Set the project data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching the project data.");
        setIsLoading(false);
      });
  }, [id]); // The effect depends on the project ID

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
    setHasChanges(true); // mark as changed
  };

  const isValidForm = () => {
    // add form validation logic here
    // for example:
    if (!project.name || !project.description) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!isValidForm()) return; // prevent submission if form is not valid

    setIsLoading(true);
    axios
      .patch(`http://localhost:8007/api/projects/${id}`, project)
      .then(() => {
        navigate("/projects"); // Navigate back to the project list after saving
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while updating the project.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <p>Project data is not available.</p>;
  }

  return (
    <form onSubmit={handleSave}>
      <h1>Edit Project</h1>
      {error && <p className="error">{error}</p>}
      <label htmlFor="projectName">
        Project Name
        <input
          id="projectName"
          type="text"
          name="name"
          value={project.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          aria-required={true}
        />
      </label>
      <br />
      <label htmlFor="projectDescription">
        Project Description
        <textarea
          id="projectDescription"
          name="description"
          value={project.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          aria-required={true}
        />
      </label>
      <br />
      <button type="submit" disabled={isLoading || !hasChanges}>
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProject;
