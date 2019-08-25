<template>
    <div class="container my-5">
            <div class="row">
                    <div class="col-md-10 offset-md-1">
                            <div class="card" v-if="!loading">
                                      <img height="420px" :src="article.imageUrl" class="card-image-top">
                                      <div class="card-body">
                                              <h1 class="card-title text-center my-3">
                                                      {{ article.title }}
                                              </h1>
                                              <div class="article-content" v-html="article.content"></div>

                                                <div class="comments my-4">
                                                         <vue-disqus shortname="c-blog-1" :identifier="article.slug" :url="url" ></vue-disqus>
                                                </div>

                                              <router-link to="/">
                                                          <i class="fas fa-arrow-circle-left mt-5"> Back</i> 
                                              </router-link>
                                      </div>
                            </div>
                            <div class="loader text-center" v-else>
                                      <i class="fas fa-3x fa-spin fa-spinner spin " v-if="loading"></i>
                                      <p>Loading..</p>
                            </div>
                    </div>
            </div>
    </div>
</template>

<script>
import Axios from 'axios'
import config from '../config'

export default {
        data() {
                return {
                        article: {},
                        loading: true,
                        url: window.location.href
                }
        },
        mounted() {
                this.getArticle();
        },
        methods: {
                getArticle() {
                          Axios.get(`${config.apiUrl}/article/${this.$route.params.id}`)
                        .then(response => {
                                this.loading = false;                                
                               this.article = response.data.data;
                        })
                },
        },
}    
</script>