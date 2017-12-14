<template>
<div class="container">
  <form method="post" action="/admin/register">
  <h4> Admin Register<br><br> </h4> 
  <div class="form-group">
      <input type="text" class="form-control" v-validate="'required'" placeholder="username" v-model="username" name="username">
       <p class="text-danger" align="left" v-if="errors.has('username')">{{ errors.first('username') }}</p>
  </div>

 <div class="form-group" >
          <input v-model="email" name="email" v-validate="'required|email'" data-vv-delay="500" type="text" data-vv-as="email address" placeholder="Email" class="form-control">
          <p class="text-danger" align="left" v-if="errors.has('email')">{{ errors.first('email') }}</p>
  </div>

  <button class="btn btn-success" type="submit">Register</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'RegisterAdmin',
  
  methods: {
   
  },
  mounted() {
    
  },
}
</script>