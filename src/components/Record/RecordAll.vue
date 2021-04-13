<template>
  <div>
    <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Запись</div>
    <div class="container">
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Пациент</th>
          <th scope="col">Создание</th>
          <th scope="col">Отделенлие</th>
          <th scope="col">Изменить</th>
          <th scope="col">Удалить</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="record in records" v-bind:key="record.id">
          <td>{{ record.patient.surname + ' ' +record.patient.name }}</td>
          <td>{{ formatDate(record.created_at) }}</td>
          <td>{{ record.department.name }}</td>
          <td>
            <button class="btn btn-outline-dark" v-on:click="updateRecordById(record.id)">Изменить</button>
          </td>

          <td>
            <button class="btn btn-outline-dark" v-on:click="deleteRecordById(record.id)">Удалить</button>
          </td>

        </tr>
        </tbody>
      </table>

      <div class="row">
        <button class="btn btn-success btn-lg btn-block btn" v-on:click="addRecordClicked()">Добавить новую запись
        </button>
      </div>
      <br>
      <div class="row">
        <button class="btn btn-success btn-lg btn-block btn" v-on:click="goToMainPage()">Вернуться на главную страницу
        </button>
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
      records: [],
      message: null,
    }
  },

  methods: {
  formatDate,
    refreshCourses() {
      RecordSer.getAllRecords().then(response => {
        console.log(response.data)
        this.records = response.data
      });
    },

    deleteRecordById(id) {
      RecordSer.deleteRecordById(id).then(response => {
        console.log(response.data)
        this.message = `Deleting record by id ${id} has been successful`
        this.refreshCourses();
      })
    },

    updateRecordById(id) {
      this.$router.push({name: 'Record Details', params: {id}})
    },

    addRecordClicked() {
      this.$router.push(`/records/-1`);
    },

    goToMainPage() {
      this.$router.push(`/`)
    },


  },

  created() {
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