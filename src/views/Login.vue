<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">Faça o login</h2>

        <b-form>
          <b-form-group
            label="Username [CPF]"
            label-for="email"
            >
              <b-form-input
                id="email"
                type="email"
                placeholder="91593529066"
                autocomplete="off"
                :state="getValidationCPF('email')"
                v-model.trim="$v.form.email.$model"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-for="password"
            >
              <label class="d-flex justify-content-between">
                Senha
                <small><a href="#">Esqueceu sua senha?</a></small>
              </label>

              <b-form-input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                v-model.trim="$v.form.password.$model"
                :state="getValidation('password')"
              ></b-form-input>
            </b-form-group>

            <b-button
              type="button"
              variant="primary"
              block
              @click="login">
              <i class="fas fa-sign-in-alt"></i> Entrar
            </b-button>

            <hr>

            <b-button
              type="button"
              variant="outline-secondary"
              block
              @click="register">
              <i class="fas fa-user-plus"></i> Não tenho conta
            </b-button>
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
import {authToken} from '../service/AuthService'
import {getAssocieateByAccount} from '../service/CustomerService'
import {getUsernameByToken, validateCPF} from '../helper/helper'

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },

  validations: {
    form: {
      email: {
        required
      },

      password: {
        required,
        minLength: minLength(6)
      },
    }
  },

  methods: {
    login() {
      this.$v.$touch();
      if(this.$v.$error) {
        return;
      }
     let isCpfValid = validateCPF(this.form.email)
console.log(isCpfValid)

    if(this.$v.$error) {
        return;
      }
     
        let payload={
                    username: this.form.email,
                    password: this.form.password 
                    };

      authToken(payload).then(Response =>{

       localStorage.setItem('token', Response.token)
       var descode = getUsernameByToken(Response.token)
          
          getAssocieateByAccount(descode).then(Response =>{

            if(Response.data.length==0){
              this.$router.push({ path: "/associeateRegister" })

            }else{
             localStorage.setItem('userdata', JSON.stringify(Response))
             this.$router.push({ path: "/schedule" })

            }

          }).catch(erro =>{
              console.log('Erro ao chamar API de token');
             console.log(erro);
          })
        


      }).catch(erro =>{
          console.log('Erro ao chamar API de token');
         console.log(erro);
      })
    },

    register() {
      this.$router.push({ path: "/LoginRegister" })

    },

    getValidation(field) {
      if(this.$v.form.$dirty === false) {
        return null;
      }

      return !this.$v.form[field].$error;
    },
     getValidationCPF(field) {

      if(this.$v.form.$dirty === false) {
        return null;
      }
      if(!this.$v.form[field].$error){
         return validateCPF(this.form.email)
      }
 
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
