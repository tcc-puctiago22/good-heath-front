<template>
  <div class="col">
             <form class="row g-3">
                <div class="col-md-3">
                    <label for="inputCPF" class="form-label">CPF</label>
                    <input type="number" class="form-control" id="inputCPF"  v-model="form.customerDocument" >
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Nome completo</label>
                    <input type="text" class="form-control" id="inputPassword4"  v-model="form.customerGivenName" > 
                </div>

                <div class="col-md-3">
                    <label for="inputbirthDate" class="form-label">Data de Nascimento</label>
                    <b-form-datepicker  id="inputbirthDate"   v-model="form.birthDate" label-no-date-selected="Selecione uma data"
                    ></b-form-datepicker>
                </div>
               <div class="col-md-2">
                    <label for="inputPhoneDDD" class="form-label">DDD</label>
                    <input type="number" class="form-control" id="inputPhoneDDD"  v-model="form.phonesDdd" >
                </div>
                <div class="col-md-3">
                    <label for="phonesPhoneNumber" class="form-label">Número do Telefone</label>
                    <input type="text" class="form-control" id="phonesPhoneNumber"  v-model="form.phonesPhoneNumber" > 
                </div>
                
                <div class="col-md-7">
                    <label for="inputEmail" class="form-label">E-mail</label>
                    <input type="text" class="form-control" id="inputEmail"  v-model="form.email" > 
                </div>

                <div class="col-12"> 
                    <hr class="style1"> 
                </div>

                <div class="col-md-3">
                    <label for="imputaddressesPostcode" class="form-label">CEP</label>
                    <input type="text" class="form-control" id="imputaddressesPostcode"  @keyup="searchCep()" v-model="form.addressesPostcode">
                </div>
                  
                <div class="col-9">
                    <label for="inputaddressesStreetName" class="form-label">Logradouro</label>
                    <input type="text" class="form-control" id="inputddressesStreetName"  v-model="form.adressesStreetName">
                </div>
                <div class="col-2">
                    <label for="inputaddressesStreetNumber" class="form-label">Número</label>
                    <input type="text" class="form-control" id="inputaddressesStreetNumber"  v-model="form.addressesStreetNumber">
                </div>
                <div class="col-md-3">
                    <label for="inputaddressesComplement" class="form-label">Complemento</label>
                    <input type="text" class="form-control" id="inputaddressesComplement"   v-model="form.addressesComplement">
                </div>

                <div class="col-md-3">
                    <label for="inputaddressesDistrict" class="form-label">Bairro</label>
                    <input type="text" class="form-control" id="inputaddressesDistrict"   v-model="form.addressesDistrict">
                </div>


                <div class="col-md-3">
                    <label for="imputaddressesCity" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="imputaddressesCity"   v-model="form.addressesCity">
                </div>
                <div class="col-md-2">
                    <label for="inputaddressesUf" class="form-label">UF</label>
                    <input type="text" class="form-control" id="inputaddressesUf"   v-model="form.addressesUf">
                </div>
                 

                <div class="col-12"> 
                    <hr class="style1"> 
                </div>
 
                 <div class="col-12">
                 <button type="button" class="btn btn-primary"  @click="saveAssociate"> Salvar</button>
                </div>
                 <div class="col-12"> 
                    <hr class="style1"> 
                    <br>
                </div>
            </form>
    </div>
</template>
  
<script>
import ToastMixin from "@/mixins/toastMixin.js";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import TasksModel from "@/models/TasksModel";
import Status from "@/valueObjects/status"
import { getUsernameByToken, getEmailByToken } from '../helper/helper'

import { createAssocieate } from '../service/CustomerService'
import { getVIACEP } from '../service/CEPService'

export default {
    name: "Form",

    mixins: [ToastMixin],

    data() {
        return {
            form: { 
                subject: "",
                description: "",
                status: Status.OPEN,

                accountUsername: "",
                customerDocument: "",
                customerGivenName: "",
                birthDate: "",

                email: "",
                emailType: "PESSOAL",

                phonesDdd: "",
                phonesPhoneNumber: "",
                phonesType: "PESSOAL",

                adressesStreetName: "",
                addressesStreetNumber: "",
                addressesComplement: "",
                addressesPostcode: "",
                addressesDistrict: "",
                addressesUf: "",
                addressesCity: "",

            },
            methodSave: "new",
            optionsList: [
                { value: Status.OPEN, text: "Aberto" },
                { value: Status.FINISHED, text: "Concluído" },
                { value: Status.ARCHIVED, text: "Arquivado" }
            ]
        }
    },
    mounted() {
        var token = localStorage.getItem('token')
        var descode = getUsernameByToken(token)
        var emailToken = getEmailByToken(token)

        this.form.email= emailToken
        this.form.customerDocument = descode
        console.log('a é: ' + this.form.customerDocument)
    },
    validations: {
        form: {
            subject: {
                required,
                minLength: minLength(3)
            },
            customerDocument: {
                required,
                maxLength: maxLength(11)
            },
            customerGivenName: {
                required,
                maxLength: maxLength(11)
            },

            customerEmailEmail: {
                required,
                maxLength: maxLength(100)
            },

            customerPhonesDdd: {
                required
            },
            customerPhonesPhoneNumber: {
                required
            }
        }
    },

    async created() {
        if (this.$route.params.taskId) {
            this.methodSave = "update";
            this.form = await TasksModel.find(this.$route.params.taskId);
        }
    },

    methods: {

        saveAssociate() {

          console.log('aki...')

            let payload = {
                accountUsername: this.form.customerDocument,
                type: 'OWNER',
                birthDate: this.form.birthDate, 
                customer: {
                    document: this.form.customerDocument,
                    givenName: this.form.customerGivenName,
                    emails: [{
                        email: this.form.email,
                        type: this.form.emailType
                    }],
                    phones: [{
                        ddd: this.form.phonesDdd,
                        phoneNumber: this.form.phonesPhoneNumber,
                        type: this.form.phonesType
                    }],
                    addresses: [{
                        postcode: this.form.addressesPostcode,
                        streetName: this.form.adressesStreetName,
                        streetNumber: this.form.addressesStreetNumber,
                        complement: this.form.addressesComplement,
                        district: this.form.addressesDistrict,
                        uf: this.form.addressesUf,
                        city: this.form.addressesCity
                    }]
                }
            }


            createAssocieate(payload).then(Response => {

                console.log(Response)
                this.$router.push({ path: "/schedule" })

            }).catch(erro => {
                console.log('Erro ao chamar API de associate');
                console.log(erro);
            })

 
        }, 
        searchCep(){

           if(this.form.addressesPostcode.length==8){
                getVIACEP(this.form.addressesPostcode).then(Response => {
                     this.form.adressesStreetName=Response.street,
                     this.form.addressesDistrict=Response.neighborhood,
                     this.form.addressesUf=Response.state,
                     this.form.addressesCity=Response.city
    
                }).catch(erro => {
                    console.log('Erro ao chamar API de associate');
                    console.log(erro);
                })
           }
           
        }
    },

    computed: {
        getValidation() {
            if (this.$v.form.subject.$dirty === false) {
                return null;
            }

            return !this.$v.form.subject.$error;
        }
    }
}
</script>
  