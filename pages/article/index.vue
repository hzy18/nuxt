<template>
<div class="article-page">

    <div class="banner">
        <div class="container">

            <h1>{{article.title}}</h1>
            <article-meta :article="article" />

        </div>
    </div>

    <div class="container page">

        <div class="row article-content">
            <div class="col-md-12" v-html="article.body">
            </div>
        </div>

        <hr />

        <div class="article-actions">
            <article-meta :article="article" />
        </div>

        <div class="row">

            <div class="col-xs-12 col-md-8 offset-md-2">
                <article-chat :article="article" />
            </div>

        </div>

    </div>

</div>
</template>

<script>
import markDownEdit from 'markdown-it'
import articleMeta from './component/artical-fav'
import articleChat from './component/artical-chat'
import {
    getArticleDetail,

} from '@/api/article'
export default {
    components: {
        articleMeta,
        articleChat
    },
    async asyncData({
        params
    }) {
        const {
            data
        } = await getArticleDetail(params.slug)
        // console.log(res)
        const md = new markDownEdit()
        data.article.body = md.render(data.article.body)
        return {
            article: data.article
        }
    },
    head() {
        return {
            title: this.article.title + '-' + 'RealWorld',
            meta: [{
                hid: 'description',
                name: 'description',
                content: this.article.description
            }]
        }
    }
}
</script>

<style>
</style>
