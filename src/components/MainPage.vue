<template>
  <div>
    <div class="six"><h1><span>Регистратура</span></h1></div>

    <div class="main">
    <div class="container">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Пациенты</th>
        <th scope="col">Записи</th>
        <th scope="col">Отделение</th>
        <th scope="col">Доктор</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <button class="btn btn-warning" @click="goToPacient">Пациенты</button>
        </td>
        <td>
          <button class="btn btn-secondary" @click="goToRecord">Записи</button>
        </td>
        <td>
          <button class="btn btn-warning" @click="goToDepartment">Отделение</button>
        </td>
        <td>
          <button class="btn btn-secondary" @click="goToDoctor">Доктор</button>
        </td>
      </tr>
      </tbody>
    </table>
    </div>
    </div>

    <div class="footer">
      <div class="footer_info">
        <a href="#" class="underlined">Служба поддержки</a> |
        <a href="#" class="underlined">Политика конфиденциальности</a> |
        <div class="footer_text">Позвоните нам
          <a href="tel:8-800-555-01-21">8-800-555-01-21</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {   
    methods:{
        goToPacient(){
            this.$router.push("/pacients")
        },
      goToRecord(){
        this.$router.push("/records")
      },
      goToDepartment(){
        this.$router.push("/departments")
      },
      goToDoctor(){
        this.$router.push("/doctors")
      },
    }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.six {
  background: #28a745;
  padding: 50px 20px;
  text-align: center;
}
.six h1 {
  font-weight: normal;
  font-family: 'Merriweather', serif;
  position: relative;
  display: inline-block;
  margin: 0;
  line-height: 1;
  color: #ffc107;
  font-size: 40px;
  padding: .4em 1em .55em;
}
.six h1:before,
.six h1:after {
  content: "";
  position: absolute;
  width: 60%;
  height: .1em;
  background: #294200;
}
.six h1:before {
  left: 0;
  top: 0;
}
.six h1:after {
  right: 0;
  bottom: 0;
}
.six h1 span:before,
.six h1 span:after {
  content: "";
  position: absolute;
  width: .65em;
  height: .65em;
  border: .1em solid #294200;
  border-radius: 50%;
  box-sizing: border-box;
}
.six h1 span:before {
  top: -.55em;
  left: -.325em;
}
.six h1 span:after {
  bottom: -.55em;
  right: -.325em;
}
@media (max-width: 600px) {
  .six h1 {font-size: 2em;}
}
@media (max-width: 450px) {
  .six h1 {font-size: 1.5em;}
}

.footer {
  background: #28a745;
  position: relative;
  margin: 0 auto;
  height: 130px;
}
.footer .footer_info {
  margin: 0 auto;
  padding-top: 40px;
  width: 377px;
  color: #294200;
  font-size: 15px;
  font-weight: 300;
  line-height: 21px;
  text-align: center;
}

.footer .footer_info a {
  color: #294200;
  font-size: 15px;
  font-weight: 300;
  line-height: 21px;
  text-decoration: none;
}

.underlined {
  text-decoration: underline;
}

@import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
</style>