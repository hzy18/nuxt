<template>
<div class="article-meta">
    <nuxt-link :to="{name:'profile',params:{username:article.author.username}}"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
        <nuxt-link :to="{name:'profile',params:{username:article.author.username}}" class="author">{{article.author.username}}</nuxt-link>
        <span class="date">{{article.createAt | date}}</span>
    </div>

    <!--自己文章编辑-->
    <div v-if="article.author.username===user.username" style="margin-top:10px">
        <div class="btn btn-outline-secondary btn-sm" @click="editArticle">
            <i class="ion-edit"></i> Edit Article
        </div>
        &nbsp;&nbsp;
        <button class="btn btn-outline-danger btn-sm" @click="deleArticle">
            <i class="ion-trash-a"></i> Delete Article
        </button>
    </div>
    <!--不是自己文章收藏关注-->
    <div v-else style="margin-top:10px">
        <button class="btn btn-sm btn-outline-secondary" :class="{active:article.author.following,disabled:isDisabled}" @click="collect">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{article.author.following?'unfollow':"follow"}} {{article.author.username}}
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary" :class="{active:article.favorited,disabled:isDisabled2}" @click="favoriteList">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">{{article.favoritesCount}}</span>
        </button>

    </div>
    </span>
</div>
</template>

<script>
import {
    deleteArticles
}

from '@/api/article'
import {
    follow,
    unFollow,
    favorite,
    unFavorite
}

from '@/api/user'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            isDisabled: false,
            isDisabled2: false
        }
    },
    props: ['article'],
    computed: {
        ...mapState(['user'])
    },
    mounted() {
        console.log(this.article)
    },
    methods: {
        editArticle() {
            this.$router.push({
                name: "editor",
                query: {
                    slug: this.article.slug
                }
            })
        },
        async collect() {
            this.isDisabled = true
            if (this.article.author.following) {
                await unFollow(this.article.author.username)
                this.article.author.following = false
                this.isDisabled = false
            } else {
                await follow(this.article.author.username)
                this.article.author.following = true
                this.isDisabled = false
            }
        },
        async favoriteList() {
            this.isDisabled2 = true
            if (this.article.favorited) {
                await unFavorite(this.article.slug)
                this.article.favorited = false
                this.article.favoritesCount--
                this.isDisabled2 = false
            } else {
                await favorite(this.article.slug)
                this.article.favorited = true
                this.article.favoritesCount++
                this.isDisabled2 = false
            }
        },
        async deleArticle() {
            await deleteArticles(this.article.slug)
            this.$router.push({
                name: "home"
            })
        }
    },
}
</script>

<style>
</style>
