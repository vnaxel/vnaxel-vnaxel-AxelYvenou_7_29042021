<template>
    <div>
        <CreatePost />

        <transition-group name="slide" mode="out-in">

            <Post class="slide-item" v-for="post in allPosts" :key="post.id" :post="post"/>

        </transition-group>
    </div>
</template>

<script>
import Post from '../components/Post.vue'
import CreatePost from '../components/CreatePost.vue'
import { mapState } from 'vuex'

export default {
    name: 'Timeline',
    components: { CreatePost, Post },
    data () {
        return {
      
        }
    },
    computed: {
        ...mapState(['allPosts','userInfos'])
    },
    mounted() {
    if (this.$store.state.user.userId == -1) {
        this.$router.push('/')
        return
    }
    this.$store.dispatch('getAllPosts')
    this.$store.dispatch('getUserInfos')
    }
}
</script>


