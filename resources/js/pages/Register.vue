<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form action="#" @submit.prevent="register">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name:</label>
                                <div class="col-md-6">
                                    <input v-model="formData.name" type="text" class="form-control" id="name" placeholder="Enter name" name="name" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email:</label>
                                <div class="col-md-6">
                                    <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="Enter email" name="email" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password:</label>
                                <div class="col-md-6">
                                    <input v-model="formData.password" type="password" class="form-control" id="password" minlength="8" placeholder="Enter password" name="password" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Password:</label>
                                <div class="col-md-6">
                                    <input v-model="formData.password_confirmation" type="password" class="form-control" id="password-confirm" minlength="8" placeholder="Confirm password" name="password_confirmation" required>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">Register</button>
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
            formData: {
                name:'',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    methods: {
        register() {
            this.$store.dispatch('register')
            .then(res => {
                this.$router.push({name: 'dashboard'});
            })
        }
    }
}
</script>
