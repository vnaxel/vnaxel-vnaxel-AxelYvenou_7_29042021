<template>
    <div>
        <div class="card"><h1>Collaborateurs</h1></div>
        <div class="card card__user ">
            <div class="user" v-for="user in allUsers" :key="user">

            <router-link class="user__nameLink card__action" :to="{ name: 'OneUser', params: { userId: user.id }, props:{userId: user.id}}">
                    <div class="user__avatar" v-if="user.imageUrl !== null"><img  :src="user.imageUrl" alt=""></div>
                    <div class="user__avatar" v-else><img src="../assets/Default-avatar.jpg"  alt=""></div>
                    <div class="user__username">{{user.username}}</div>
                    <span></span>
            </router-link>


            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
    name: 'Team',
    data () {
        return {
      
        }
    },
    computed: {
        ...mapState(['allUsers','userInfos'])
    },
    mounted() {

        if (this.$store.state.user.userId == -1) {
            this.$router.push('/')
            return
        }
        this.$store.dispatch('getAllUsers')
        this.$store.dispatch('getUserInfos')



    }
}
</script>

<style lang="scss">


.card__user {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
}

.user {
    &__nameLink {
        display: flex;
        flex-direction: column;
        color: black;
        text-decoration: none;
        justify-content: center;
        align-items: center;
        margin: 0.5rem;
        padding: 0.5rem;
        width: 8rem;
        overflow: hidden;
        
    }
    &__avatar {
        width: 6rem;
        height: 6rem;
        border-radius: 100%;
        overflow: hidden;
        & img {
            width: inherit;
            height: inherit;
            border-radius: inherit;
            object-fit: cover;
        }
    }
    &__username {
      font-weight: 700;
      font-size: 1.2rem;
      text-align: center;
      text-overflow: ellipsis;
    } 

}
</style>

