import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [massage, setMassage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8007/api/projects")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleEdit = (projectId) => {
    navigate(`/edit-project/${projectId}`);
  };

  const handleDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios
        .delete(`http://localhost:8007/api/projects/${projectId}`)
        .then((res) => {
          console.log(res);
          setProjects((prevProjects) =>
            prevProjects.filter((project) => {
              project.id !== projectId;
              const massage = `${projectId}: ${project.name} deleted successfully with status code:",
              ${res.status}`;
              setMassage(massage);
            })
          );
        })
        .catch((err) => {
          alert("Error deleting project");
          console.log(err);
        });
      console.log("Delete project with id:", projectId);
    }
  };

  return (
    <div className="container table-responsive">
      <table className="table table align-middle table-hover table-striped table-bordered caption-top">
        <caption>Project List</caption>
        <thead>
          <tr className="table-info">
            <th>Project Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td className="row align-items-center">
                <button
                  className="btn btn-success col"
                  onClick={() => handleEdit(project.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger col "
                  id="liveToastBtn"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{massage}</p>
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{massage}</div>
      </div>
    </div>
  );
};

export default ProjectList;
