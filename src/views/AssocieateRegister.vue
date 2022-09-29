<template>
  
    <div class="container mt-2">
      <b-form class="mb-2">
    
        <b-form-group
          label="CPF"
          label-for="customerDocument"
        >
          <b-form-input
            id="customerDocument"
            v-model.trim="$v.form.customerDocument.$model"
            type="number"
            placeholder="João da Silva"
            required
            autocomplete="off"
            :state="getValidation"
            aria-describedby="subject-feedback"
          ></b-form-input>
  
          <b-form-invalid-feedback id="subject-feedback">Campo obrigatório.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          label="Nome"
          label-for="customerGivenName"
        >
          <b-form-input
            id="customerGivenName"
            v-model.trim="$v.form.customerGivenName.$model"
            type="text"
            placeholder="João da Silva"
            required
            autocomplete="off"
            :state="getValidation"
            aria-describedby="customerGivenName-feedback"
          ></b-form-input>
  
          <b-form-invalid-feedback id="customerGivenName-feedback">Campo obrigatório.</b-form-invalid-feedback>
        </b-form-group>
  
        <b-form-group
          label="Data de Nascimento"
          label-for="dateOverdue"
        >
          <b-form-datepicker
            id="dateOverdue"
            v-model="form.dateOverdue"
            label-no-date-selected="Selecione uma data"
            :min="getToday()"
          ></b-form-datepicker>
        </b-form-group>
        
        <b-form-group
          label="E-mail"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="form.customerEmailEmail.$model"
            type="text"
            placeholder="joao@gmail.com"
            required
            autocomplete="off"
            aria-describedby="customerEmailEmail-feedback"

          ></b-form-input>
          <b-form-invalid-feedback id="customerEmailEmail-feedback">Campo obrigatório.</b-form-invalid-feedback>

        </b-form-group>

        <b-form-group
          label="DDD"
          label-for="ddd"
        >
          <b-form-input
            id="ddd"
            v-model="form.customerPhonesDdd.$model"
            type="text"
            placeholder="21"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="CEP"
          label-for="customerAddressesPostcode"
        >
          <b-form-input
            id="customerAddressesPostcode"
            v-model="form.customerAddressesPostcode.$model"
            type="text"
            placeholder="06890-320"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Logradouro"
          label-for="customerAddressesStreetName"
        >
          <b-form-input
            id="customerAddressesStreetName"
            v-model="form.customerAddressesStreetName.$model"
            type="text"
            placeholder="Avenida Brasil"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Número da rua"
          label-for="customerAddressesStreetNumber"
        >
          <b-form-input
            id="customerAddressesStreetNumber"
            v-model="form.customerAddressesStreetNumber.$model"
            type="number"
            placeholder="10"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Complemento"
          label-for="customerAddressesComplement"
        >
          <b-form-input
            id="customerAddressesComplement"
            v-model="form.customerAddressesComplement.$model"
            type="text"
            placeholder="casa 5"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Bairro"
          label-for="customerAddressesDistrict"
        >
          <b-form-input
            id="customerAddressesDistrict"
            v-model="form.customerAddressesDistrict.$model"
            type="text"
            placeholder="centro"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="UF"
          label-for="customerAddressesUf"
        >
          <b-form-input
            id="customerAddressesUf"
            v-model="form.customerAddressesUf.$model"
            type="text"
            placeholder="RJ"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Cidade"
          label-for="customerAddressesCity"
        >
          <b-form-input
            id="customerAddressesCity"
            v-model="form.customerAddressesCity.$model"
            type="text"
            placeholder="Rio de janeiro"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>


        <b-form-group
          label="Status"
          label-for="status"
        >
          <b-form-select
            id="status"
            v-model="form.status"
            :options="optionsList"
          ></b-form-select>
        </b-form-group>
  
  
        <b-button 
          type="submit" 
          variant="outline-primary" 
          @click="saveTask"
        > <i class="fas fa-save"></i> Salvar </b-button>
      </b-form>
    </div>

  </template>
  
  <script>
  import ToastMixin from "@/mixins/toastMixin.js";
  import { required, minLength,maxLength} from "vuelidate/lib/validators";
  import TasksModel from "@/models/TasksModel";
  import Status from "@/valueObjects/status"
  
  import {createAssocieate} from '../service/CustomerService'


  export default {
    name: "Form",
  
    mixins: [ToastMixin],
  
    data() {
      return {
        form: {

          subject: "",
          description: "",
          status: Status.OPEN,
          dateOverdue: "",

          accountUuid: "",
          customerDocument: "",
          customerGivenName: "",

          customerEmailEmail: "",
          customerEmailType: "PESSOAL",

          customerPhonesDdd: "",
          customerPhonesPhoneNumber: "",
          customerPhonesType: "PESSOAL",

          customerAddressesPostcode: "",
          customerAddressesStreetName: "",
          customerAddressesStreetNumber: "",
          customerAddressesComplement: "",
          customerAddressesDistrict: "",
          customerAddressesUf: "",
          customerAddressesCity: "",

        },
        methodSave: "new",
        optionsList: [
          { value: Status.OPEN, text: "Aberto" },
          { value: Status.FINISHED, text: "Concluído" },
          { value: Status.ARCHIVED, text: "Arquivado" }
        ]
      }
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
      if(this.$route.params.taskId){
        this.methodSave = "update";
        this.form = await TasksModel.find(this.$route.params.taskId);
      }
    },
  
    methods: {
      saveTask() {
        this.$v.$touch();
        if(this.$v.$error) return;

        let payload={
                    accountUuid: this.accountUuid,
                    customer: {
                        document: this.customerDocument,
                        givenName: this.customerGivenName,
                        emails: [
                            {
                                email: this.customerEmailEmail,
                                type: this.customerEmailType
                            }
                        ],
                        phones: [
                            {
                                ddd: 21,
                                phoneNumber: this.customerPhonesPhoneNumber,
                                type: this.customerPhonesType
                            }
                        ],
                        addresses: [
                            {
                                postcode: this.customerAddressesPostcode,
                                streetName: this.customerAddressesStreetName,
                                streetNumber: this.customerAddressesStreetNumber,
                                complement: this.customerAddressesComplement,
                                district: this.customerAddressesDistrict,
                                uf: this.customerAddressesUf,
                                city: this.customerAddressesCity
                            }
                        ]
                    }
                }


  
            createAssocieate(payload).then(Response =>{
            
            console.log(Response)
            this.$router.push({ path: "/" })

            }).catch(erro =>{
                console.log('Erro ao chamar API de token');
                console.log(erro);
            })



        if(this.methodSave === "update"){
          this.form.save();
  
          this.showToast("success", "Sucesso!", "Tarefa atualizada com suceso");
          this.$router.push({ name: "list" });
          return;
        }
  
        const task = new TasksModel(this.form);
        task.save();
  
        this.showToast("success", "Sucesso!", "Tarefa criada com suceso");
        this.$router.push({ name: "list" });
      },
  
      getToday() {
        return new Date().toISOString().split("T")[0];
      }
    },
  
    computed: {
      getValidation() {
        if(this.$v.form.subject.$dirty === false) {
          return null;
        }
  
        return !this.$v.form.subject.$error;
      }
    }
  }
  </script>
  