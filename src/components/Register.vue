<template>
<div>
<div class="col-xs-2 col-md-2 "></div>
  <div class="container" class="col-xs-8 col-md-8">
 
   <form id="register" @submit.prevent="Validate" method="post" action='/users'>
   <div class="row top10">
    <div class="form-group" class="col-xs-12 col-md-12">
      <input type="text" class="form-control" v-validate="'required'" placeholder="Name" v-model="name" name="name">
       <p class="text-danger" align="left" v-if="errors.has('name')">{{ errors.first('name') }}</p>
    </div> 
    </div>
    <div class="row top10">
     <div class="form-group" class="col-xs-12 col-md-12">
          <input v-model="email" name="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="email address" placeholder="Email Address" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
    </div>
    </div>
    <div class="row top10">
    <div class="form-group" class="col-xs-12 col-md-12">
      <input type="text" class="form-control" v-validate="'required'" placeholder="Company" v-model="company" name="company">
       <p class="text-danger" align="left" v-if="errors.has('company')">{{ errors.first('company') }}</p>
    </div>
    </div>
    <div class="row top10">
    <div class="form-group" class="col-xs-12 col-md-12">
      <input type="text" class="form-control" v-validate="'required'" placeholder="Telephone" v-model="telephone" name="telephone">
       <p class="text-danger" align="left" v-if="errors.has('telephone')">{{ errors.first('telephone') }}</p>
    </div>
    </div>
    <div class="row top10">
    <div class="form-group"  class="col-xs-12 col-md-12" >
    <div class="col-xs-push-1 col-md-push-1">
    <input type="checkbox" class="form-control" id="isOfficialVisit"  v-model="isOfficialVisit" name="isOfficialVisit"   @click="checkOfficialVisit($event)" /> 
    </div>
    <div class="col-xs-push-3 col-md-push-3">
    <label for="isOfficialVisit"  >Is it your Official Visit? </label>
    </div>
    <p class="text-danger" align="left" v-if="errors.has('isOfficialVisit')">{{ errors.first('isOfficialVisit') }}</p>
    </div>
    </div>
   <div class="row top10">
     <div class="form-group" class="col-xs-12 col-md-12"> 
     <div class="col-xs-push-1 col-md-push-1">
    <input type="checkbox" id="isEscortRequired" class="form-control"  v-model="isEscortRequired" name="isEscortRequired" @click="checkEscortRequired($event)">
    </div>
    <div class="col-xs-push-3 col-md-push-3">
    <label for="isEscortRequired"> Is escort required? </label>
    </div>
    <p class="text-danger" align="left" v-if="errors.has('isEscortRequired')">{{ errors.first('isEscortRequired') }}</p>
    </div>
    </div>
    
     <div class="row top10" id="escort" style="display:none">
    
    <div class="form-group" class="col-xs-12">
    <input type="text" class="form-control"  v-model="escortName" name="escortName" placeholder="Escort Name">
    <p class="text-danger" align="left" v-if="errors.has('escortName')">{{ errors.first('escortName') }}</p>
    </div>
    </div>
    <div class="row top10">
    <button class="btn btn-success" type="submit">Signin</button>
    <!--  on-click=location.reload() -->
    </div>
    </form>


  </div>
  <div class="col-xs-2 col-md-2"></div>
 </div>
  </template>

<style scoped>
.question {
  border: 0;
  background: #444;
  color: black;
  text-align: left;
  
}
.btn-github:hover {
  background: #2B2B2B;
  color: white;
}
.top10{
  margin-top: 5%;
}
.top20{
  margin-top:20%;
}
</style>

<script>
export default {
  name: 'Home',
  data:{
    return:{
      isOfficialVisit:false,
      isEscortRequired:false,
    }
  },
  created(){
      this.isOfficialVisit=false
      this.isEscortRequired=false
      this.escortName=""
      console.log(this.isOfficialVisit)
          console.log(this.isEscortRequired)
  },
  methods: {
    
    checkOfficialVisit: function(e){
      if(e.target.checked){
        this.isOfficialVisit=true
        console.log(this.isOfficialVisit)
      }
      else
      this.isOfficialVisit=false
    },
    checkEscortRequired: function(e){
      console.log("triggered event")
      if(e.target.checked){
        this.isEscortRequired=true
         console.log(this.isEscortRequired)
       document.getElementById('escort').style.display="block"
         //this.$router.push('/');
      }
      else{
      this.isEscortRequired=false
      document.getElementById('escort').style.display="none"
      }
    },
    Validate(e) {
      e.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result){
          console.log("Calling Validation");
          console.log(this.isOfficialVisit)
          console.log(this.isEscortRequired)
          console.log(this.escortName)
         const newUser = {
            name: this.name,
            company: this.company,
            email: this.email,
            telephone: this.telephone,
            isOfficialVisit:this.isOfficialVisit,
            isEscortRequired:this.isEscortRequired,
            escortName:this.escortName
          }
      console.log("Calling registerd user")
          this.$store.dispatch('registerUser', newUser)
          .then(res => {
             if (res.status == 200) {
              alert('Registration successful!')
              this.$router.go('/register')
            }
          }, err => {
            alert('Registration failed. Please try again!')
            this.$router.go('/register')
          })
          return
        }
      })       
        
    }
    
  },
  mounted(){
   
  }
}
</script>