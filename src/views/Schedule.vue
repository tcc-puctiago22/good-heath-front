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
                <label for="inputuf" class="form-label">Escolha o Estado</label>
                <b-form-select v-model="ufSelect" @change="callAPICitys">
    
                    <option v-for="(option, idx) in ufList" :key="idx" :value="option.sigla" :title="option.nome || null">
                        {{ option.nome }}
                    </option>
                </b-form-select>
            </div>
    
            <div class="col-md-3">
                <label for="inputCity" class="form-label">Escolha o Municipio</label>
                <b-form-select v-model="citySelect"  @change="callAPIPartnerList" >
                    <option v-for="option in cityList" v-bind:key="option.nome">
                        {{ option.nome }}
                    </option>
                </b-form-select>
            </div>

              <div class="col-md-4">
                <label for="inputbirthDate" class="form-label">Data da Consulta</label>
                <b-form-datepicker id="inputbirthDate" v-model="scheduledDate" label-no-date-selected="Selecione uma data"></b-form-datepicker>
            </div>


            <div class="col-md-2">
                <label for="inputuf" class="form-label">Escolha a Hora</label>
                <b-form-select v-model="scheduledTime" >
    
                    <option v-for="(option, idx) in listTime" :key="idx" :value="option.init" :title="option.init || null">
                        {{ option.init }} -  {{ option.finsh }}
                    </option>
                </b-form-select>
            </div>

             <div class="col-md-12">
                <br>
                <hr class="style1">
                <br>
            </div>

            <div class="col-md-2">
                <label for="inputPhoneDDD" class="form-label">Escolha tipo</label>
                <b-form-select id="typeOccupational" v-model="typeOccupational" :options="optionsList" @change="getSelectedTypeOccupational"></b-form-select>
            </div>
    
            <div class="col-md-3">
                <label for="inputPhoneDDD" class="form-label">Especialidade</label>
    
                <b-form-select v-model="occupational"  @change="getProviderList">
                    <option v-for="option in occupationalList" v-bind:key="option.uuid">
                        {{ option.description }}
                    </option>
                  
                </b-form-select>
    
            </div>


            <div class="col-md-3">
                <label for="inputPhoneDDD" class="form-label">Escolha o Especialidade</label>
    
                <b-form-select v-model="providerUuid">
                      <option v-for="(option, idx) in providerList" :key="idx" :value="option.uuid" :title="option.uuid || null">
                        {{ option.customer.givenName }}
                    </option>
                </b-form-select>
            </div>

             <div class="col-md-3">
                <label for="inputPhoneDDD" class="form-label">Escolha a Unidade</label>
    
                <b-form-select v-model="partnerUuid">
                     <option v-for="(option, idx) in partnerList" :key="idx" :value="option.uuid" :title="option.uuid || null">
                        {{ option.customer.givenName }}
                    </option>

                </b-form-select>
            </div>  
    
            <div class="col-12">
                <hr class="style1">
            </div>
    
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="saveSchedule"> Salvar</button>
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
import { getOccupationalList ,getProviderList, getPartnerList} from '../service/CustomerService'
import { createSchedule } from '../service/ScheduleService'
import { getlistMunicipios } from '../service/BrasilAPIService'

import { listHora } from '../helper/HoraHelper'
import { listUFs } from '../helper/UFs'

export default {
    name: "Form",

    mixins: [ToastMixin],

    data() {
        return {
            optionsList: [
                { value: 1, text: "Médico" },
                { value: 2, text: "Dentista" }
            ],
            scheduledDate:"",
            occupationalList: [],
            customerDocument: "",
            customerGivenName: "",
            typeOccupational: {},
            occupational: {},
            ufList: [],
            ufSelect: '',
            cityList: [],
            citySelect: '',
            providerList:[], 
            providerUuid:"",
            partnerUuid:"",
            methodSave: "new",
            listTime:[],
            scheduledTime:"",
            partnerList:[]
        }
    },
    mounted() {

        var userdata = JSON.parse(localStorage.getItem('userdata'))
        this.customerDocument = userdata.data[0].customer.document
        this.customerGivenName = userdata.data[0].customer.givenName
        this.customerUuid = userdata.data[0].customer.uuid

        this.ufList = listUFs;
        this.listTime=listHora
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

        saveSchedule() {

            let payload = { 
                associeateUuid: this.customerUuid,
                providerUuid: this.providerUuid,
                partnerUuid: this.partnerUuid,

                scheduledDate: this.scheduledDate,
                scheduledTime: this.scheduledTime
            }
 
            createSchedule(payload).then(Response => {
                console.log(Response)

            }).catch(erro => {
                console.log('Erro ao chamar API de associate');
                console.log(erro);
            })


        },

        getSelectedTypeOccupational() {

            let occ = this.typeOccupational == 1 ? 'MEDICO' : 'ODONTO';

            getOccupationalList(occ).then(Response => {

                this.occupationalList = Response.data;

            }).catch(erro => {
                console.log('Erro ao chamar API de associate');
                console.log(erro);
            })
        },

        getProviderList(){

            let query = `?occupationDescription=${this.occupational}`

            getProviderList(query).then(Response => {
 
             this.providerList=Response.data

            }).catch(erro => {
                console.log('Erro ao chamar API ');
                console.log(erro);
            })

            },

        callAPICitys() {

            getlistMunicipios(this.ufSelect).then(Response => {
                 this.cityList = Response;

            }).catch(erro => {
                console.log('Erro ao chamar API de associate');
                console.log(erro);
            })
        },

        callAPIPartnerList(){

            let query = `?city=${this.citySelect}`

              getPartnerList(query).then(Response => {
                console.log(Response.data)
                this.partnerList = Response.data;

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
  