<template>
  <div>
    <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Доктор</div>
    <div class="container">

      <form @submit="validateAndSubmit">

        <div v-if="errors.length">
          <div
              v-for="(error, index) in errors"
              v-bind:key="index"
              class="alert alert-warning"
          >{{ error }}
          </div>
        </div>

        <fieldset class="form-group">
          <label class="font-weight-bold">ID</label>
          <input v-model="id" class="form-control font-italic" type="text"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Имя</label>
          <input v-model="name" class="form-control font-italic" type="text"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Фамилия</label>
          <input v-model="surname" class="form-control font-italic" type="text"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Отчество</label>
          <input v-model="patronymic" class="form-control font-italic" type="text"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Специализация</label>
          <input v-model="specialization" class="form-control font-italic" type="text"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Отделение</label>
          <input v-model="department_id" class="form-control font-italic" type="text"/>
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

import DoctorSer from "@/components/Doctor/DoctorSer";

export default {
  name: "doctorDetails",
  data() {

    return {
      id: "",
      name: "",
      surname: "",
      patronymic: "",
      specialization: "",
      department_id: "",
      errors: []
    };

  },

  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    id() {
      return parseInt(this.$route.params.id);
    }
  },

  methods: {
    goToLastPage() {
      this.$router.push(`/doctors`)
    },

    refreshDoctorDetails() {
      DoctorSer.getDoctors(this.id).then(res => {
        this.id = res.data.id;
        this.name = res.data.name;
        this.surname = res.data.surname;
        this.patronymic = res.data.patronymic;
        this.specialization = res.data.specialization;
        this.department_id = res.data.department_id;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.id) {
        this.errors.push("Неверные данные");
      }
      if (!this.name) {
        this.errors.push("Неверные данные");
      }
      if (!this.surname) {
        this.errors.push("Неверные данные");
      }
      if (!this.patronymic) {
        this.errors.push("Неверные данные");
      }
      if (!this.specialization) {
        this.errors.push("Неверные данные");
      }
      if (!this.department_id) {
        this.errors.push("Неверные данные");
      }
      if (this.errors.length === 0) {
        if (this.id === -1) {
          DoctorSer.createDoctor(
              {
                id: this.id,
                name: this.name,
                surname: this.surname,
                patronymic: this.patronymic,
                specialization: this.specialization,
                department_id: this.department_id
              }
          ).then(() => {
            this.$router.push("/doctors")
          })
        } else {
          DoctorSer.updateDoctor(this.id, {
            id: this.id,
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            specialization: this.specialization,
            department_id: this.department_id
          }).then(() => {
            this.$router.push("/doctors");
          });
        }
      }
    }
  }
  ,
  created() {
    this.refreshDoctorDetails();
  }
};
</script>

<style>

.container {
  margin-top: 50px;
}
</style>