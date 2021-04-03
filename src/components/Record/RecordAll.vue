<template>
    <div>
      <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Запись</div>
        <div class="container">
        <table class="table table-hover">
        <thead>
            <tr>
              <th scope="col">ID пациента</th>
              <th scope="col">Создание</th>
              <th scope="col">Отделение</th>
              <th scope="col">Пациент</th>
              <th scope="col">Изменить</th>
              <th scope="col">Удалить</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in records" v-bind:key="record.id">
              <td>{{record.pacient_id}}</td>
              <td>{{record.created_at}}</td>
              <td>{{record.deparment_id}}</td>
              <td>{{record.pacient_id1}}</td>
            <td>
              <button class="btn btn-outline-dark" v-on:click="updatePacientById(record.id)">Изменить</button>
            </td>

            <td>
              <button class="btn btn-outline-dark" v-on:click="deletePacientById(record.id)">Удалить</button>
            </td>

            </tr>
        </tbody>
        </table>

          <div class="row">
            <button class="btn btn-success btn-lg btn-block btn" v-on:click="addRecordClicked()">Добавить новую запись</button>
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

import RecordSer from "@/components/Record/RecordSer";

export default {
  name: "RecordAll",
  data() {
      return {
          records:[],
          message: null,
      }
  },

  methods:{

      refreshCourses(){
          RecordSer.getAllRecords().
          then(response =>{
            console.log(response.data)
            this.records = response.data
          });
      },

      deleteRecordById(id){
        RecordSer.deleteRecordById(id).
          then(response =>{
              console.log(response.data)
              this.message = `Deleting record by id ${id} has been successful`
              this.refreshCourses();
              })
          },

        updateRecordById(id){
            this.$router.push({name: 'Record Details', params: {id} })
        },

        addRecordClicked() {
            this.$router.push(`/records/-1`);
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