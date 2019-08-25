<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card my-5">
                    <div class="card-body">
                        <picture-input
                            @change="onChange"
                            accept="image/jpeg, image/png"
                            size="5"
                            buttonClass="btn btn-danger btn-block"
                        ></picture-input>
                        <select class="form-control my-3" v-model="category">
                            <option value disabled>Select a Category</option>
                            <option
                                value="category.id"
                                v-for="category in categories"
                                :key="category.id"
                            >{{ category.name }}</option>
                        </select>
                        <input
                            v-model="title"
                            type="text"
                            placeholder="Title"
                            class="form-control mb-3 my-3"
                        />
                        <wysiwyg v-model="content" />
                        <div class="text-center">
                            <button
                                :disabled="loading"
                                @click="createArticle()"
                                class="btn-success btn-block mt-3"
                            >
                                <i class="fas fa-spin fa-spinner spin" v-if="loading"></i>

                                {{loading ? '' : ' Create Article'}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import PictureInput from "vue-picture-input";
import Axios from "axios";
import config from "@/config";

export default {
    //routeguard
    beforeRouteEnter(to, from, next) {
        if (!localStorage.getItem("auth")) {
            return next({ path: "/login" });
        }

        next();
    },
    components: {
        PictureInput
    },
    mounted() {
        this.getCategories();
    },
    data() {
        return {
            title: '',
            content: '',
            image: null,
            categories: [],
            category: '',
            loading: false
        };
    },
    methods: {
        onChange(image) {
            this.image = image;
        },
        createArticle() {
              
                
            if (!this.title || !this.content || !this.image || !this.category) {
                this.$noty.error('Please fill in all fields.', {
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  });
                return;
            }
            this.loading = true;
            const form = new FormData();

            form.append("file", this.image);

            form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);

            form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);

            Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
                .then(res =>
                    Axios.post(
                        `${config.apiUrl}/articles`,
                        {
                            title: this.title,
                            content: this.content,
                            category_id: this.category,
                            imageUrl: res.data.secure_url
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${this.$root.auth.token}`
                            }
                        }
                    )
                        .then(() => {
                            this.loading = false;
                            this.$noty.success("Article created successfully",{
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  });
                            this.$router.push("/");
                        })
                        .catch(() => {
                            this.loading = false;
                            this.$noty.error("Oops something went wrong.", {
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  });
                        })
                )
                .catch(() => {
                    this.loading = false;
                    this.$noty.error("Oops something went wrong.", {
                                        timeout: 1500,
                                        layout: 'centerRight'  
                                  });
                });
        },
        getCategories() {
            const categories = localStorage.getItem("categories");
            if (categories) {
                this.categories = JSON.parse(categories);
                return;
            }
            Axios.get(`${config.apiUrl}/categories`).then(res => {
                this.categories = res.data.categories;
                localStorage.setItem(
                    "categories",
                    JSON.stringify(this.categories)
                );
            });
        }
    }
};
</script>

