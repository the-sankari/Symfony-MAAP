import { useState, useEffect } from "react";
import axios from "axios";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [massage, setMassage] = useState("");

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
    // Logic to handle edit

    console.log("Edit project with id:", projectId);
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
        <thead >
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
              <td className="g-3">
                <button
                  className="btn btn-success "
                  onClick={() => handleEdit(project.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger "
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
    </div>
  );
};

export default ProjectList;
