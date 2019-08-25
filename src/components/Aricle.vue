<template>
<div class="card my-3">
        <h3 class="card-header">{{ article.title }} </h3>
         <div class="card-body">
               <div class="my3" v-html="article.content.substring(0 ,200 )"></div>  
                 

                 <!-- router with query, uniq url with id of the object -->
                  <router-link :to="`/article/${article.slug}`"  class="btn btn-primary mt-3">Read more</router-link>
         </div>
        
</div>
</template>

<script>
export default {
        props: ['article']
}
</script>