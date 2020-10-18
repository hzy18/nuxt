<template>
<div class="home-page">

    <div class="banner">
        <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
        </div>
    </div>

    <div class="container page">
        <div class="row">

            <div class="col-md-9">
                <div class="feed-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item" v-if="user">
                            <nuxt-link class="nav-link" exact :class="{active:tab==='your_feed'}" :to="{name:'home',query:{tab:'your_feed'}}">Your Feed</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" exact :class="{active:tab==='global_feed'}" :to="{name:'home',query:{tab:'global_feed'}}">Global Feed</nuxt-link>
                        </li>
                        <li class="nav-item" v-if="$route.query.tag">
                            <nuxt-link class="nav-link" exact :class="{active:tab==='tag'}" :to="{name:'home',query:{tab:'tag'}}">#{{$route.query.tag}}</nuxt-link>
                        </li>
                    </ul>
                </div>

                <div class="article-preview" v-for="(item,index) in article" :key="index">
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
                        <nuxt-link class="page-link" :to="{name:'home',query:{page:item,tag:$route.query.tag,tab}}">{{item}}</nuxt-link>
                    </li>

                </ul>

            </div>

            <div class="col-md-3">
                <div class="sidebar">
                    <p>Popular Tags</p>

                    <div class="tag-list">
                        <nuxt-link :to="{name:'home',query:{tag:item,tab:`tag`}}" class="tag-pill tag-default" :key="index" v-for="(item,index) in tags">{{item}}</nuxt-link>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
</template>

<script>
import {
    getArticles,
    getFeedArticles,
    addFavorite,
    deleteFavorite,

} from '@/api/article'
import {
    getTags
} from '@/api/tag'
import {
    mapState
} from 'vuex'
export default {
    watchQuery: ['page', 'tag', 'tab'],
    async asyncData({
        query,
        store
    }) {
        const limit = 10 //每页多少条
        const page = +query.page || 1 //当前页码
        let tab = ''
        if (store.state.user) {
            tab = query.tab || 'your_feed'
        } else {
            tab = query.tab || 'global_feed'
        }
        const fn = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
        const res = await Promise.all([fn({
            limit,
            offset: (page - 1) * limit,
            tag: query.tag
        }), getTags()])
        const article = res[0].data.articles
        article.forEach(item => item.favoriteDisabled = false)
        return {
            article,
            articleCount: res[0].data.articlesCount,
            limit,
            page,
            tab,
            tags: res[1].data.tags
        }

    },
    computed: {
        ...mapState(['user']),
        total() {
            return Math.ceil(this.articleCount / this.limit)
        }
    },
    methods: {
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
}
</script>

<style>
</style>
