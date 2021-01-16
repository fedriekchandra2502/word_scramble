<template>
    <div class="container">
        <h2>Users</h2>
        <ul class="list-group">
            <router-link v-for="user in users" :key="user.id" :to="{ name: 'userhistory', params: { id: user.id } }">
                <li class="list-group-item">
                    {{ user.name }}
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            users: []
        }
    },
    mounted() {
        axios.get('/api/users').then(res => {
            this.users = res.data
            console.log(this.users)
        })
    }
}
</script>
