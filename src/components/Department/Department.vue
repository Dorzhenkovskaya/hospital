<template>
  <div>
    <div class="p-3 mb-2 bg-success text-white text-center font-weight-bold text-uppercase">Отделение</div>
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
          <label class="font-weight-bold">ID</label>
          <input type="number" class="form-control font-italic" v-model="id" />
        </fieldset>
        <fieldset class="form-group">
          <label class="font-weight-bold">Название</label>
          <input type="text" class="form-control font-italic" v-model="name" />
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

import DepartmentSer from "@/components/Department/DepartmentSer";

export default {
  name: "departmentDetails",
  data() {

    return {
      id: "",
      name: "",
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
    goToLastPage(){
      this.$router.push(`/departments`)
    },

    refreshDepartmentDetails() {
      DepartmentSer.getDepartments(this.id).then(res => {
        this.id = res.data.id;
        this.name = res.data.name;
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
      if (this.errors.length === 0) {
        if (this.id === -1) {
          DepartmentSer.createDepartment(
            {
                id : this.id,
                name : this.name
            }
            ).then(() => {
                this.$router.push("/departments")
            })
        }
        else {
          DepartmentSer.updateDepartment(this.id, {
            id: this.id,
            name : this.name
          }).then(() => {
            this.$router.push("/departments");
          });
        }
      }
    }
  }
  ,
  created() {
    this.refreshDepartmentDetails();
  }
};
</script>

<style>

.container {
  margin-top: 50px;
}
</style>