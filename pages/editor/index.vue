<template>
<div class="editor-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-10 offset-md-1 col-xs-12">
                <ul class="error-messages" v-if="errors">
                    <template v-for="(item,index) in errors">
                        <li v-for="(item2,index2) in item">{{index}} {{item2}}</li>
                    </template>

                </ul>
                <form @submit.prevent>
                    <fieldset>
                        <fieldset class="form-group">
                            <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title">
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" class="form-control" placeholder="Enter tags" v-model="article.tag" @keyup.enter="keyEnter">
                            <div class="tag-list" style="margin-top:10px">
                                <span v-for="(tag,index) in this.tagList" class="tag-default tag-pill ng-binding ng-scope">
                                    <i class="ion-close-round" @click="removeTag(index)"></i>
                                    {{tag}}
                                </span>
                            </div>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="publishArticel">
                            Publish Article
                        </button>
                    </fieldset>
                </form>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import {
    publishArticles,
    updateArticles,
    getArticleDetail
}

from '@/api/article'
export default {
    data() {
        return {
            article: {
                title: "",
                description: "",
                body: "",
                tag: "",
            },
            tagList: [],
            errors: ""
        }
    },

    middleware: "auth",
    async mounted() {
        this.slug = this.$route.query.slug
        if (this.slug) {
            const {
                data
            } = await getArticleDetail(this.slug)
            this.article.title = data.article.title
            this.article.description = data.article.description
            this.article.body = data.article.body
            this.tagList = data.article.tagList
        }
    },
    methods: {
        keyEnter() {
            const str = this.article.tag.replace(/\s+/g, "");
            if (str && this.tagList.indexOf(str) === -1) {
                this.tagList.push(this.article.tag)
                this.article.tag = ''
            }

        },
        removeTag(index) {
            this.tagList.splice(index, 1)
        },
        async publishArticel() {
            const arr = JSON.parse(JSON.stringify(this.article))
            const fn = this.type ? updateArticles : publishArticles
            delete arr.tag
            try {
                const {
                    data
                } = await fn({
                        tagList: this.tagList,
                        ...arr
                    },
                    this.type ? JSON.parse(sessionStorage.getItem('article')).slug : ""
                )
                // 跳转文章页
                this.$router.push({
                    name: "article",
                    params: {
                        slug: data.article.slug
                    }
                })
            } catch (e) {
                this.errors = e.response.data.errors
            }

        }
    },
}
</script>

<style>
</style>
