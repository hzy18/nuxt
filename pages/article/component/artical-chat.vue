<template>
<div>
    <div class="card comment-form">
        <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentData"></textarea>
        </div>
        <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" @click="postCommit">
                Post Comment
            </button>
        </div>
    </div>

    <div class="card" v-for="item in comments">
        <div class="card-block">
            <p class="card-text">{{item.body}}</p>
        </div>
        <div class="card-footer">
            <nuxt-link :to="{name:'profile',params:{username:item.author.username}}" class="comment-author">
                <img :src="item.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link :to="{name:'profile',params:{username:item.author.username}}" class="comment-author">
                {{item.author.username}}
            </nuxt-link>
            <span class="date-posted"> {{item.author.createdAt | date}}</span>
        </div>
    </div>

</div>
</template>

<script>
import {
    getCommons,
    postCommons
} from '@/api/article'
export default {
    props: ['article'],
    data() {
        return {
            comments: [],
            commentData: ""
        }
    },
    methods: {
        async postCommit() {
            if (this.commentData) {
                await postCommons(this.article.slug, this.commentData)
                this.commentData = ''
                this.getCommentData()
            }

        },
        async getCommentData() {
            const {
                data
            } = await getCommons(this.article.slug)
            this.comments = data.comments
        }
    },
    mounted() {
        this.getCommentData()
    }
}
</script>

<style>
</style>
