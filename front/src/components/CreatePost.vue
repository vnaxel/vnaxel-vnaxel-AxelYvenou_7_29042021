<template>

    <div class="card">
        <div class="create__post">
            <div class="create__post__img" v-if="image"><img :src="image" alt=""></div>
            <div class="form-row half-width no-margin-top" v-if="content || image">
                <button v-if="validContent" @click="clique" class="button btn__create__post--top" >Choisir une image</button>
            <input type="file" class="hiddenBtn" ref="hiddenBtn" @change="onFileSelected"></div>
            <div class="form-row no-margin-top"><textarea class="form-row__input " :placeholder="`Commencez à écrire ` + [[userInfos.username]] + `...`" :value='content' @input='e=>content=e.target.value' /></div>
                <button class="button btn__create__post--bot" v-if="validContent" @click="onPublish">Publier</button>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "CreatePost",
    data() {
        return {
            content: "",
            image: null
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
        onPublish() {

            const formData = new FormData()
            formData.append("id", this.userInfos.id)
            formData.append("content", this.content)
            formData.append("image", this.files)
            this.$store.dispatch("createPost", formData)
            this.content = ''
            this.image = ''
            this.files = null
        }
    },
}
</script>

<style lang="scss" scoped>


.margin-bot {
    margin-bottom: 2rem;
}

.no-margin-top {
    margin-top: 0;
    margin-bottom: 0;
}

.btn__create__post--top {
    margin-bottom: 1.5rem;
}

.btn__create__post--bot {
    margin-top: 1.5rem;
}

.negative-margin-top {
    margin-top: -1rem;
}

@media (min-width: 560px) {
    .half-width {
        width: 40%;
    }   
}

.hiddenBtn {
    position: absolute;
    margin-top: 3px;
    margin-left: 3px;
    height: 1px;
    width: 1px;
    z-index: -5;
}

.splitter {
    background-color: rgb(230, 230, 230);
    height: 2px;
    margin-bottom: 0.2rem;
}

</style>
