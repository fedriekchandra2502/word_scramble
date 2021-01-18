<template>
    <div class="container">
        <table v-if="histories.length" class="table">
            <thead class="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Word</th>
                    <th>Question</th>
                    <th>Hint</th>
                    <th>Answer</th>
                    <th>Status</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="history in histories" :key="history.id">
                    <td>{{ history.user.name }}</td>
                    <td>{{ history.word }}</td>
                    <td>{{ history.question }}</td>
                    <td>{{ history.hints }}</td>
                    <td>{{ history.answer }}</td>
                    <td>{{ history.status }}</td>
                    <td>{{ history.points }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            histories: [{}]
        }
    },
    mounted() {
        axios.get('/api/history/'+this.$route.params.id, this.$store.getters.config).then(res => {
            this.histories = res.data
        })
    }
}
</script>
