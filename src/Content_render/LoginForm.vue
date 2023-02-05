<template>
   <div class="container p-4">
       <div class="row mt-3">
           <div class="col-12 col-sm-9 col-md-7 col-lg-5 justify-content-center align-items-center" id="main_div_center">
               <h2 class="text-white text-center">Avaya Login</h2>
               <p class="text-center text-danger">{{ErrorHandeling}}</p>
               <form @submit.prevent="handleLoginSubmit">
                    <div class="row text-white">
                            <label class="form-label">Email Address</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="fa fa-envelope fa-lg"></i></span>
                                    <input type="text" v-model="LoginData.Emailid" placeholder="Enter Email Address" autocomplete="off" class="form-control form-control-lg ml-0" required="required">
                                </div>
                                
                                <label class="form-label">Password</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="fas fa-lock fa-lg" ></i></span>
                                    <input type="password" v-model="LoginData.Password" placeholder="Enter Password" autocomplete="off" class="form-control form-control-lg ml-0" required="required">
                                </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-12 col-md-8 col-lg-10">
                                <button type="submit" class="btn-block btn btn-outline-success btn-lg mt-4">Submit</button>
                            </div>
                        </div>
                </form>
           </div>
       </div>
   </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
export default {
    Name : "Loginform",
    data: () => ({
        LoginData : {
            Emailid: "",
            Password: "",
        },
        ErrorHandeling: "",
    }),
    methods:{
        async handleLoginSubmit(){
            console.log(this.LoginData);
            await axios.post('http://localhost:4000/app/login', this.LoginData)
            .then(response => {
                if(response.data.Token){
                    swal({
                        title: "Successfully Login !!",
                        text: "", 
                        icon: 'success',
                        button: 'OK'
                    }).then(() => {
                        setTimeout(() => {
                            this.$router.push({path : '/home'})
                        },500)
                    })
                }
                else{
                    this.ErrorHandeling = response.data.errormessage;
                }
            })
        }
    }
}



</script>

<style >
    .form-control-md{
        max-width: -webkit-fill-available;
    }
    #main_div_center{
        margin-inline: auto;
        border-radius:0.4rem;
        box-shadow: 0px 0px 8px 0px #000000;
        background-color: #475375;
        height: 31rem;
        position: relative;
        width: auto;
        padding: 5rem 2rem 3rem 2rem;
        border: 2px solid rgb(39, 24, 123);
    }
    .paddingcontainer{
        padding: 1rem 1.2rem;
    }
    .maincontainer{
        margin-top: 4rem;
    }
    @media (max-width: 576px) {
      .responsive-content {
        font-size: 4vw;
      }
    }
    @media (min-width: 768px) {
      .responsive-content {
        font-size: 1.5vw;
      }
    }
</style>