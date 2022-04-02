<template>
    <div>

        <div class="card__profil">
            <div class="profil">
                <img class="profil__img" v-if="image" :src="image"  alt="">
                <img  class="profil__img" v-else-if="oneUser.imageUrl" :src="oneUser.imageUrl"  alt="">
                <img class="profil__img" v-else src="../assets/Default-avatar.jpg"  alt="">

                <div class="profil__footer">
                    <div class="profil__username">{{oneUser.username}}</div>
                    <div class="profil__isAdmin" v-if="oneUser.isAdmin == true">MODERATEUR</div>
                    <div class="profil__update" v-if="oneUser.id === userInfos.id || userInfos.isAdmin" @click="editing = !editing">...</div>
                    

                    <transition name="slidin">
                        <div class="profil__edit" v-if="editing">
                            <button class="deleteBtn" @click="deleteUser"><font-awesome-icon icon="trash-alt" /></button>
                            <div class="whitespace"></div>
                            <button class="modifyImgBtn" @click="clique" v-if="oneUser.id === userInfos.id"><font-awesome-icon icon="images" /></button>
                            <input type="file" class="hiddenBtn" ref="hiddenBtn" @change="onFileSelected">
                            <button class="modifyBtn" @click="onUpdate" v-if="oneUser.id === userInfos.id"><font-awesome-icon icon="check" /></button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>

        <div class="card card__PublicationsTitle">  
            <h1>Publications</h1>
        </div>
        
        <CreatePost v-if="oneUser.id === userInfos.id"/>

        <transition-group name="slide" mode="out-in">

            <Post class="slide-item" v-for="post in oneUser.Publications" :key="post.id" :post="post"/>

        </transition-group>
    

    </div>
</template>

<script>
import Post from '../components/Post.vue'
import CreatePost from '../components/CreatePost.vue'
import { mapState } from 'vuex'

export default {
    name: 'OneUser',
    props: ['userId'],
    components: { CreatePost, Post },
    data () {
        return {
            editing: false,
            image: null,
        }
    },
    computed: {
        ...mapState(['oneUser', 'userInfos'])
    },
    methods: {
        clique() {
                this.$refs.hiddenBtn.click()
        },
        onFileSelected(event) {
            this.files = event.target.files[0];
            const files = event.target.files;
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                this.imageUrl = fileReader.result;
            });
            fileReader.readAsDataURL(files[0]);
            this.image = URL.createObjectURL(files[0]);
        },
        onUpdate() {
            this.$store.dispatch("updateUser", {
                userId : this.userInfos.id,
                image : this.files
            })
            this.editing = false
            this.image = null
        },
        deleteUser() {
            this.$store.dispatch("deleteUser", {
                id : this.userInfos.id,
                isAdmin : this.userInfos.isAdmin,
                idToDelete : this.oneUser.id
            })
            .then(() => {
                if (!this.userInfos.isAdmin) {
                    this.$router.push('/')
                }else if (this.oneUser.id == this.userInfos.id){
                    this.$router.push('/')
                }else if (this.userInfos.isAdmin){
                    this.$router.push('/timeline')
                }
            })
        },
        getData() {
            if (this.$route.name !== 'OneUser') {
            return
            }else{
            const body = { id: this.$route.params.userId }
            this.$store.dispatch('getOneUser', body)
            }
        }
    },
    mounted() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/')
            return
        }
        const body = { id: this.userId }
        this.$store.dispatch('getUserInfos')
        this.$store.dispatch('getOneUser', body)
    },
    watch: {
            '$route' : 'getData',
    }
}
</script>
