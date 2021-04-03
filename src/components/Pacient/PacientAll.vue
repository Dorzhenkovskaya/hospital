<template>
    <div>
      <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Пациенты</div>
        <div class="container">
        <table class="table table-hover">
        <thead>
            <tr>
              <th scope="col">Id</th>
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
            <tr v-for="pacient in pacients" v-bind:key="pacient.id">
              <td>{{pacient.id}}</td>
              <td>{{pacient.name}}</td>
              <td>{{pacient.surname}}</td>
              <td>{{pacient.patronymic}}</td>
              <td>{{pacient.dateOfBirth}}</td>
              <td>{{pacient.passportSeries}}</td>
              <td>{{pacient.passportNumber}}</td>
              <td>{{pacient.workPlace}}</td>
              <td>{{pacient.insuranceNumber}}</td>
              <td>{{pacient.insuranceType}}</td>
            <td>
              <button class="btn btn-outline-dark" v-on:click="updatePacientById(pacient.id)">Изменить</button>
            </td>
           
            <td>
              <button class="btn btn-outline-dark" v-on:click="deletePacientById(pacient.id)">Удалить</button>
            </td>

            </tr>
        </tbody>
        </table>

          <div class="row">
            <button class="btn btn-success btn-lg btn-block btn" v-on:click="addPacientClicked()">Добавить нового пациента</button>
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

import PacientSer from "@/components/Pacient/PacientSer";

export default {
  name: "PacientAll",
  data() {
      return {
          pacients:[],
          message: null,
      }
  },
  
  methods:{

      refreshCourses(){
          PacientSer.getAllPacients().
          then(response =>{
            console.log(response.data)
            this.pacients = response.data
          });
      },

      deletePacientById(id){
          PacientSer.deletePacientById(id).
          then(response =>{
              console.log(response.data)
              this.message = `Deleting pacient by id ${id} has been successful`
              this.refreshCourses();
              })
          },

        updatePacientById(id){
            this.$router.push({name: 'Pacient Details', params: {id} })
        },

        addPacientClicked() {
            this.$router.push(`/pacients/-1`);
        },

        goToMainPage(){
            this.$router.push(`/`)
        },


  },

  created(){
      this.refreshCourses();
  }

};

</script>

<style>
    @import url(https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css);
</style>