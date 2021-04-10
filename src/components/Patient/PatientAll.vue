<template>
    <div>
      <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Пациенты</div>
        <div class="container">
        <table class="table table-hover">
        <thead>
            <tr>
<!--              <th scope="col">Id</th>-->
              <th scope="col">Имя</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Отчество</th>
              <th scope="col">Дата рождения</th>
              <th scope="col">Серия паспорта</th>
              <th scope="col">Номер паспорта</th>
              <th scope="col">Место работы</th>
              <th scope="col">Номер страхования</th>
              <th scope="col">Тип страхования</th>
              <th scope="col">Изменить</th>
              <th scope="col">Удалить</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="patient in patients" v-bind:key="patient.id">
<!--              <td>{{patient.id}}</td>-->
              <td>{{patient.patient_name}}</td>
              <td>{{patient.surname}}</td>
              <td>{{patient.patronymic}}</td>
              <td>{{formatDate(patient.dateOfBirth)}}</td>
              <td>{{patient.passportSeries}}</td>
              <td>{{patient.passportNumber}}</td>
              <td>{{patient.workPlace}}</td>
              <td>{{patient.insuranceNumber}}</td>
              <td>{{patient.insuranceType}}</td>
            <td>
              <button class="btn btn-outline-dark" v-on:click="updatePatientById(patient.id)">Изменить</button>
            </td>
           
            <td>
              <button class="btn btn-outline-dark" v-on:click="deletePatientById(patient.id)">Удалить</button>
            </td>

            </tr>
        </tbody>
        </table>

          <div class="row">
            <button class="btn btn-success btn-lg btn-block btn" v-on:click="addPatientClicked()">Добавить нового пациента</button>
          </div>
        <br>
          <div class="row">
            <button class="btn btn-success btn-lg btn-block btn" v-on:click="goToMainPage()">Вернуться на главную страницу</button>
          </div>
        <br>
       </div>
    </div>
</template>

<script>

import PatientSer from "@/components/Patient/PatientSer";

export default {
  name: "PatientAll",
  data() {
      return {
          patients:[],
          message: null,
      }
  },
  
  methods:{
  formatDate,
      refreshCourses(){
          PatientSer.getAllPatients().
          then(response =>{
            console.log(response.data)
            this.patients = response.data
          });
      },

      deletePatientById(id){
          PatientSer.deletePatientById(id).
          then(response =>{
              console.log(response.data)
              this.message = `Deleting patient by id ${id} has been successful`
              this.refreshCourses();
              })
          },

        updatePatientById(id){
            this.$router.push({name: 'Patient Details', params: {id} })
        },

        addPatientClicked() {
            this.$router.push(`/patients/-1`);
        },

        goToMainPage(){
            this.$router.push(`/`)
        },


  },

  created(){
      this.refreshCourses();
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
    @import url(https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css);
</style>