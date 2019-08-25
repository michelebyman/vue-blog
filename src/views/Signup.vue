<template>
    <div>
        <div class="row my-5">
            <div class="col-md-6 offset-md-3">
                <div class="card card-body">
                    <h3 class="text-center m-4">Signup</h3>
                    <div class="form-group">
                        <input 
                          :class="{'border-danger': errors.name, 'is-valid': !errors.name && this.submitted }" 
                        v-model="name" placeholder="Name" 
                        type="text" class="form-control" />
                          <div class="errors" v-if="errors.name">
                                <small class="text-danger" v-for="error in errors.name" :key="error.id">
                                        {{error}}
                                </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input
                       :class="{'border-danger': errors.email, 'is-valid': !errors.email && this.submitted }" 
                            v-model="email"
                            placeholder="Email"
                            type="email"
                            class="form-control"
                            required
                        />
                        <div class="errors" v-if="errors.email">
                                <small class="text-danger" v-for="error in errors.email" :key="error.id">
                                        {{error}}
                                </small>
                        </div>
                    </div>
                    <div class="form-group">
                            <!-- nice solution below to set validation -->
                        <input
                        :class="{'border-danger': errors.password, 'is-valid': !errors.password && this.submitted }" 
                            v-model="password"
                            placeholder="Password"
                            type="password"
                            class="form-control"
                        />
                         <div class="errors" v-if="errors.password">
                                <small class="text-danger" v-for="error in errors.password" :key="error.id">
                                        {{error}}
                                </small>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button @click="registerUser()" :disabled="loading" class="btn form-control btn-primary">
                                <i class="fas fa-spin fa-spinner spin" v-if="loading"></i>

                                {{loading ? '' : ' Signup'}}
                         

                        </button>
                    </div>
                </div>
            </div>
        </div>

        
    </div>

   
</template>

<script>
import Axios from "axios";
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
            name: "",
            email: "",
            password: "",
            errors: {},
            submitted: false,
            loading: false,
        };
    },
    methods: {
        registerUser() {
                this.loading = true;
            Axios.post(`${config.apiUrl}/auth/register`,
                {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            )
                .then((response) => {

                        this.loading = false;
                        this.submitted = true;

                        //destructring 
                        const { data  } = response.data;
                        //setting localstorage to the user and token so it can be signed in throughout the whole session or if it returns to the page
                        localStorage.setItem('auth',  JSON.stringify(data))
                        //using the root data property auth which is accessible throughout the whole app
                        this.$root.auth = data;

                        this.$noty.success('Successfully registerd.', {
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  })
                
                        
                        this.$router.push('/');
                })
                .catch(({ response }) => {
                        this.$noty.error('Ooops something went wrong.', {
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  })
                              this.loading = false;
                        this.submitted = true;
                        this.errors = response.data
                    console.log(response);
                });
        }
    }
};
</script>


<style scoped>

/* .spin {
        animation: spin 0.5s infinite;
}

@keyframes spin {
        0% {
                transform: rotate(0deg)
        }
        100% {
                transform: rotate(360deg)
        }
} */

</style>