import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';

Vue.use(Vuex);

const url = "https://randomuser.me/api/";
const header= {Accept: "application/json"};
export default new Vuex.Store({
    state: {
        crop_category_list : [],
        perchaser_information : [],
        crop_name_list: [],
        purchaser_info_flag: false,
        error_message: '',
        crop_status_pop_up :'',
        crop_id: '',
        email_id:'',
        crop_category: '',
        crop_status: '',
        crop_name: '',
        farmer_email:[],
        farmer_email_single:"",
        crop_names: [],
        crop_price: [],
        color: [],
        chartdata: null,
        piedata: null,
        piedatalist: [],
        crop_statuslist: [],
        options: null,
        loaded_email: false,
        loaded_crop_status: false,
        data_present: false,
        single_color: '',
        loading_farmer_data: false,
        FarmerData: [],
        Farmer_details_list: [],
        color1: [],
        crop_price_list1: [],
        crop_price_list2: [],
        crop_price_list3: [],
        crop_price_list4: [],
        crop_names_all_list: [],
        side_bar_status : false,
        bar_status : true,
        UserData: "",
        ErrorHandeling: false,
        //table content
        pincode : "",
        addressdata : [],
        address_flag : false,
        loading_status: false,
        font_aw_icon: null,
        newData_pincode: [],
        item_per_page: 7,
        Error_message: "Please Enter 6 Digit Pincode"
    },
    mutations: { //syncronus
        side_bar_statusmutateA(state){
            state.bar_status = !state.bar_status;
            state.side_bar_status = !state.side_bar_status;
        },
        commitpincodeInput(state, event){
            state.pincode = event
        },
        side_bar_statusmutateB(state){
            state.bar_status = !state.bar_status;
            state.side_bar_status = !state.side_bar_status;
        },
        getcrop_caterory(state, event){
            state.crop_category = event;
        },
        getcrop_id(state, event){
            state.crop_id = event;
        },
        getemailid(state, event){
            state.email_id = event;
        },
        getcrop_name(state, event){
            state.crop_name = event;
        },
        getcrop_status(state, event){
            state.crop_status = event;
        },
        getallcrop_category(state, event){
            state.crop_category_list = event;
        },
        getCropNames(state,payload){
            state.crop_name_list = payload
        },
        getallcrop_data_lengthmore(state,payload){
            state.address_flag = true;
            state.font_aw_icon = "";
            state.newData = payload;
        },
        getallcrop_data_lengthless(state){
            state.address_flag = false;
            state.Error_message = "No Data Found";
            state.font_aw_icon = ""
        },
        getIntialState(state){
            state.address_flag = false
            state.loading_status = true
            state.font_aw_icon = "fa fa-spinner fa-pulse fa-3x fa-fw"
            state.Error_message = "";
            state.newData = [];
            state.crop_id = "";
            state.email_id= "";
            state.crop_name= "";
            state.crop_status= "";
            state.crop_category= "";
        },
        showdetailsactions(state, crop_status){
            state.crop_status_pop_up = crop_status;
        },
        getfarmerList(state,payload){
            state.farmer_email = payload
        },
        getinitialchartdata(state){
            state.data_present = true
            state.color = [];
            state.chartdata = [];
            state.crop_names= [];
            state.crop_price= [];
            state.piedata = null;
            state.piedatalist = [];
            state.crop_statuslist = [];
            state.loaded_email = false;
            state.loaded_crop_status = false;
        },
        storecrop_statuslist(state, payload){
            state.loaded_crop_status = true
            for(let i=0; i<payload.length; i++){
                state.crop_statuslist.push(payload[i].crop_status);
                state.piedatalist.push(payload[i].Approved_count);
            }
        },
        storecrop_names_crop_price(state, payload){
            state.loaded_email = true
            for(let i=0; i<payload.length; i++){
                state.crop_names.push(payload[i].crop_name);
                state.crop_price.push(payload[i].crop_price);
            }
        },
        storecolors(state,payload){
            for(let i = 0;i<payload.length;i++){
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                state.color.push("rgb(" + r + "," + g + "," + b + ")");
            }
        },
        storechartdata(state){
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            state.single_color = "rgb(" + r + "," + g + "," + b + ")";
            state.chartdata = {
                labels: state.crop_names,
                datasets: [
                    {
                        label: state.farmer_email_single,
                        data: state.crop_price,
                        backgroundColor: state.single_color,
                        borderColor: state.single_color,
                        borderWidth: 1
                    }
                ]
            }
        },
        storepiedata(state){
            state.piedata = {
                labels: state.crop_statuslist,
                datasets: [
                    {
                        label: "#users",
                        data: state.piedatalist,
                        backgroundColor: state.color,
                        borderColor: state.color,
                        borderWidth: 1
                    }
                ]
            }
        },
        storestyle(state){
            state.options = {
                scales: {
                    xAxes:[
                    {
                        ticks: {
                        beginAtZero: true,
                        fontColor: "white",
                    },
                    }],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white",
                        },
                    }
                ]
                },
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'white'
                    }
                },
                maintainAspectRatio : false,
                    title: {
                        display:true,
                        text: ""
                    }
            }
        },
        getselectedemailid(state, event){
            state.farmer_email_single = event
        },
        changedata_present_status(state){
            state.data_present = false
        },
        async getallfarmerdetails(state,payload){
            state.crop_price_list1 = []
            state.crop_price_list2 = []
            state.FarmerData = []
            state.loading_farmer_data=true

            for(let i = 0;i<4;i++){
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                state.color1.push("rgb(" + r + "," + g + "," + b + ")");
            }

            for(let i=0;i<payload.length;i++){
                await axios.get(`http://localhost:4000/app/getcropnamesprice/${payload[i].E_mail_id}`)
                .then(res => {
                    state.FarmerData.push(res.data.data);
                    switch(i){
                        case 0:{
                            for(var j=0;j<state.FarmerData[0].length;j++){
                                state.crop_price_list1.push(Math.random(30)*100)
                            }
                            break
                        }
                        case 1:{
                            for(var k=0;k<state.FarmerData[0].length;k++){
                                state.crop_price_list2.push(Math.random(30)*100)
                            }
                            break
                        }
                        case 2:{
                            for(var l=0;l<state.FarmerData[0].length;l++){
                                state.crop_price_list3.push(Math.random(30)*100)
                            }
                            break
                        }
                        case 3: {
                            for(var m=0;m<state.FarmerData[0].length;m++){
                                state.crop_price_list4.push(Math.random(30)*100)
                            }
                            break
                        }
                    }
                })
            }  
            await axios.get(`http://localhost:4000/app/getcropnamesprice/${payload[0].E_mail_id}`)
            .then(res => {
                for(let i=0;i<res.data.data.length;i++){
                    state.crop_names_all_list.push(res.data.data[i].crop_name);
                }
                state.Farmer_details_list = {
                    labels: state.crop_names_all_list,
                    datasets: [
                        {
                            label: payload[0].E_mail_id,
                            data: state.crop_price_list1,
                            backgroundColor: state.color1[0],
                            borderColor: state.color1[0],
                            borderWidth: 1
                        },
                        {
                            label: payload[1].E_mail_id,
                            data: state.crop_price_list2,
                            backgroundColor: state.color1[1],
                            borderColor: state.color1[1],
                            borderWidth: 1
                        },
                        {
                            label: payload[2].E_mail_id,
                            data: state.crop_price_list3,
                            backgroundColor: state.color1[2],
                            borderColor: state.color1[2],
                            borderWidth: 1
                        },
                        {
                            label: payload[3].E_mail_id,
                            data: state.crop_price_list4,
                            backgroundColor: state.color1[3],
                            borderColor: state.color1[3],
                            borderWidth: 1
                        }
                    ]
                }
            })
        },
        async Logged_user_dataaction(state){
            await axios.get('http://localhost:4000/app/logged_user')
                .then(response => {
                    state.UserData = response.data;
                    if(response.data.data == null){
                        //window.location.replace("/");
                        state.ErrorHandeling = false
                    }
                    else{
                        state.ErrorHandeling = true
                    }
                })
        },
        Logoutcommit(state){
            swal({
                title: 'Do you want to logout ?',
                icon: 'warning',
                buttons: ["Cancel", "Yes"],
                dangerMode: true,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result) {
                    axios.post('http://localhost:4000/app/loggout_user')
                    .then(response => {
                        if(response.data.data === null){
                            swal({
                                title: "Successfully logout !!",
                                text: "You will be redirected to Login page", 
                                icon: 'success',
                                button: 'OK'
                            }).then(() => {
                                console.log("called Logout");
                                state.ErrorHandeling = false;
                                state.UserData= response.data.data
                            })
                        }
                    }) 
                }
              })
        },
        pincode_data_isequal_to_0(state){
            state.Error_message = "Please Enter 6 Digit Pincode";
            state.addressdata = [];
            state.address_flag = false;
        },
        pincode_data_more_than_0(state){
            state.Error_message = "You have entered less than 6 Digit Pincode";
            state.addressdata = [];
            state.address_flag = false;
        },
        pincode_data_greater_than_6(state){
            state.Error_message = "You have Enter More Than 6 Digit Pincode";
            state.addressdata = [];
            state.address_flag = false;
        },
        real_data_for_pincode(state, payload){
            state.addressdata = payload[0].PostOffice != null ? payload[0].PostOffice : null
            state.address_flag = state.addressdata === null ? false : true
            state.font_aw_icon = state.addressdata === null ? "" : ""
            state.Error_message = state.addressdata === null ? "Please Enter Valid Pincode" : ""
        },
        address_data_id_fetch(state){
            for(let i = 0; i<state.addressdata.length; i++){
                var newaddress = Object.assign({}, state.addressdata[i]);
                newaddress.id = i+1;
                state.newData_pincode.push(newaddress);
            }
            //state.filters.name.value = "";
        },
        commit_intial_pincode_data_flags(state){
            state.address_flag = false
            state.loading_status = true
            state.font_aw_icon = "fa fa-spinner fa-pulse fa-3x fa-fw"
            state.Error_message = "";
            state.newData_pincode = [];
        }

    },
    actions: {
        //asyncronous
        PhoneNumberlessThan10(state){
            state.commit("PhoneNumbervalidation");
        },
        Logged_user_data(state){
            state.commit("Logged_user_dataaction");
        },
        triggerLogout(state){
            state.commit("Logoutcommit");
        },
        async Dispatch_Search_Pin_Code(state, payload){
            console.log(payload)
            if(payload.length < 6){
                if(payload.length == 0){ // 0, 1, 2, 3, 4, 5
                    state.commit("pincode_data_isequal_to_0");
                }
                else{
                    state.commit("pincode_data_more_than_0");
                }
            }
            else{
                if(payload.length > 6){
                    state.commit("pincode_data_greater_than_6");
                }
                else{
                    state.commit("commit_intial_pincode_data_flags");
                    await fetch('https://api.postalpincode.in/pincode/'+payload)
                    .then(res =>  res.json())
                    .then(data => {
                        state.commit("real_data_for_pincode",data)
                    })
                    state.commit("address_data_id_fetch");
                }
            }
        },
        toggle_sidebarA (state){
            state.commit("side_bar_statusmutateA"); 
        },
        toggle_sidebarB(state){
            state.commit("side_bar_statusmutateB"); 
        },
        async setCurrentJoke(state){
            const joke = await fetch(url, {header});
            const jokejson = await joke.json();
            state.commit("setCurrentJoke", jokejson.results[0].email); 
        },
        async getallcrop_category(state){
            await axios.get('http://localhost:4000/app/getallcrop_category')
                .then(response =>{
                    state.commit("getallcrop_category", response.data.data);
                })
        },
        async getCropNames(state,crop_category){
            await axios.get(`http://localhost:4000/app/getallcrop_name/${crop_category}`)
                .then(response =>{
                    state.commit("getCropNames", response.data.data);
                })
        },
        getdata(state,[crop_id,email_id,crop_name,crop_status,crop_category]){
            console.log(crop_id + " and "+ email_id +" and "+crop_name+" and "+crop_status+" and "+ crop_category)
            state.commit("getIntialState");
            setTimeout(async() => {
                const crop_data = {
                    Crop_id: crop_id,
                    E_mail_id: email_id,
                    crop_name: crop_name,
                    crop_status: crop_status,
                    crop_category: crop_category
                }
                await axios.post('http://localhost:4000/app/getalldata',crop_data)
                .then( response => {
                    if(response.data.data.length !== 0){
                        state.commit("getallcrop_data_lengthmore", response.data.data);
                    }
                    else{
                        state.commit("getallcrop_data_lengthless");
                    }
                }
                )
            }, 2000);
        },
        showdetails(state, crop_status){
            state.commit("showdetailsactions", crop_status);
        },
        getcropfilterddata(state){
            state.commit("showdata");
        },
        async getfarmeremaillist(state){
            state.farmer_email = []
            await axios.get('http://localhost:4000/app/getfarmeremailid')
            .then(res => {
                state.commit("getfarmerList",res.data.data)
            })
        },  
        async getbarchartdata(state, payload){
            state.commit("getinitialchartdata");
            await axios.get(`http://localhost:4000/app/getcropnamesprice/${payload}`)
            .then(res => {
                state.commit("storecrop_names_crop_price",res.data.data)
                state.commit("storecolors",res.data.data)
                state.commit("storechartdata");
                state.commit("storestyle");
            })

        },      
        async getpiechartdata(state,payload){
            state.commit("getinitialchartdata");
            await axios.get(`http://localhost:4000/app/getcrop_status_count/${payload}`)
            .then(res => {
                state.commit("storecrop_statuslist",res.data.data);
                state.commit("storecolors",res.data.data)
                state.commit("storepiedata");
                state.commit("storestyle");
            })
        },
        changedata_present_status(state){
            state.commit("changedata_present_status");
        },
        async getallfarmerinformation(state){
            await axios.get('http://localhost:4000/app/getfarmeremailid')
            .then(res => {
                state.commit('getallfarmerdetails',res.data.data);
                state.commit('Farmer_details_list_all',res.data.data);
                state.commit('storestyle');
                
            })
        }
    },
    modules: {},
    getters: {
        crop_category_list: state => state.crop_category_list,
        crop_status : state => state.crop_status,
        crop_name_list : state => state.crop_name_list,
        crop_id : state => state.crop_id,
        email_id : state => state.email_id,
        crop_name : state => state.crop_name,
        crop_category : state => state.crop_category,
        item_per_page : state => state.item_per_page,
        totalpages : state => state.totalPages,
        getlength : state => state.newData.length,
        newData : state => state.newData,
        crop_status_pop_up : state => state.crop_status_pop_up,
        farmer_email : state => state.farmer_email,
        loaded_crop_status : state => state.loaded_crop_status,
        crop_statuslist : state => state.crop_statuslist,
        piedata : state => state.piedata,
        color: state => state.color,
        data_present: state => state.data_present,
        loaded_email: state => state.loaded_email,
        chartdata: state => state.chartdata,
        piedatalist: state => state.piedatalist,
        crop_names : state => state.crop_names,
        crop_price : state => state.crop_price,
        options: state => state.options,
        farmer_email_single: state => state.farmer_email_single,
        loading_farmer_data: state => state.loading_farmer_data,
        Farmer_details_list: state => state.Farmer_details_list,
        FarmerData : state => state.FarmerData,
        crop_price_list1: state => state.crop_price_list1,
        crop_price_list2 : state => state.crop_price_list2,
        crop_price_list3 : state => state.crop_price_list3,
        crop_price_list4 : state => state.crop_price_list4,
        side_bar_status: state => state.side_bar_status,
        bar_status: state => state.bar_status,
        UserData: state => state.UserData,
        ErrorHandeling: state => state.ErrorHandeling,
        pincode: state => state.pincode,
        addressdata: state => state.addressdata,
        address_flag : state => state.address_flag,
        Error_message : state => state.Error_message,
        font_aw_icon : state => state.font_aw_icon,
        loading_status : state => state.loading_status,
        newData_pincode: state => state.newData_pincode
    }
});
