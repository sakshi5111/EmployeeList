import React, { useState, useEffect } from "react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((data) => setEmployees(data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <input
          className="search-box"
          type="text"
          placeholder="Search by first name"
          value={searchInput}
          onChange={handleSearch}
        />
        {filteredEmployees.length > 0 ? (
          <ul>
            {filteredEmployees.map((employee) => (
              <li key={employee.id} className="box card">
                <p className="id card-header">{employee.id}</p>
                <img
                  className="image card-img-top"
                  src={employee.avatar}
                  alt={employee.first_name}
                />
                <p className="fname card-title">{employee.first_name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Employee Not Found</p>
        )}
      </div>
    </>
  );
}

export default EmployeeList;
