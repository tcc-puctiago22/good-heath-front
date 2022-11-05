<template>
    <b-row class="vh-100 vw-100 row-login">
      <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
        <div class="col-8">
          <h2 class="text-center mb-5 title-login">Realize seu cadastro</h2>
  
          <b-form>
            
            <b-form-group
               label="Informe o código enviado por e-mail"
               label-for="code"
               >
                <b-form-input
                  id="code"
                  type="text"
                  autocomplete="off"
                  v-model.trim="$v.form.confirmationCode.$model"
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
  
  import { required } from "vuelidate/lib/validators";
  import {authConfirmSignUp} from '../service/AuthService'
  
  export default {
    data() {
      return {
        form: {
          confirmationCode: ""
        }
      }
    },
  
    validations: {
      form: {
        confirmationCode: {
          required
        }
      }
    },
  
    methods: {

    register() {
        this.$v.$touch();
       
        if(this.$v.$error) {
          return;
        }
         var username=localStorage.getItem('username', this.form.username)

        
        let payload={
                      username: username,
                      confirmationCode: this.form.confirmationCode,
                      };
  
        authConfirmSignUp(payload).then(Response =>{
        console.log(Response)
         this.$router.push({ path: "/login" })
        }).catch(erro =>{
            console.log(`Erro ao chamar API de token ${JSON.stringify(erro)}`);
        })
      },
  
      returnLogin(){
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
  