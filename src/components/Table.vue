<template>
<div>

  <h4>Admin View</h4>
  <h4>Visitor List</h4>
  <!-- <a href='' @click="pagination(1)"> Switch to Page view </a> -->
  <a href="/logout">Logout</a> 
  <div v-if="this.pagenum>0">
  <a herf='' @click="pagination(this.pagenum-1)">Prev Page</a>
  <a href='' @click="pagination(this.pagenum+1)"> Next Page </a>
  </div>
  <div v-else></div>
 <table class="table table-striped table-borderes">
   <thead>
   <tr>
     <th> Name </th>
     <th> Email </th>
     <th>Telephone </th>
     <th> Company</th>
    <th> Official Visit</th>
    <th> Escort Required </th>
    <th> Escort Name</th>
   </tr>
   </thead>
   <tr v-for="user_entry in users">
   <td class="text-left">{{user_entry.name}}</td>
   <td class="text-left">{{user_entry.email}}</td>
   <td class="text-left">{{user_entry.telephone}}</td>
   <td class="text-left">{{user_entry.company}}</td>
   <td class="text-left" v-if="user_entry.isOfficialVisit">Yes</td>
   <td class="text-left" v-else>No</td>
   <td class="text-left" v-if="user_entry.isEscortRequired">Yes</td>
   <td class="text-left" v-else>No</td>
   <td class="text-left">{{user_entry.escortName}}</td>
   </tr>
  <!--  <infinite-loading @infinite="infiniteHandler"  ></infinite-loading> -->
</table>

</div>

</div>
</template>


<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: 'Admin',
  data(){
    return{
      users: [],
      list: [],
    };
  },
  created(){
    pagenum=0;
  },
  methods: {
    pagination(num){
      console.log("Pagination called")
      this.pagenum = num
      axios.get("http://localhost:3000/admin/list/users/this.pagenum")
      .then((res) => {
      this.users=res.data
      console.log("Axios has retrieved these users from pagination")
      console.log(res.data)
    })
    },
    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];        
          for (let i = this.list.length + 1; i <= this.list.length + 2; ) {         
          if(i>this.users.length){
            break;
          }
          else{
            temp.push(this.users[i-1]); 
            i++   
          }      
        }
        this.list = this.list.concat(temp);
        $state.loaded();
       
         }, 1);       
    },
   
  },
  components:{
    InfiniteLoading,
  },
  mounted() {
    console.log("getting users")
    axios.get("/admin/list/allusers")
    .then((res) => {
      this.users=res.data
      console.log("Axios has retrieved these users") 
      console.log(res.data)
    })
    .catch((err) => {
      console.log("Axios failed")
      console.log(err)
    })
  },
  updated(){
    console.log("getting users")
    axios.get("/admin/list/allusers")
    .then((res) => {
      this.users=res.data
      console.log("Axios has retrieved these users")
      console.log(res.data)
    })
    .catch((err) => {
      console.log("Axios failed")
      console.log(err)
    })
  }
  
}
</script>