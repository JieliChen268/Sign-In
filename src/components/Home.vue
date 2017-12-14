<template>
  <div class="container" v-if="this.$store.state.user.displayName">      
    <hr>
    <h4>Welcome {{this.$store.state.user.displayName}}! What's happening?</h4>    
    
    <br>
    <form id="addPost" @submit.prevent="Validate" method="post" action='/posts/create'>
    <div class="form-group">
      <input v-model="title" type="text" class="form-control" id="title" name="title" placeholder="Title" data-vv-as="title" data-vv-delay="500" v-validate="'required'">
      <p class="text-danger" align="left" v-if="errors.has('title')">{{ errors.first('title') }}</p>
    </div>
    <div class="form-group">
      <textarea v-model="body" class="form-control" id="body" rows="5"  name="body" placeholder="Write your thoughts here..." data-vv-as="body"  data-vv-delay="500" v-validate="'required'">
      </textarea>
      <p class="text-danger" align="left" v-if="errors.has('body')">{{ errors.first('body') }}</p>
    </div class="form-group" >
    <div >
    </div>
       <button class="btn btn-primary" type="submit" >Post!</button>
    </form>
    <hr>

    <center>

     <!-- 
   <table class="table table-striped table-borderes">
   <thead>
   <tr>
     <th> title </th>
     <th> body </th>
     <th> Post Date </th>
   </tr>
   </thead>
   <div v-for="posts_alias in list">
   <tr >    
     <span v-text="posts_alias.title"   ></span>
     <span v-text="posts_alias.body"   ></span>
     <span v-text="posts_alias.createdOn"   ></span>   
 
     </tr>   

   </div >   
        <infinite-loading @infinite="infiniteHandler"  ></infinite-loading>

   </table>     
  -->

    <div class="columns">
      <postcard></postcard>
      <h3>My Feed</h3>

      <div v-for="post in list">
        <div  class="container2">
        <div class="content">
          <div class="title1">{{post.title}}</div>
          {{post.body}}
          </div>
          <div>
            <div class="postedBy">Posted by: {{post.userId}}</div>
            <div class="postedOn"> - {{post.createdOn}}</div>
          </div>
        </div>
        <br>
      </div>  
<p>-- END FEED --</p>

     <infinite-loading @infinite="infiniteHandler"  ></infinite-loading>

  </div> <!-- div -->
  <div class="container" v-else>

    <h4>You must login to access Toro Net!</h4>
    <img src="https://qph.ec.quoracdn.net/main-qimg-0102f6e770d2ce1f45bd7066524b8f70" alt="Avatar" style="width:20% height=20%" class="w3-circle w3-margin-top">
  </div>
  
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container2 {  
  background-color: lightgrey;
  padding: 10px;
  margin: auto;
}
.content {
  padding-bottom: 10px;
  color: black;
  font-size: 1.5em;
}
.postedBy {
  text-align: left;
  color: blue;
}
.postedOn {
  text-align: right;
  color: red;
}
.title1 {
  text-align: center;
  font-size: 2em;
}
</style>
<script>


import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "Home",
  data() {
    return {
      //User: [],
      //title: "",
      //body: ".",
      posts: [],
      list: []
    };
  },  
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        //counter =0;        
        //if(this.posts.length>this.list.length){
          for (let i = this.list.length + 1; i <= this.list.length + 20; ) {
      //for (let i = counter; i <= this.posts.length + 2; i++) {          
          if(i>this.posts.length){
            break;
          }
          else{
            temp.push(this.posts[i-1]); 
            i++   
          }      
        }
        this.list = this.list.concat(temp);
        $state.loaded();

       // }
         }, 1000);       
    },    
    Validate(e) {
      e.preventDefault();
      this.$validator.validateAll().then(result => {
        if (result) {
          const newPost = {
            userId: this.$store.state.user.username,
            title: this.title,
            body: this.body,
            createdOn: new Date()
          };
          console.log(newPost);          
          this.$store.dispatch("addPost", newPost);
          this.title="";
          this.body="";          
          this.$router.push("/");
          return;
        }
      });
    }
  },
  components: {
    InfiniteLoading,
  },
  
  mounted() {
    axios.get('/posts')
      .then((response) => {
      console.log(response.data);
      this.posts = response.data;
      this.posts=this.posts.reverse();
      })
      .catch((error) => {
        console.log(error);
      });
  },  

  updated(){
    axios.get('/posts')
      .then((response) => {
      console.log(response.data);
      this.posts = response.data;
      this.posts=this.posts.reverse();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

}
</script>