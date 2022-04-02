<template>
    <div class="post__comments">
        <div class="post__comments__wrapper">
            <router-link class="post__comments__nameLink" :to="{ name: 'OneUser', params: { userId: comment.User.id }, props:{userId: comment.User.id}}">
                <div class="post__comments__avatar" v-if="comment.User.imageUrl"><img  :src="comment.User.imageUrl" alt=""></div>
                <div class="post__comments__avatar" v-else><img src="../assets/Default-avatar.jpg"  alt=""></div>
                <span class="post__comments__username">{{comment.User.username}}</span>
            </router-link>
            <span class="post__comments__content">{{comment.content}}</span>
            <span class="post__comments__whitespace"></span>
            <div class="post__comments__date">{{comment.createdAt}}</div>
            <div class="post__comments__update" v-if="comment.User.id === userInfos.id || userInfos.isAdmin === true" @click="editing = !editing">...</div>
        </div>

            <transition name="slidin">
                <div class="post__comments__editing" v-if="editing">
                    <button class="deleteBtn" @click="deleteComment"><font-awesome-icon icon="trash-alt" /></button>
                    <input type="text" class="form-row__input" :placeholder="`Modifiez votre commentaire`" v-model="modifyContent" v-if="comment.User.id === userInfos.id"/>
                    <button class="modifyBtn" @click="updateComment" v-if="comment.User.id === userInfos.id && validContent"><font-awesome-icon icon="check" /></button>
                </div>
            </transition>

        <div class="post__splitter"></div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'Comment',
    props: ['comment'],
    data() {
        return {
            id: this.comment.id,
            editing: false,
            modifyContent: this.comment.content
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
        updateComment(){
            this.$store.dispatch('updateComment', {
                id: this.comment.id,
                userId: this.comment.userId,
                publicationId: this.comment.publicationId,
                content: this.modifyContent,
                profilUrl: this.oneUser.id
            })
            this.editing = false
        },
        deleteComment(){
            const payload = {
                id: this.comment.id,
                userId: this.comment.userId,
                publicationId: this.comment.publicationId,
                userDeletingId: this.userInfos.id,
                isAdmin: this.userInfos.isAdmin,
                profilUrl: this.oneUser.id,
            }
            this.$store.dispatch('deleteComment', payload)
            this.editing = false
        }
    }
}

</script>
