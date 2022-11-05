<template>
    <b-row class="vh-100 vw-100 row-login">
      <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
        <div class="col-8">
          <h2 class="text-center mb-5 title-login">Realize seu cadastro</h2>
  
          <b-form>
            
            <b-form-group
               label="Cpf"
               label-for="Username"
               >
                <b-form-input
                  id="username"
                  type="text"
                  placeholder="53385888034"
                  autocomplete="off"
                  v-model.trim="$v.form.username.$model"
                  :state="getValidation('username')"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  label="E-mail"
                  label-for="email"
                  >
                <b-form-input
                  id="email"
                  type="email"
                  placeholder="joaosilva@email.com"
                  autocomplete="off"
                  v-model.trim="$v.form.email.$model"
                  :state="getValidation('email')"
                ></b-form-input>
              </b-form-group>
  
              <b-form-group  label-for="password"  >

                <label class="d-flex justify-content-between">
                  Senha
                </label>
  
                <b-form-input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  v-model.trim="$v.form.password.$model"
                  :state="getValidation('password')"
                ></b-form-input>
              </b-form-group>


              <b-form-group  label-for="repeatPassword"  >
                
                <label class="d-flex justify-content-between">
                  Repita a Senha
                </label>
  
                <b-form-input
                  id="repeatPassword"
                  type="password"
                  placeholder="Repita sua senha"
                  v-model.trim="$v.form.repeatPassword.$model"
                  :state="getValidation('password')"
                ></b-form-input>
              </b-form-group>
  
              <b-button
                type="button"
                variant="primary"
                block
                @click="register">
                <i class="fas fa-sign-in-alt"></i> Gravar
              </b-button>
  
              <hr>
              <label class="d-flex justify-content-between">

                <small><a href="#" @click="returnLogin" >voltar</a></small>
              </label>
          </b-form>
        </div>
      </b-col>
      <b-col sm="7" class="d-flex justify-content-center align-items-center">
        <img src="../assets/images/login.svg" class="img-login" />
      </b-col>
    </b-row>
  </template>
  
  <script>
  
  import { required, minLength } from "vuelidate/lib/validators";
  import {authSignup} from '../service/AuthService'
  
  export default {
    data() {
      return {
        form: {
          email: "",
          username: "",
          password: "",
          repeatPassword: ""
        }
      }
    },
  
    validations: {
      form: {
        username: {
          required
        },
        email: {
          required
        },
  
        password: {
          required,
          minLength: minLength(6)
        },
        repeatPassword: {
          required,
          minLength: minLength(6)
        },
      }
    },
  
    methods: {
    register() {
        this.$v.$touch();
       
        if(this.$v.$error) {
          return;
        }
        
        let payload={
                      username: this.form.username,
                      email: this.form.email,
                      password: this.form.password,
                      confirmPassword: this.form.confirmPassword 
                      };
  
        authSignup(payload).then(Response =>{
        console.log(Response)
         localStorage.setItem('username', this.form.username)
         this.$router.push({ path: "/loginConfirmCode" })
        
        }).catch(erro =>{
            console.log(`Erro ao chamar API de token ${JSON.stringify(erro)}`);
        })
      },
  
      returnLogin(){
        localStorage.setItem('username', this.form.username)
        this.$router.push({ path: "/login" })
      },
  
      getValidation(field) {
        if(this.$v.form.$dirty === false) {
          return null;
        }
  
        return !this.$v.form[field].$error;
      }
    }
  }
  
  </script>
  
  <style>
  
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }
  
  .row-login {
    margin-left: 0;
  }
  
  .left-login {
    background-color: #F2F2F2;
  }
  
  .title-login {
    font-weight: bold;
  }
  
  .img-login {
    width: 600px;
    height: 600px;
  }
  
  </style>