<template>
  <div>
    <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Пациенты</div>
    <div class="container">

      <form @submit="validateAndSubmit">

        <div v-if="errors.length">
          <div
            class="alert alert-warning"
            v-bind:key="index"
            v-for="(error, index) in errors"
          >{{error}}</div>
        </div>
      
        <fieldset class="form-group">
          <label class="font-weight-bold">Имя</label>
          <input type="text" class="form-control font-italic" v-model="patient_name" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Фамилия</label>
          <input type="text" class="form-control font-italic" v-model="surname" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Отчество</label>
          <input type="text" class="form-control font-italic" v-model="patronymic" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Дата рождения</label>
          <input type="date" class="form-control font-italic" v-model="dateOfBirth" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Серия паспорта</label>
          <input type="number" class="form-control font-italic" v-model="passportSeries" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Номер паспорта</label>
          <input type="number" class="form-control font-italic" v-model="passportNumber" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Место работы</label>
          <input type="text" class="form-control font-italic" v-model="workPlace" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Номер страхования</label>
          <input type="number" class="form-control font-italic" v-model="insuranceNumber" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Тип страхования</label>
          <input type="text" class="form-control font-italic" v-model="insuranceType" />
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

import PatientSer from "@/components/Patient/PatientSer";

export default {
  name: "patientDetails",
  data() {

    return {
      patient_name: "",
      surname: "",
      patronymic: "",
      dateOfBirth: "",
      passportSeries: "",
      passportNumber: "",
      workPlace: "",
      insuranceNumber: "",
      insuranceType: "",
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
    goToLastPage(){
      this.$router.push(`/patients`)
    },

    refreshPatientsDetails() {
      PatientSer.getPatients(this.id).then(res => {
        this.patient_name = res.data.patient_name;
        this.surname = res.data.surname;
        this.patronymic = res.data.patronymic;
        this.dateOfBirth = formatDate(res.data.dateOfBirth);
        this.passportSeries = res.data.passportSeries;
        this.passportNumber = res.data.passportNumber;
        this.workPlace = res.data.workPlace;
        this.insuranceNumber = res.data. insuranceNumber;
        this.insuranceType = res.data.insuranceType;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.patient_name) {
        this.errors.push("Неверные данные");
      }
      if (!this.surname) {
        this.errors.push("Неверные данные");
      }
      if (!this.patronymic) {
        this.errors.push("Неверные данные");
      }
      if (!this.dateOfBirth) {
        this.errors.push("Неверные данные");
      }
      if (!this.passportSeries) {
        this.errors.push("Неверные данные");
      }
      if (!this.passportNumber) {
        this.errors.push("Неверные данные");
      }
      if (!this.workPlace) {
        this.errors.push("Неверные данные");
      }
      if (!this.insuranceNumber) {
        this.errors.push("Неверные данные");
      }
      if (!this.insuranceType) {
        this.errors.push("Неверные данные");
      }

      if (this.errors.length === 0) {
        if (this.id === -1) {
            PatientSer.createPatient(
            {
              patient_name : this.patient_name,
                surname : this.surname,
                patronymic : this.patronymic,
                dateOfBirth : this.dateOfBirth,
                passportSeries : this.passportSeries,
                passportNumber : this.passportNumber,
                workPlace  : this.workPlace ,
                insuranceNumber : this.insuranceNumber,
                insuranceType : this.insuranceType
            }
            ).then(() => {
                this.$router.push("/patients")
            })
        } 
        else {
          PatientSer.updatePatient(this.id, {
            id: this.id,
            patient_name : this.patient_name,
            surname : this.surname,
            patronymic : this.patronymic,
            dateOfBirth : this.dateOfBirth,
            passportSeries : this.passportSeries,
            passportNumber : this.passportNumber,
            workPlace  : this.workPlace ,
            insuranceNumber : this.insuranceNumber,
            insuranceType : this.insuranceType
          }).then(() => {
            this.$router.push("/patients");
          });
        }
      }
    }
  }
  ,
  created() {
    this.refreshPatientsDetails();
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