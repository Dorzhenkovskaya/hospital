import axios from "axios"

const URL = "http://localhost:8080/patients";

class PatientSer {

  getAllPatients() {
    return axios.get(`${URL}`);
  }

  getPatients(id){
    return axios.get(`${URL}/${id}`)
  }


  deletePatientById(id){
    return axios.delete(`${URL}/${id}`)
  }

  updatePatient(id, patient){
    return axios.put(`${URL}/${id}`, patient);
  }

  createPatient(patient){
    return axios.post(`${URL}`, patient)
  }

}

export default new PatientSer();