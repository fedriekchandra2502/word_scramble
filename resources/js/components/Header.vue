<template>
    <nav class="navbar navbar-expand-sm bg-light navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link">Word Scramble</a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li v-if="!isAuthenticated" class="nav-item active">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item active">
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item active">
                <router-link class="nav-link" to="/myhistory">My History</router-link>
            </li>
            <li v-if="isAdmin && isAuthenticated" class="nav-item active">
                <router-link class="nav-link" to="/users">User History</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
                <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        computed: {
            isAuthenticated() {
                return this.$store.getters.loggedIn
            },
            isAdmin() {
                return this.$store.getters.isAdmin
            }
        },
        methods: {
            logout() {
                axios.post('/logout').then(res => {
                    localStorage.removeItem('user');
                    this.isAuthenticated = null;
                    this.$router.push({ name: 'login' });
                });
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
