<template>
<div class="auth-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center"> {{isLogin?'Sign in':'Sign up'}}</h1>
                <p class="text-xs-center">
                    <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                    <nuxt-link v-else to="/login">Have an account?</nuxt-link>

                </p>

                <ul class="error-messages" v-if="errors">
                    <template v-for="(item,index) in errors">
                        <li v-for="(item2,index2) in item">{{index}} {{item2}}</li>
                    </template>

                </ul>

                <form @submit.prevent="onSubmit">
                    <fieldset class="form-group" v-if="!isLogin">
                        <input required v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                    </fieldset>
                    <fieldset class="form-group">
                        <input required v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
                    </fieldset>
                    <fieldset class="form-group">
                        <input required v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" minlength="8">
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">
                        {{isLogin?'Sign in':'Sign up'}}
                    </button>
                </form>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import {
    login,
    register
} from '@/api/user'
//客户端加载
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    middleware: "notAuth",
    name: "login",
    data() {
        return {
            user: {

            },
            errors: ""
        }
    },
    methods: {
        async onSubmit() {
            try {
                const {
                    data
                } = this.isLogin ? await login({
                    user: this.user
                }) : await register({
                    user: this.user
                })
                this.errors = ''
                this.$store.commit('setUser', data.user)
                // 数据持久化
                Cookie.set('user', data.user)
                this.$router.push('/')
            } catch (e) {
                this.errors = e.response.data.errors
            }

        }
    },
    computed: {
        isLogin() {
            return this.$route.name === 'login'
        }
    }
}
</script>

<style>
</style>
