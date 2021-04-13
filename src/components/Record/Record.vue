<template>
  <div>
    <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Запись</div>
    <div class="container">

      <form @submit="validateAndSubmit">

        <div v-if="errors.length">
          <div
              class="alert alert-warning"
              v-bind:key="index"
              v-for="(error, index) in errors"
          >{{ error }}
          </div>
        </div>

        <fieldset class="form-group">
          <label class="font-weight-bold">Пациента
            <select v-model="patient" class="custom-select" required>
              <option v-for="patient in patients" :value="patient" :key="patient.surname">{{ patient.patient_name + " " + patient.surname }}</option>
            </select>
          </label>
<!--          <input type="number" class="form-control font-italic" v-model="patient_id"/>-->

        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Создание</label>
          <input type="date" class="form-control font-italic" v-model="created_at"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Отделение
            <select v-model="department" class="custom-select" required>
              <option v-for="department in departments" :value="department" :key="department.name">{{ department.name }}</option>
            </select>
          </label>
        </fieldset>
        <label class="font-weight-bold"></label>
        <button class="btn btn-success btn-lg btn-block btn" type="submit">Сохранить</button>
        <label class="font-weight-bold"></label>
        <button class="btn btn-success btn-lg btn-block btn" v-on:click="goToLastPage()">Вернуться назад</button>
      </form>
    </div>
  </div>
</template>

<script>

import RecordSer from "@/components/Record/RecordSer";
import DepartmentSer from "../Department/DepartmentSer";
import PatientSer from "../Patient/PatientSer";

export default {
  name: "recordDetails",
  data() {

    return {
      patients:null,
      departments:null,
      patient: "",
      created_at: "",
      department: "",
      errors: []
    };

  },

  computed: {
    id() {
      return parseInt(this.$route.params.id);
    }
  },

  methods: {
    formatDate,
    goToLastPage() {
      this.$router.push(`/records`)
    },

    refreshRecordDetails() {
      RecordSer.getRecords(this.id).then(res => {
        this.patient = res.data.patient;
        this.created_at = formatDate(res.data.created_at);
        this.department = res.data.department;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.patient) {
        this.errors.push("Неверные данные");
      }
      if (!this.created_at) {
        this.errors.push("Неверные данные");
      }
      if (!this.department) {
        this.errors.push("Неверные данные");
      }

      if (this.errors.length === 0) {
        if (this.id === -1) {
          RecordSer.createRecord(
              {
                patient: this.patient,
                created_at: this.created_at,
                department: this.department
              }
          ).then(() => {
            this.$router.push("/records")
          })
        } else {
          RecordSer.updateRecord(this.id, {
            id: this.id,
            patient: this.patient,
            created_at: this.created_at,
            department: this.department
          }).then(() => {
            this.$router.push("/records");
          });
        }
      }
    }
  }
  ,
  created() {
    this.refreshRecordDetails();
    PatientSer.getAllPatients().
    then(response =>{
      console.log(response.data)
      this.patients = response.data
    });
    DepartmentSer.getAllDepartments().
    then(response =>{
      console.log(response.data)
      this.departments = response.data
    });
  }
};
export function formatDate(input_date) {
  console.log(input_date);
  let date = new Date(input_date[0],input_date[1],input_date[2])
  console.log(date)
  let DD = date.getDate();
  if (DD < 10)
    DD = '0' + DD;
  let MM = date.getMonth() + 1;
  if (MM < 10)
    MM = '0' + MM;
  let YYYY = date.getFullYear();
  return `${YYYY}-${MM}-${DD}`;
}

</script>

<style>

.container {
  margin-top: 50px;
}
</style>