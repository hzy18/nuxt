<template>
<div class="settings-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>
                <ul class="error-messages" v-if="errors">
                    <template v-for="(item,index) in errors">
                        <li v-for="(item2,index2) in item">{{index}} {{item2}}</li>
                    </template>

                </ul>
                <form @submit.prevent>
                    <fieldset>
                        <fieldset class="form-group">
                            <input class="form-control" type="text" placeholder="URL of profile picture" v-model="profile.image">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="profile.username">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="profile.bio"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
                        </fieldset>
                        <button :class="{disabled:loading===true}" class="btn   btn-lg btn-primary pull-xs-right" @click="submitForm">
                            Update Settings
                        </button>
                    </fieldset>
                </form>
                <hr />
                <button class="btn btn-outline-danger" @click="logout">
                    Or click here to logout.
                </button>
            </div>

        </div>
    </div>
</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import {
    getProfile,
}

from '@/api/profile'

import {
    updateUser,
}

from '@/api/user'

export default {
    middleware: "auth",
    methods: {
        logout() {
            //清除vuex  cookie 返回首页
            this.$store.commit('setUser', "")
            // 数据持久化
            Cookie.set('user', "")
            this.$router.push({
                name: "home"
            })
        },
        async submitForm() {
            try {
                this.loading = true
                const upData = {
                    password: this.password,
                    email: this.email,
                    ...this.profile
                }
                const {
                    data
                } = await updateUser({
                    user: upData
                })
                this.loading = false
                //更新cookie
                Cookie.set('user', data.user)
                //更新vuex user
                this.$store.commit('setUser', data.user)
                //更新成功到个人主页
                this.$router.replace({
                    name: "profile",
                    params: {
                        username: data.user.username
                    }
                })
            } catch (e) {
                this.loading = false
                this.errors = e.response.data.errors
            }

        }
    },
    data() {
        return {
            loading: false,
            errors: '',
            password: "",
            email: ""
        }
    },
    async asyncData({
        query,
        store
    }) {
        const {
            data
        } = await getProfile(store.state.user.username)
        return {
            profile: data.profile
        }
    }
}
</script>

<style>
</style>
