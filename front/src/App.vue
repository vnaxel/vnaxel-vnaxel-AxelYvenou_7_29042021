<template>
  <div id="#app">
    <div id="nav">
    <router-link to="/" class="button navBtn" v-if="this.$store.state.user.userId == -1" active-class="active">Log In</router-link>
    <router-link :to="'/team/' + this.$store.state.userInfos.id" class="button navBtn" v-if="this.$store.state.user.userId !== -1" active-class="active">Profil</router-link>
    <router-link to="/timeline" class="button navBtn" v-if="this.$store.state.user.userId !== -1" active-class="active">Timeline</router-link>
    <router-link to="/trombinoscope" class="button navBtn" v-if="this.$store.state.user.userId !== -1" active-class="active">Team</router-link>
    <Logout />
    </div>
  <router-view v-slot="{ Component }">
    <transition name="slidin" mode="out-in">
     <component :is="Component" />
    </transition>
  </router-view>
  </div>
</template>

<script>
import Logout from './components/LogoutBtn.vue'
export default {
  name: 'App',
  components: {
    Logout
  }
}

</script>


<style lang="scss">


//--- transition ---//

.slide-enter-from{
  opacity: 0;
  transform: translateY(3%) translateX(-5%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-110%) translateX(60%);
}

.slide-item {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  position: absolute;
}

.slidin-enter-from {
  opacity: 0;
  transform: translateY(-1.5%) translateX(-5%);
}

.slidin-leave-to {
  opacity: 0;
  transform: translateY(2%) translateX(5%);
}

.slidin-enter-active,
.slidin-leave-active {
  transition: all 0.2s ease-out;
}


//--- transition-end---//















@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

#app {
  flex: 1;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(53, 53, 53);
  max-width: 540px;
}

#logo {
  object-fit: cover;
  width: 100%;
  height: 10rem;  
}

#nav {
  display: flex;
  flex-wrap: wrap;
  padding: 0rem 1rem 0rem 1rem;
  justify-content: center;
  & a {
    flex-grow: 1;
    width: min-content;
    color: white;
    text-decoration: none;
    margin-right: 1rem;
    margin:  1rem 0.5rem 0rem 0.5rem;
    font-weight: 600;
  }
}

img {
  max-width: 100%;
}
.card {
  max-width: 100%;
  background:white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 1rem;
  overflow: hidden;
}

.about{
  text-align: left;
}

.router-link-active {
  color: black;
}

.active {
  display: none;
}

.card__subtitle {
  text-align: center;
  color:rgb(119, 119, 119);
  font-weight: 00;
}
  
.card__action {
  font-weight: 600;
  position: relative;
  padding: 0.3em 0;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: rgb(122, 117, 117);
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
    opacity: 1;
    transform: scale(0);
    transform-origin: center;
  }
  &:hover::after,
  :focus::after{
    transform: scale(1);
  } 
}
.card__action:hover {
  cursor:pointer;
}

.card__profil {
  padding: 0;
  max-width: 100%;
  background:white;
  border-radius: 16px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 1rem;
  overflow: hidden;
}

.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__username {
      font-size: 1.5rem;
      font-weight: 800;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  &__img {
    object-fit: cover;
    object-position: 50% 50%;
    height: 15rem;
    width: 100%;    
        
  }
  &__footer {
    position: relative;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  &__isAdmin {
    text-align: center;
  }
  &__content {
    margin-bottom: 1rem;
  }
  &__splitter {
    background-color: rgb(230, 230, 230);
    height: 2px;
    margin-bottom: 1rem;
  }
  &__update {
    position: absolute;
    top: 2rem;
    right: 0.5rem;
    transform: rotate(90deg);
    font-size: 2rem;
    line-height: 0.4rem;
    height: 1rem;
    width: 1.5rem;
    &:hover {
      cursor: pointer;
    }
  }
  &__edit {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
}

.post {
  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
    &__avatar {
      margin-right: 1rem;
      max-width: 3.5rem;
      width: 3.5rem;
      min-width: 3.5rem;
      height: 3.5rem;
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
      font-size: 1.1rem;
      font-weight: 600;
      margin-right: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__whitespace {
      flex-grow: 1;
    }
    &__date {
      font-size: 0.7rem;
      display: flex;
    }
    &__update {
      transform: rotate(90deg);
      margin: 0 -1rem 0 0.5rem;
      font-size: 2rem;
      line-height: 0.4rem;
      height: 1rem;
      width: 1.5rem;
      &:hover {
        cursor: pointer;
      }
    }
    &__nameLink {
      display: flex;
      align-items: center;
      color: black;
      text-decoration: none;
      min-width: none;
      &:hover {
        color:#434f5a
      }
    }
  }
  &__editing {
    &__text {
      & textarea {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
      }
    }
    &__btn {
      display: flex;
      margin: 1rem 0 1rem 0;
    }
  }
  &__margin {
    height: 0.5rem;
  }
  &__img {
    margin: 0 -1.5rem 1rem -1.5rem;
    display: flex;
    justify-content: center;
    max-width: 540px;
  }
  &__content {
    margin-bottom: 1rem;
  }
  &__splitter {
    background-color: rgb(230, 230, 230);
    height: 2px;
    margin-bottom: 0.5rem;
  }
  &__comments {
    &__nameLink {
      display: flex;
      color: black;
      text-decoration: none;
      align-items: center;
      &:hover {
        color:#434f5a
      }
    }
    &__wrapper {
      margin-bottom: 0.5rem;
      width: 100%;
      display: flex;
      align-items: center;
      overflow: wrap;
    }
    &__avatar {
      margin-right: 1rem;
      width: 3rem;
      min-width: 3rem;
      height: 3rem;
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
      font-size: 0.9rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      width: min-content;

    }
    &__whitespace {
      flex-grow: 1;
    }
    &__content {
      margin: 0 1rem 0 1rem;
      text-overflow: ellipsis;
      word-break: break-word;
    }
    &__date {
      margin-right: 4px;
      font-size: 0.7rem;
      width: 30px;
      display: flex;
      align-items: center;
    }
    &__update {
      margin-right: -15px;
      
      transform: rotate(90deg);
      font-size: 2rem;
      line-height: 0.2rem;
      height: 1rem;
      width: 1.5rem;
      &:hover {
        cursor: pointer;
      }
    }
    &__editing {
      display: flex;
      justify-content: flex-start;
      height: 35px;
      margin: 1rem 0rem ;
    }
  }
}

@media (max-width: 400px) {  

  .profil {
    &__username {
      max-width: 12rem;
      font-size: 2rem;
    }
  }

  .post{
    &__header {
      &__username {
        max-width: 5rem;
      }
    }
    &__comments {
      &__avatar {
        margin-right: 0;
      }
      &__editing {
        height: auto;
      }
      &__username {
        display: none;
      }
    }
  }
  .form-row__input {
    width: 5rem;
  }
}

.button {
  background-image: linear-gradient(
    to right,
    #1fa2ff 0%,
    #12d8fa 51%,
    #1fa2ff 100%
  );
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  font-family: 'Roboto';
  color: white;
  box-shadow: 0 0 20px #eee;
  border: none;
  width: 100%;
  padding: 1rem;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.button:hover {
  background-position: right;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.button--disabled {
  background-image: #cecece;
  background:#cecece;
  color:#ececec
}
.button--disabled:hover {
  background-image: #cecece;
  cursor:not-allowed;
  background:#cecece;
}
.buttonComment {
    background-image: linear-gradient(
    to right,
    #1fa2ff 0%,
    #12d8fa 51%,
    #1fa2ff 100%
    );
    width: 35.7px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border: none;
    padding: 0.5rem 0.8rem;
    margin-left: 1rem;
    font-weight: 800;
    border-radius: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
        background-position: right;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
    }
}
.create__post {
    display: flex;
    flex-direction: column;
    &__img {
        display: flex;
        margin: -1.5rem -1.5rem 16px -1.5rem;
        align-items: center;
        justify-content: center;
    }
}

.navBtn {
  width: 2.2rem;
  padding: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.modifyBtn {
  font-family: 'Roboto';
  margin: 0rem 0rem 0rem 1rem;
  padding: 0.7rem;
  background-color: rgb(104, 182, 104);
  border: none;
  border-radius: 8px;
  color: white;
  &:hover {
    cursor: pointer;
  }
}

.deleteBtn {
  margin: 0rem 1rem 0rem 0rem;
  padding: 0.7rem;
  background-color: rgb(255, 116, 116);
  border: none;
  border-radius: 8px;
  color: white;
    &:hover {
    cursor: pointer;
  }
}

.modifyImgBtn {
  padding: 0.7rem;
  background-image: linear-gradient(
    to right,
    #1fa2ff 0%,
    #12d8fa 51%,
    #1fa2ff 100%
    );
  background-size: 200% auto;
  border: none;
  border-radius: 8px;
  color: white;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    background-position: right;
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

.cancelBtn {
  padding: 0.7rem;
  background-color: rgb(87, 87, 87);
  border: none;
  border-radius: 8px;
  color: white;
    &:hover {
    cursor: pointer;
  }
}

.whitespace {
  flex-grow: 1;
}

.form-row {
  display: flex;
  margin: 16px 0px;
  flex-wrap: wrap;
  font-weight: 600;
}

.create__comment__form {
  display: flex;
  margin: 16px 0px 0px 0px;
  flex-wrap: wrap;
  font-weight: 600;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}

.card__title {
  margin-bottom: 1rem;
  border: 2px solid white;
  color: white;
  padding: 0.1rem;
  border-radius: 8px;
  background-size: 200% auto;
}




</style>
