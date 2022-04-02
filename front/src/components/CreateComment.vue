<template>
    <div class="create__comment">
        <div class="create__comment__form" >
            <input type="text" class="form-row__input" :placeholder="`Un commentaire ` + [[userInfos.username]] + ` ?`" :value='content' @input='e=>content=e.target.value' />
            <button class="buttonComment" v-if="validContent" @click="onPublish"><font-awesome-icon icon="chevron-left" /></button>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'


export default {
    name: "CreateComment",
    props: ['postId','postUserId'],
    data() {
        return {
            content: "",
            userId: "",
        }
    },
    computed: {
        ...mapState({
            userInfos: 'userInfos'
        }),
        validContent() {
            const regEx = /^[\s\S]{3,}/
            if ( regEx.test(this.content) == false | this.content.trim() == "") {
                return false
            }else{
                return true
            }
        }
    },
    methods: {
        onPublish() {
            const body = {
                userId: this.userInfos.id,
                content: this.content,
                publicationId: this.postId,
                postUserId: this.postUserId
            }
            this.$store.dispatch("createComment", body)
            this.content = ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .form-row {
        &__comment {
            display: flex;
            margin-bottom: 1rem;
        }
        &__input {
            flex-grow: 1;
        }
        
    }

    
</style>
