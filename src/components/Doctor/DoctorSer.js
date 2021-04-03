import axios from "axios"

const URL = "http://localhost:8080/doctors";

class DoctorSer {

  getAllDoctors() {
    return axios.get(`${URL}`);
  }

  getDoctors(id){
    return axios.get(`${URL}/${id}`)
  }


  deleteDoctorById(id){
    return axios.delete(`${URL}/${id}`)
  }

  updateDoctor(id, doctor){
    return axios.put(`${URL}/${id}`, doctor);
  }

  createDoctor(doctor){
    return axios.post(`${URL}`, doctor)
  }

}

export default new DoctorSer();