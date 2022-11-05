<template>
  <div class="col">
             <form class="row g-3">
              <div class="col-12">
                     <hr class="style1"> 
                 </div>
                <div class="col-md-6">
                    <label for="inputCPF" class="form-label">Beneficiario CPF: {{customerDocument}} </label>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Nome completo:  {{customerGivenName}}</label>
                </div>
                <div class="col-12">
                <br> 
                    <hr class="style1"> 
                     <br>
                </div>

              <div class="col-md-3">
                    <label for="inputPhoneDDD" class="form-label">Escolha tipo de Especialidade</label>
                    <b-form-select
                        id="typeOccupational"
                        v-model="typeOccupational"
                        :options="optionsList"
                        @change="getSelectedTypeOccupational" 
                    ></b-form-select>
               </div>

                 <div class="col-md-3">
                    <label for="inputPhoneDDD" class="form-label">Escolha o Especialidade</label>
 
                    <b-form-select v-model="occupational">
                        <option v-for="option in occupationalList" v-bind:key="option.uuid">
                                {{ option.description }}
                        </option>
                    </b-form-select>
 
               </div>

                <div class="col-md-3">
                    <label for="inputuf" class="form-label">Escolha o Estado</label>
                    <b-form-select   v-model="ufSelect"    @change="callAPICitys"  >
                    
                     <option
                        v-for="(option, idx) in ufList"
                        :key="idx"
                        :value="option.sigla"
                        :title="option.nome || null"
                    >
                        {{ option.nome }}
                    </option>
                   </b-form-select>
               </div>

              <div class="col-md-3">
                    <label for="inputCity" class="form-label">Escolha o Municipio</label>
                    <b-form-select   v-model="citySelect"   >
                       <option v-for="option in cityList" v-bind:key="option.nome">
                                {{ option.nome }}
                        </option>
                   </b-form-select>
               </div>


                <div class="col-md-3">
                    <label for="inputbirthDate" class="form-label">Data da Consulta</label>
                    <b-form-datepicker  id="inputbirthDate"   v-model="form.scheduledDate" label-no-date-selected="Selecione uma data"
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
import { createAssocieate, getOccupationalList } from '../service/CustomerService'
import { getlistMunicipios } from '../service/BrasilAPIService'


import {listUFs} from '../helper/UFs'

export default {
    name: "Form",

    mixins: [ToastMixin],

    data() {
        return {
              optionsList: [
                    { value: 1, text: "Médico" },
                    { value: 2, text: "Dentista" }   
                ],
            occupationalList:[],
            customerDocument: "",
            customerGivenName: "",
            typeOccupational:{},
            occupational:{},
            ufList:[],
            ufSelect:'',
            cityList:[],
            citySelect: '',
            form: { 
                subject: "",
                description: "",
                status: Status.OPEN,

                accountUuid: "",
                customerUuid:"",
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
            methodSave: "new"
        }
    },
    mounted() {

        var userdata = JSON.parse(localStorage.getItem('userdata'))
        this.customerDocument=userdata.data[0].customer.document
        this.customerGivenName=userdata.data[0].customer.givenName
        this.customerUuid=userdata.data[0].customer.uuid
         
        this.ufList = listUFs;
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

            let payload = {   }


            createAssocieate(payload).then(Response => {
                console.log(Response)

            }).catch(erro => {
                console.log('Erro ao chamar API de associate');
                console.log(erro);
            })

 
        },

        getSelectedTypeOccupational() {
            
         let occ = this.typeOccupational == 1 ? 'MEDICO' : 'ODONTO'; 
 
            getOccupationalList(occ).then(Response => {
                
                this.occupationalList= Response.data;

                }).catch(erro => {
                    console.log('Erro ao chamar API de associate');
                    console.log(erro);
                })
        },

        callAPICitys(){

            getlistMunicipios(this.ufSelect).then(Response => {
                            console.log(Response)
                            this.cityList= Response;

                            }).catch(erro => {
                                console.log('Erro ao chamar API de associate');
                                console.log(erro);
            })
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
  