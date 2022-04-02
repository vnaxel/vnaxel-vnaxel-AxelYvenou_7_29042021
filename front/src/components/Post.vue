<template>
    <div class="card">

            <div class="post__header">
                <router-link class="post__header__nameLink" :to="{ name: 'OneUser', params: { userId: post.User.id }, props:{userId: post.User.id}}">
                    <div class="post__header__avatar" v-if="post.User.imageUrl !== null"><img  :src="post.User.imageUrl" alt=""></div>
                    <div class="post__header__avatar" v-else><img src="../assets/Default-avatar.jpg"  alt=""></div>
                    <span class="post__header__username">{{post.User.username}}</span>
                </router-link>
                <span class="post__header__whitespace"></span>
                <div class="post__header__date">
                    {{post.createdAt}}
                    <div class="post__header__update" v-if="post.User.id === userInfos.id || userInfos.isAdmin === true" @click="editing = !editing">...</div>
                </div>
            </div>

        <transition name="slidin">
            <div class="post__editing" v-if="editing">
                <div class="post__editing__text">
                    <textarea class="form-row__input" v-if="post.User.id === userInfos.id" :placeholder="`Modifiez votre publication`" v-model="modifyContent" />
                </div>
                <div class="post__editing__btn">
                <button class="deleteBtn" @click="deletePost"><font-awesome-icon icon="trash-alt" /></button>
                <button class="cancelBtn" @click="cancelModify" v-if="post.User.id === userInfos.id">Annuler</button>
                <div class="whitespace"></div>
                <button class="modifyImgBtn" @click="clique" v-if="post.User.id === userInfos.id"><font-awesome-icon icon="images" /></button>
                <input type="file" class="hiddenBtn" ref="hiddenBtn" @change="onFileSelected">
                <button class="modifyBtn"  @click="onPublish" v-if="post.User.id === userInfos.id && validContent"><font-awesome-icon icon="check" /></button>
                </div>
            </div>
        </transition>    

        <div>
            <div class="post__img" v-if="image"><img :src="image" alt=""></div>
            <div class="post__img" v-else-if="post.imageUrl"><img  :src="post.imageUrl" alt=""></div>
            <div class="post__content">{{post.content}}</div>
            <div class="post__splitter"></div>
        </div>

        <transition-group name="slide" mode="out-in">
            <Comment class="slide-item" v-for="comment in post.Comments" :key="comment.id" :comment="comment"/>
            <CreateComment class="slide-item" key="key" :postId="post.id" :postUserId="post.User.id"/>
        </transition-group>
            
    </div>

</template>
    
<script>
import Comment from '../components/Comment.vue'
import CreateComment from '../components/CreateComment.vue'
import { mapState } from 'vuex'


export default {
    name: 'Post',
    components: { CreateComment, Comment },
    props: ['post'],
    data() {
        return {
            id: this.post.id,
            editing: false,
            modifyContent: this.post.content,
            image: null
        }
    },
    computed: {
        ...mapState(['userInfos', 'allPosts', 'oneUser']),
        validContent() {
                    const regEx = /^[\s\S]{3,}/
                    if ( regEx.test(this.modifyContent) == false | this.modifyContent.trim() == "") {
                        return false
                    }else{
                        return true
                    }
                }
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
        cancelModify() {
            this.editing = false
            this.modifyContent = this.post.content
            this.image = null
        },
        onPublish() {
            this.$store.dispatch("updatePost", {
                publicationId : this.post.id,
                userId : this.userInfos.id,
                content : this.modifyContent,
                image : this.files
            })
            this.editing = false
            this.image = null
        },
        deletePost() {
            const payload = {
                id: this.post.id,
                userId: this.post.userId,
                publicationId: this.post.id,
                imageUrl: this.post.imageUrl,
                userDeletingId: this.userInfos.id,
                isAdmin: this.userInfos.isAdmin,
                profilUrl: this.oneUser.id,
            }
            this.$store.dispatch("deletePost", payload)
            this.editing = false
        }    
    }
}
</script>

