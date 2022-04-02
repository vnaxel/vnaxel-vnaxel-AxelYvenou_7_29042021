import { createStore } from 'vuex'


const axios = require('axios')

const instance = axios.create({
    // baseURL: 'https://groupomania.axel-yvenou.fr/'
    baseURL: 'http://localhost:3000/'
})

let user = localStorage.getItem('user')
if (!user) {
    user = {
        userId: -1,
        token: ''
    }
}else{
    try {
        user = JSON.parse(user)
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
    } catch {
        user = {
            userId: -1,
            token: ''
        }
    }
}

const store = createStore({ 
    state : {
        status: '',
        user: user,
        userInfos: {},
        oneUser: {},
        allPosts: [],
        allUsers: [],
    },
    mutations: {
        setStatus(state, status) {
            state.status = status
        },
        logUser(state, user) {
            instance.defaults.headers.common['Authorization'] =  'Bearer ' + user.token
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
        },
        userInfos(state, userInfos) {
            state.userInfos = userInfos
        },
        oneUser(state, oneUser) {
            oneUser.Publications.forEach((post) => {
                const rawDate = post.createdAt.split(/[- T : .]/)
                const date = `${rawDate[3]}h${rawDate[4]} le ${rawDate[2]}/${rawDate[1]}`
                post.createdAt = date
                post.Comments.forEach((comment) => {
                    const rawDate = comment.createdAt.split(/[- T : .]/)
                    const date = `${rawDate[2]}/${rawDate[1]} ${rawDate[3]}h${rawDate[4]}`
                    comment.createdAt = date
                })
            })
            state.oneUser = oneUser
        },
        logout(state) {
            state.user = {
                userId: -1,
                token: ''
            }
            localStorage.removeItem('user')
        },
        allPosts(state, allPosts) {
            allPosts.forEach((post) => {
                const rawDate = post.createdAt.split(/[- T : .]/)
                const date = `${rawDate[3]}h${rawDate[4]} le ${rawDate[2]}/${rawDate[1]}`
                post.createdAt = date
                post.Comments.forEach((comment) => {
                    const rawDate = comment.createdAt.split(/[- T : .]/)
                    const date = `${rawDate[2]}/${rawDate[1]} ${rawDate[3]}h${rawDate[4]}`
                    comment.createdAt = date
                })
            })
            state.allPosts = allPosts
        },
        allUsers(state, allUsers) {
            state.allUsers = allUsers
        }
    },
    actions: {
        login({commit}, userInfos) {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) => {
                instance.post('/users/login', userInfos)
                .then((res) => {
                    commit('setStatus', '')
                    commit('logUser', res.data)
                    resolve(res)
                })
                .catch((err) => {
                    commit('setStatus', 'error_login')
                    reject(err)
                })
            })
        },
        createAccount({commit}, userInfos) {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) => {
                commit
                instance.post('/users/signup', userInfos)
                .then((res) => {
                    commit('setStatus', 'created')
                    resolve(res)
                })
                .catch((err) => {
                    commit('setStatus', 'error_create')
                    reject(err)
                })
            })
        },
        getUserInfos({ commit, state }) {
            instance.get(`/users/${state.user.userId}`)
            .then((res) => commit('userInfos', res.data)
            )
            .catch((error) => {console.log(error)})
        },
        getOneUser({ commit }, oneUser) {
            instance.get(`/users/${oneUser.id}`)
            .then((res) => commit('oneUser', res.data)
            )
            .catch((error) => {console.log(error)})
        },
        getAllPosts({ commit }) {
            instance.get(`/publications/all`)
            .then(res => commit('allPosts', res.data))
            .catch((error) => console.log(error))
        },
        createPost({commit, state }, formData) {
            instance.post('publications/create', formData)
            .then(() => {   
                if (document.location.href.includes('timeline')){
                    instance.get(`/publications/all`)
                    .then(res => commit('allPosts', res.data))
                    .catch((error) => console.log(error))
                }else{
                    instance.get(`/users/${state.user.userId}`)
                    .then((res) => commit('oneUser', res.data)
                    )
                    .catch((error) => {console.log(error)})
                }
            })
            .catch((error) => console.log(error))
        },
        createComment({commit}, comment) {
            instance.post(`/publications/${comment.publicationId}/comments`, comment)
            .then(() => {   
                if (document.location.href.includes('timeline')){
                    instance.get(`/publications/all`)
                    .then(res => commit('allPosts', res.data))
                    .catch((error) => console.log(error))
                }else{
                    instance.get(`/users/${comment.postUserId}`)
                    .then((res) => commit('oneUser', res.data)
                    )
                    .catch((error) => {console.log(error)})
                }
            })
            .catch((error) => {console.log(error)})
        },
        updateComment({commit}, comment) {
            instance.put(`/publications/${comment.publicationId}/comments/${comment.id}`, comment)
            .then(() => {   
                if (document.location.href.includes('timeline')){
                    instance.get(`/publications/all`)
                    .then(res => commit('allPosts', res.data))
                    .catch((error) => console.log(error))
                }else{
                    instance.get(`/users/${comment.profilUrl}`)
                    .then((res) => commit('oneUser', res.data))
                    .catch((error) => {console.log(error)})
                }
            })
            .catch((error) => {console.log(error)})
        },
        deleteComment({commit}, comment) {
            instance.delete(`/publications/${comment.publicationId}/comments/${comment.id}`, { data : comment })
            .then(() => {  
                if (document.location.href.includes('timeline')){
                    instance.get(`/publications/all`)
                    .then(res => commit('allPosts', res.data))
                    .catch((error) => console.log(error))
                }else{
                    instance.get(`/users/${comment.profilUrl}`)
                    .then((res) => commit('oneUser', res.data))
                    .catch((error) => {console.log(error)})
                }
            })
            .catch((error) => {console.log(error)})
        },
        updatePost({commit, state }, data) {
            const formData = new FormData()
            formData.append("userId", data.userId)
            formData.append("content", data.content)
            formData.append("image", data.image)
            instance.put(`publications/${data.publicationId}`, formData)
            .then(() => {
                if (document.location.href.includes('timeline')){
                    instance.get(`/publications/all`)
                    .then(res => commit('allPosts', res.data))
                    .catch((error) => console.log(error))
                }else{
                    instance.get(`/users/${state.user.userId}`)
                    .then((res) => commit('oneUser', res.data))
                    .catch((error) => {console.log(error)})
                }
            })
            .catch((error) => console.log(error))
        },
        deletePost({commit}, publication) {
            instance.delete(`/publications/${publication.publicationId}`, { data : publication })
            .then(() => {   
                if (document.location.href.includes('timeline')){
                    instance.get(`/publications/all`)
                    .then(res => commit('allPosts', res.data))
                    .catch((error) => console.log(error))
                }else{
                    instance.get(`/users/${publication.profilUrl}`)
                    .then((res) => commit('oneUser', res.data))
                    .catch((error) => {console.log(error)})
                }
            })
            .catch((error) => {console.log(error)})
        },
        updateUser({commit}, data) {
            const formData = new FormData()
            formData.append("userId", data.userId)
            formData.append("image", data.image)
            instance.put(`/users/${data.userId}`, formData)
            .then(() => {
                instance.get(`/users/${data.userId}`)
                .then((res) => commit('oneUser', res.data))
                .catch((error) => {console.log(error)})
            })
            .catch((error) => console.log(error))
        },
        deleteUser({commit, state}, data) {
            instance.delete(`users/${data.idToDelete}`, {data : data})
            .then(() => {
                if (!state.userInfos.isAdmin || data.idToDelete === state.userInfos.id) {
                    state.oneUser = {}
                    state.userInfos = {}
                    commit('logout')
                }
            })
        },
        getAllUsers({commit}) {
            instance.get('users/all')
            .then(res => commit('allUsers', res.data))
            .catch((error) => console.log(error))
        }
    }
})

export default store