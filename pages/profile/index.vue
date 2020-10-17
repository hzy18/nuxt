<template>
<div class="profile-page">

    <div class="user-info">
        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <img :src="profile.image" style="width:100px;height:100px;margin-bottom:10px;border-radius:50%" />
                    <h4>{{profile.username}}</h4>
                    <p>
                        {{profile.bio}}
                    </p>

                    <nuxt-link v-if="user.username===profile.username" :to="{name:'setting'}" class="btn btn-sm btn-outline-secondary action-btn">
                        <i class="ion-gear-a"></i> Edit Profile Settings
                    </nuxt-link>
                    <button v-else class="btn btn-sm btn-outline-secondary action-btn" :class="{disabled:isDisabled}" @click="collect">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        {{profile.following?'unfollow':"follow"}} {{profile.username}}
                    </button>
                </div>

            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" exact :class="{active:tab==='my_articel'}" :to="{name:'profile',query:{tab:'my_articel'}}">My Articles</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" exact :class="{active:tab==='my_favo'}" :to="{name:'profile',query:{tab:'my_favo'}}">Favorited Articles</nuxt-link>
                        </li>
                    </ul>
                </div>

                <div class="article-preview" v-for="(item,index) in article" :key="index" v-if="article">
                    <div class="article-meta">
                        <nuxt-link :to="{name:'profile',params:{username:item.author.username}}"><img :src="item.author.image" /></nuxt-link>
                        <div class="info">
                            <nuxt-link :to="{name:'profile',params:{username:item.author.username}}" class="author">{{item.author.username}}</nuxt-link>
                            <span class="date">{{item.createdAt | date}}</span>
                        </div>
                        <button v-if="user" :disabled="item.favoriteDisabled" @click="onFavorite(item)" class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active:item.favorited}">
                            <i class="ion-heart"></i> {{item.favoritesCount}}
                        </button>
                    </div>
                    <nuxt-link class="preview-link" :to="{name:'article',params:{slug:item.slug}}">
                        <h1>{{item.title}}</h1>
                        <p>{{item.description}}</p>
                        <span>Read more...</span>
                    </nuxt-link>
                </div>
                <div class="article-preview" v-if="article.length===0">
                    No articles are here... yet.
                </div>
                <!--分页-->
                <ul class="pagination">
                    <li class="page-item" :class="{active:page===item}" v-for="item in total">
                        <nuxt-link class="page-link" :to="{name:'profile',query:{page:item,tab}}">{{item}}</nuxt-link>
                    </li>

                </ul>
            </div>

        </div>

    </div>

</div>
</template>

<script>
import {
    getProfile
}

from '@/api/profile'
import {
    follow,
    unFollow,
}

from '@/api/user'
import {
    getArticles,
    addFavorite,
    deleteFavorite,
}

from '@/api/article'
import {
    mapState
} from 'vuex'
export default {
    watchQuery: ['page', 'tag', 'tab'],
    middleware: "auth",
    computed: {
        ...mapState(['user']),
        total() {
            return Math.ceil(this.articleCount / this.limit)
        }
    },
    data() {
        return {
            curAuth: '',
            isDisabled: false
        }
    },
    methods: {
        async collect() {
            this.isDisabled = true
            if (this.profile.following) {
                await unFollow(this.profile.username)
                this.profile.following = false
                this.isDisabled = false
            } else {
                await follow(this.profile.username)
                this.profile.following = true
                this.isDisabled = false
            }
        },
        async onFavorite(article) {
            article.favoriteDisabled = true
            if (article.favorited) {
                //取消点赞

                await deleteFavorite(article.slug)

                article.favorited = false
                article.favoritesCount += -1

            } else {
                //点赞

                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false
        }
    },
    async asyncData({
        params,
        query,
        store
    }) {
        const tab = query.tab || 'my_articel'
        const limit = 10 //每页多少条
        const page = +query.page || 1 //当前页码
        const res = await Promise.all([getProfile(params.username), getArticles({
            limit,
            offset: (page - 1) * limit,
            author: tab === 'my_articel' ? store.state.user.username : "",
            favorited: tab !== 'my_articel' ? store.state.user.username : "",
        })])
        const article = res[1].data.articles
        article.forEach(item => item.favoriteDisabled = false)
        return {
            article,
            limit,
            page,
            articleCount: res[1].data.articlesCount,
            tab: query.tab || 'my_articel',
            profile: res[0].data.profile
        }
    }
}
</script>

<style>
</style>
