<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h3>Welcome to Word Scramble</h3>
                <p v-if="error" class="text-danger">{{ error }}</p>
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form action="#" @submit.prevent="login">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email:</label>
                                <div class="col-md-6">
                                    <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password:</label>
                                <div class="col-md-6">
                                    <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Enter password" name="password">
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button v-if="!loading" type="submit" class="btn btn-primary">Login</button>
                                    <div v-if="loading" class="spinner-border"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            error: '',
            formData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.loading = true
            this.$store.dispatch('login',this.formData)
            .then(res => {
                this.loading = false
                this.$router.push({name: 'dashboard'});
            })
            .catch(error => {
                this.loading = false
                this.error = error.response.data;
            })
        }
    }
}
</script>
