<template>
    <div class="post">
        <div class="post-group">
            <span class="post-user">{{ user_name }}</span>
            <button class="post-like" @click="likePost(post_id)"></button>
            <span class="like-count">{{ likes_count }}</span>
            <span class="post-delete">
                <button class="post-delete-button" @click="deletePost(post_id)"></button>
            </span>
            <span class="post-comment" v-if="this.$route.path.match('index')">
                <NuxtLink class="comment" :to="`/comment/${post_id}`"></NuxtLink>
            </span>
            <br>
            <span class="post-text">{{ post_text }}</span>
        </div>
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
export default {
    props: ['post_id', 'user_name', 'likes_count', 'post_text'],
    methods: {
        async likePost(id) {
            const sendData = {
                email: auth.currentUser.email,
            };
            await this.$axios.post("http://127.0.0.1:8000/api/post/like/" + id, sendData)
                .then(() => {
                    location.reload();
                })
                .catch(() => {
                    alert('いいねできませんでした');
                });
        },
        async deletePost(id) {
            await this.$axios.delete("http://127.0.0.1:8000/api/post/delete/" + id)
                .then(() => {
                    location.reload();
                })
                .catch(() => {
                    alert('投稿が削除できませんでした');
                });
        },
    },
};
</script>

<style scoped>
.post {
    background-color: #17191a;
}
@media (min-width: 1024px) {
    .post {
        width: 75vw;
    }
}
@media (min-width: 1440px) {
    .post {
        width: 79vw;
    }
}
.post-group {
    background-color: #17191a;
    border: 1px solid #fff;
    padding: 1vw 2vw 1.5vw 2vw;
}
.post-group:not(:last-child) {
    border-bottom: none;
}
.post-title, .post-user, .post-text {
    color: #fff;
}
.post-user, .post-like, .post-delete {
    margin-right: 0.5vw;
}
.post-user {
    font-weight: bold;
    position: relative;
    top: 0.3vw;
}
@media (min-width: 1024px) {
    .post-user {
        font-size: 1.7vw;
    }
}
@media (min-width: 1440px) {
    .post-user {
        font-size: 1.5vw;
    }
}
.comment {
    margin-left: 4vw;
}
.post-text {
    position: relative;
}
@media (min-width: 1024px) {
    .post-text {
        font-size: 1.3vw;
        top: 0.6vw;
    }
}
@media (min-width: 1440px) {
    .post-text {
        font-size: 1.1vw;
        top: 0.4vw;
    }
}
.post-like::before, .post-delete-button::before, .comment::before {
    content: '';
    display: inline-block;
    background-size: contain;
    vertical-align: middle;
}
@media (min-width: 1024px) {
    .post-like::before, .post-delete-button::before, .comment::before {
        width: 25px;
        height: 25px;
    }
}
@media (min-width: 1440px) {
    .post-like::before, .post-delete-button::before, .comment::before {
        width: 30px;
        height: 30px;
    }
}
.post-like {
    background-color: #17191a;
    border: none;
}
@media (min-width: 1024px) {
    .comment::before {
        height: 19px;
    }
}
@media (min-width: 1440px) {
    .comment::before {
        height: 23px;
    }
}
.post-like::before {
    background-image: url(/images/heart.png);
}
.post-delete-button::before {
    background-image: url(/images/cross.png);
}
.comment::before {
    background-image: url(/images/detail.png);
}
.post-delete-button {
    background-color: #17191a;
    border: none;
}
.like-count {
    color: #fff;
    background-color: #000;
    margin-right: 0.5vw;
}
@media (min-width: 1024px) {
    .like-count {
        font-size: 1.2vw;
    }
}
@media (min-width: 1440px) {
    .like-count {
        font-size: 1vw;
    }
}
</style>