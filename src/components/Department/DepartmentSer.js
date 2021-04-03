import axios from "axios"

const URL = "http://localhost:8080/departments";

class DepartmentSer {

  getAllDepartments() {
    return axios.get(`${URL}`);
  }

  getDepartments(id){
    return axios.get(`${URL}/${id}`)
  }


  deleteDepartmentById(id){
    return axios.delete(`${URL}/${id}`)
  }

  updateDepartment(id, department){
    return axios.put(`${URL}/${id}`, department);
  }

  createDepartment(department){
    return axios.post(`${URL}`, department)
  }

}

export default new DepartmentSer();