<template>
  <a @click="logout()" class="button navBtn" :class="{'button--disabled' : this.$store.state.user.userId == -1}"><font-awesome-icon icon="power-off" /></a>
</template>

<script>
export default {
    name: "Logout",

    methods: {
        logout() {
            this.$store.commit('logout')
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>