<template>
    <div class="container p-4">
       <div class="row mt-3">
           <div class="col-12 col-sm-12 col-md-12 col-lg-12 justify-content-center align-items-center">
           <div class="row justify-content-center align-items-center p-3" style="background-color: #475375;border-radius: 5px">
                    <div class="col-auto col-md-5 col-lg-4">
                        <img src="../image_123.jpg" alt="" class="img-fluid rounded">
                    </div>
                    <div class="col-12 col-md-5 col-lg-5 text-white">
                        <form @submit.prevent="submitForm">
                            <div class="row pt-3">
                                <div class="col-12 col-md-6 col-lg-6">
                                    <label class="form-label">First Name</label>
                                    <input type="text" v-model="Registration_data.FirstName" placeholder="Enter First Name" autocomplete="off" class="form-control form-control-md ml-0" required="required">
                                </div>
                                <div class="col-12 col-md-6 col-lg-6">
                                    <label class="form-label">Last Name</label>
                                    <input type="text" v-model="Registration_data.LastName" placeholder="Enter Last Name" autocomplete="off" class="form-control form-control-md ml-0" required="required">
                                </div>
                            </div>
                            <label class="form-label pt-2">Email</label>
                            <div class="input-group mb-3">
                                <input type="email" @input="OnChangeEmailId" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Enter Email id" autocomplete="off" class="form-control form-control-md ml-0" required="required">
                            </div>
                            <p class="text-danger" v-if="!Emilidvalid" for="">{{ErrorEmailid}}</p>
                            <div class="row">
                                <div class="col-6">
                                    <label class="form-label">Date of birth</label>
                                    <input type="date" v-model="Registration_data.DOB" autocomplete="off" class="form-control form-control-md ml-0" required="required">
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Gender</label>
                                    <select v-model="Registration_data.Gender" class="form-select form-select-md" aria-label="Default select example">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <label class="form-label pt-2">Phone Number</label>
                            <div class="input-group mb-3">
                                <input type="number" @input="OnChangePhoneNumber" placeholder="Enter Phone number" autocomplete="off" class="form-control form-control-md ml-0" required="required">
                            </div>
                            <p class="text-danger" v-if="!PhoneNumbervalid">{{ErrorPhoneNumber}}</p>
                            <label class="form-label">Password</label>
                            <div class="input-group mb-3">
                                <input class="form-control" v-model="Registration_data.Password" :type="passwordType" @focus="showPassword = true" @blur="showPassword = false" placeholder="Enter Password" required="required">
                                <span class="input-group-text"><i class="fa fa-eye" :class="{'fa-eye-slash': showPassword}" @click="togglePasswordVisibility"></i></span>
                            </div>
                            <!-- <label for="">{{finalValid}}</label> -->
                            <div class="row justify-content-center">
                                <div class="col-12 col-sm-12 col-md-8 col-md-10">
                                    <button type="submit" :disabled="finalValid == true" class="btn-block btn btn-outline-success btn-md mt-4">Register</button>
                                </div>
                            </div> 
                            </form>
                    </div>
           </div>
       </div>
       </div>
   </div>
   
</template>

<script>
import axios from 'axios';
//import { mapGetters } from 'vuex';
import swal from 'sweetalert';
export default {
    Name: "Signupform",
    /*computed: {
        ...mapGetters([
            'FirstName', 'LastName', 'EmailId','DOB', 'Gender', 'PhoneNumber', 'Password', 'ErrorEmailid',
            'PhoneNumbervalid', 'ErrorPhoneNumber',
        ]),
    },*/
    data: () => ({
        Registration_data : {
            FirstName : "",
            LastName : "",
            EmailId : "",
            DOB: "",
            Gender: "Male",
            PhoneNumber: "",
            Password : "",
        },
        ErrorEmailid: "",
        Emilidvalid:false,
        PhoneNumbervalid: false,
        ErrorPhoneNumber : "",
        finalValid: true,
        showPassword: true
    }),
    beforeUpdate(){
        if(this.PhoneNumbervalid && this.Emilidvalid){
            this.finalValid = false
        }
        else{
            this.finalValid = true
        }
    },
    computed : {
        passwordType(){
            return this.showPassword ? 'password' : 'text'
        }
    },
    methods:{
        togglePasswordVisibility(){
            this.showPassword = !this.showPassword;
        },
        async OnChangePhoneNumber(event){
            this.Registration_data.PhoneNumber = event.target.value;
            if(event.target.value.length < 10){
                this.PhoneNumbervalid = false;
                this.ErrorPhoneNumber = "Please enter 10 digit Phone Number";
            }
            else{
                await axios.get(`http://localhost:4000/app/user_sign_up_details/userPhone/${this.Registration_data.PhoneNumber}`)
                .then(response => {
                    if(response.data.data[0].PhoneNumberCount == 0){
                        this.PhoneNumbervalid= true,
                        this.ErrorPhoneNumber = ""
                        console.log()
                    }
                    else{
                        this.PhoneNumbervalid= false,
                        this.ErrorPhoneNumber = "Phone Number already registered"
                    }
                })
            }
        },
        async OnChangeEmailId(event){
            this.Registration_data.EmailId = event.target.value;
            await axios.get(`http://localhost:4000/app/user_sign_up_details/userEmail/${this.Registration_data.EmailId}`)
            .then(response => {
                if(response.data.data[0].EmailIDCount === 0){
                    this.Emilidvalid= true,
                    this.ErrorEmailid = ""
                }
                else{
                    this.Emilidvalid= false,
                    this.ErrorEmailid = "Email ID already registered"
                }
            })
        },
        async submitForm(){
            console.log(this.Registration_data);
            await axios.post('http://localhost:4000/app/signupUser/', this.Registration_data)
            .then(response => {
                console.log(response);
            })
            swal({
                title: "Successfully Registered !!",
                text: "", 
                icon: 'success',
                button: 'OK'
            }).then(() => {
                setTimeout(() => {
                    this.$router.push({path : '/login'})
                },500)
            })
        }
    }          
}   
</script>

<style>

</style>