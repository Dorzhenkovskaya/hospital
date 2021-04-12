<template>
    <div>
      <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Отделение</div>
        <div class="container">
        <table class="table table-hover">
        <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Изменить</th>
              <th scope="col">Удалить</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="department in departments" v-bind:key="department.id">
              <td>{{department.name}}</td>
            <td>
              <button class="btn btn-outline-dark" v-on:click="updateDepartmentById(department.id)">Изменить</button>
            </td>

            <td>
              <button class="btn btn-outline-dark" v-on:click="deleteDepartmentById(department.id)">Удалить</button>
            </td>

            </tr>
        </tbody>
        </table>

          <div class="row">
            <button class="btn btn-success btn-lg btn-block btn" v-on:click="addDepartmentClicked()">Добавить новое отделение</button>
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

import DepartmentSer from "@/components/Department/DepartmentSer";

export default {
  name: "DepartmentAll",
  data() {
      return {
          departments:[],
          message: null,
      }
  },

  methods:{

      refreshCourses(){
        DepartmentSer.getAllDepartments().
          then(response =>{
            console.log(response.data)
            this.departments = response.data
          });
      },

      deleteDepartmentById(id){
        DepartmentSer.deleteDepartmentById(id).
          then(response =>{
              console.log(response.data)
              this.message = `Deleting department by id ${id} has been successful`
              this.refreshCourses();
              })
          },

        updateDepartmentById(id){
            this.$router.push({name: 'Department Details', params: {id} })
        },

        addDepartmentClicked() {
            this.$router.push(`/departments/-1`);
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