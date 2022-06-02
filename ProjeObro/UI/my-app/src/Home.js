import React, { Component} from "react";
import { variables } from "./Variables";
export class Home extends Component {

  constructor(props) {
    
    super(props);

    this.state = {
      students: [],
      modalTitle: "",
      Id: 0,
      Name: "",
      LastName: "",
      Status: ""   
    };
  }

  refreshList() {
    fetch(variables.API_URL + "student")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ students: data });
      });
  }
  componentDidMount() {
    this.refreshList();
  }
  componentDidUpdate() {
    this.refreshList();
  }

  changeId = (e) => {
    this.setState({ Id: e.target.value });
  };
  changeName = (e) => {
    this.setState({ Name: e.target.value });
  };
  changeLastName = (e) => {
    this.setState({ LastName: e.target.value });
  };
  changeStatus = (e) => {
    this.setState({ Status: e.target.value });
  };


  // handleClick= (e) => {
  //   console.log(e.target.value);
  // };

//   refreshList2(){
//     debugger
//     fetch(variables.API_URL + "student/3")
//     .then((response) => response.json())
//     .then((data) => {
//       this.setState({ students: data });
//     });
//   }
//   handleChange(e) {
//     // this.setState({value: e.target.value});
// debugger
//     fetch(variables.API_URL + "student/"+e.target.value)
//     .then((response) => response.json())
//     .then((data) => {
//       this.setState({ students: data });

//     });
//     this.refreshList2();



//     // fetch(variables.API_URL + "student", {
//     //   method: "GET",
//     //   body: JSON.stringify({
//     //     Id: this.state.Id,
//     //     Name: this.state.Name,
//     //     LastName: this.state.LastName,
//     //     Status: this.state.Status,
//     //   }),
//     // })

//     console.log('ARAA: ' + this.state.value);

//     // e.preventDefault();
//   }



  addClick() {
    this.setState({
      modalTitle: "Add Student",
      Id: "",
      Name: "",
      LastName: "",
      Status: "",
    });
  }
  editClick(dep) {
    this.setState({
      modalTitle: "Edit Student",
      Id: dep.Id,
      Name: dep.Name,
      LastName: dep.LastName,
      Status: dep.Status,
    });
  }
  createClick() {
    if (this.state.Status == "") {
      this.state.Status = true;
    }
    fetch(variables.API_URL + "student", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Name: this.state.Name,
        LastName: this.state.LastName,
        Status: this.state.Status,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshList();
      });
  }
  updateClick() {
    fetch(variables.API_URL + "student", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: this.state.Id,
        Name: this.state.Name,
        LastName: this.state.LastName,
        Status: this.state.Status,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshList();
      });
  }

  deleteClick(Id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "student/" + Id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          alert(result);
          this.refreshList();
        });
    }
  }



  render() {

    const { students, modalTitle, Id, Name, LastName, Status, disabled } =
      this.state;

    return (
      <div>

        <button
          type="button"
          id="ekle"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Student
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {students.map((dep) => (         
                (dep.Status ===  true ) ? (
                  <tr key={dep.Id}>
                  <td>{dep.Id}</td>
                  <td>{dep.Name}</td>
                  <td>{dep.LastName}</td>
                  <td>{dep.Status.toString()}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-light mr-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => this.editClick(dep)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
  
                    <button
                      type="button"
                      className="btn btn-light mr-1"
                      onClick={() => this.deleteClick(dep.Id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                 ) : null
                


     

            )

            
        )}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="Id">Number</label>
                      <input
                        type="text"
                        name="id"
                        id="id"
                        placeholder="Enter Number"
                        className="form-control"
                        value={Id}
                        onChange={this.changeId}
                        disabled={modalTitle === "Add Student" ? disabled : " "}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Name">Name</label>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        placeholder="Enter Name"
                        className="form-control"
                        value={Name}
                        onChange={this.changeName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="LastName">Last name</label>
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        placeholder="Enter Last Name"
                        className="form-control"
                        value={LastName}
                        onChange={this.changeLastName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Status">Status</label>
                      <select
                        defaultValue={this.state.Status}
                        name="Status"
                        id="Status"
                        placeholder="Enter Status"
                        className="form-control"
                        value={Status}
                        onChange={this.changeStatus}
                      >
                        <option value="True">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>

              {modalTitle == "Add Student" ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.createClick()}
                >
                  Create
                </button>
              ) : null}

              {modalTitle == "Edit Student" ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.updateClick()}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
