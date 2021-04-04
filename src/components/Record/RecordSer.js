import axios from "axios"

const URL = "http://localhost:8080/records";

class RecordSer {

    getAllRecords() {
        return axios.get(`${URL}`);
    }

    getRecords(id) {
        return axios.get(`${URL}/${id}`)
    }


    deleteRecordById(id) {
        return axios.delete(`${URL}/${id}`)
    }

    updateRecord(id, record) {
        return axios.put(`${URL}/${id}`, record);
    }

    createRecord(record) {
        return axios.post(`${URL}`, record)
    }

}

export default new RecordSer();