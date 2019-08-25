<template>
        <div>
             <div class="row my-5">

                     <div class="col-md-6 offset-md-3 ">
                             <div class="card card-body">
                                     <h3 class="text-center m-4">
                                             Login
                                     </h3>
                                     <div class="form-group">
                                     <input 
                                        v-model="email" 
                                        placeholder="Email" 
                                        type="text" 
                                        class="form-control"
                                       :class="{'border-danger': errors.email }" 
                                        >
                                     <div class="errors" v-if="errors.email">
                                             <small class="text-danger" v-for="error in errors.email" :key="error">
                                                     {{ error }}
                                             </small>
                                     </div>
                             </div>
                             <div class="form-group">
                                     <input
                                         :class="{'border-danger': errors.password }" 
                                         v-model="password" placeholder="Password" 
                                         type="password" 
                                         class="form-control">
                                     <div class="errors" v-if="errors.password">
                                             <small class="text-danger" v-for="error in errors.password" :key="error">
                                                     {{ error }}
                                             </small>
                                     </div>
                                     <div class="credentials mt-3" v-if="credentials">
                                             <small class="text-danger">
                                                     {{ credentials }}
                                             </small>
                                     </div>
                             </div>
                             <div class="form-group text-center">
                                     <button :disabled="loading" @click="loginUser()" class="btn form-control btn-success">
                                              <i class="fas fa-spin fa-spinner spin" v-if="loading"></i>

                                                 {{loading ? '' : ' Login'}}
                                    </button>
                             </div>
                             </div>
                             
                     </div>
             </div>

        </div>

</template>

<script>
import Axios from 'axios'
import config from '@/config'
export default {
        beforeRouteEnter (to, from, next) {

  
         if(localStorage.getItem('auth')) {
                 return next({path: '/'})
         }

         next();
        },
        data() {
                return {
                        email: '',
                        password: '',
                        errors: {},
                        submitted: false,
                        credentials: '',
                        loading: false
                }
        },   
        methods: {
                loginUser() {
                               this.loading = true;
                        Axios.post(`${config.apiUrl}/auth/login`, {
                                email: this.email,
                                password: this.password,
                        })
                        .then(response => {

                                this.loading = false;
                               this.$root.auth = response.data.data;
                               localStorage.setItem('auth', JSON.stringify(response.data.data))
                                 this.$noty.success('Successfully logged in.', {
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  })
                               this.$router.push('/')

                        })
                        .catch(({ response }) => {
                                  this.loading = false;
                                  this.$noty.error('Ooops something went wrong.', {
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  })

                                if (response.status === 401) {
                                        this.errors = {
                                                email: response.data.email,
                                                password:  response.data.password,
                                        }
                                         this.credentials = 'These credentials do not match our records'
                       
                                } else {
                                         this.errors = response.data;
                                          this.credentials = '';
                                    
                                }

                               
                        });
                }
        } ,    
}
</script>


<style scoped>
    
</style>