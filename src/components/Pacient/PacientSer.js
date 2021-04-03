import axios from "axios"

const URL = "http://localhost:8080/pacients";

class PacientSer {

  getAllPacients() {
    return axios.get(`${URL}`);
  }

  getPacients(id){
    return axios.get(`${URL}/${id}`)
  }


  deletePacientById(id){
    return axios.delete(`${URL}/${id}`)
  }

  updatePacient(id, pacient){
    return axios.put(`${URL}/${id}`, pacient);
  }

  createPacient(pacient){
    return axios.post(`${URL}`, pacient)
  }

}

export default new PacientSer();