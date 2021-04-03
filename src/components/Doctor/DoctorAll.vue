<template>
    <div>
      <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Доктор</div>
        <div class="container">
        <table class="table table-hover">
        <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Имя</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Отчество</th>
              <th scope="col">Специализация</th>
              <th scope="col">Отделение</th>
              <th scope="col">Изменить</th>
              <th scope="col">Удалить</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="doctor in doctors" v-bind:key="doctor.id">
              <td>{{doctor.id}}</td>
              <td>{{doctor.name}}</td>
              <td>{{doctor.surname}}</td>
              <td>{{doctor.patronymic}}</td>
              <td>{{doctor.specialization}}</td>
              <td>{{doctor.department_id}}</td>
            <td>
              <button class="btn btn-outline-dark" v-on:click="updateDoctorById(doctor.id)">Изменить</button>
            </td>

            <td>
              <button class="btn btn-outline-dark" v-on:click="deleteDoctorById(doctor.id)">Удалить</button>
            </td>

            </tr>
        </tbody>
        </table>

          <div class="row">
            <button class="btn btn-success btn-lg btn-block btn" v-on:click="addDoctorClicked()">Добавить нового доктора</button>
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

import DoctorSer from "@/components/Doctor/DoctorSer";

export default {
  name: "DoctorAll",
  data() {
      return {
          doctors:[],
          message: null,
      }
  },

  methods:{

      refreshCourses(){
        DoctorSer.getAllDoctors().
          then(response =>{
            console.log(response.data)
            this.doctors = response.data
          });
      },

      deleteDoctorById(id){
        DoctorSer.deleteDoctorById(id).
          then(response =>{
              console.log(response.data)
              this.message = `Deleting doctor by id ${id} has been successful`
              this.refreshCourses();
              })
          },

        updateDoctorById(id){
            this.$router.push({name: 'Doctor Details', params: {id} })
        },

        addDoctorClicked() {
            this.$router.push(`/doctors/-1`);
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