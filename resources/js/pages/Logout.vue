<template>
    <div>

    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('logout')
        .then(res => {
            this.$router.push({ name: 'login' })
        })
    }
}
</script>
