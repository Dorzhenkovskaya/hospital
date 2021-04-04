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
          <label class="font-weight-bold">ID пациента</label>
          <input type="text" class="form-control font-italic" v-model="patient_id"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Создание</label>
          <input type="text" class="form-control font-italic" v-model="created_at"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Отделение</label>
          <input type="text" class="form-control font-italic" v-model="department_id"/>
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

export default {
  name: "recordDetails",
  data() {

    return {
      patient_id: "",
      created_at: "",
      department_id: "",
      errors: []
    };

  },

  computed: {
    id() {
      return parseInt(this.$route.params.id);
    }
  },

  methods: {
    goToLastPage() {
      this.$router.push(`/records`)
    },

    refreshRecordDetails() {
      RecordSer.getRecords(this.id).then(res => {
        this.patient_id = res.data.patient_id;
        this.created_at = res.data.created_at;
        this.department_id = res.data.department_id;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.patient_id) {
        this.errors.push("Неверные данные");
      }
      if (!this.created_at) {
        this.errors.push("Неверные данные");
      }
      if (!this.department_id) {
        this.errors.push("Неверные данные");
      }

      if (this.errors.length === 0) {
        if (this.id === -1) {
          RecordSer.createRecord(
              {
                patient_id: this.patient_id,
                created_at: this.created_at,
                department_id: this.department_id
              }
          ).then(() => {
            this.$router.push("/records")
          })
        } else {
          RecordSer.updateRecord(this.id, {
            id: this.id,
            patient_id: this.patient_id,
            created_at: this.created_at,
            department_id: this.department_id
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
  }
};
</script>

<style>

.container {
  margin-top: 50px;
}
</style>