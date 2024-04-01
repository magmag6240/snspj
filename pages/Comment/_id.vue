<template>
    <div class="comment">
        <p class="comment-title">コメント</p>
        <Post v-for="post in postDetail" :key="post.id"
            :post_id="post.id"
            :user_name="post.user.name"
            :likes_count="post.likes_count"
            :post_text="post.post_text" />
        <div class="comment-content">
            <p class="comment-content-title">コメント</p>
            <div class="comment-group" v-for="post in postDetail" :key="post.id">
                <div class="comment-history" v-for="comment in post.comments" :key="comment.id">
                    <span class="comment-user-name">{{ comment.user.name }}</span>
                    <span class="comments">{{ comment.comments }}</span>
                </div>
            </div>
            <validation-observer ref="obs" v-slot="ObserverProps">
                <validation-provider v-slot="{ errors }" rules="required|max:120">
                    <input class="comment-input" type="text" name="コメント" v-model="commentText">
                    <div class="validation">
                        <div class="comment-error">{{ errors[0] }}</div>
                        <button class="comment-button"
                            :disabled="ObserverProps.invalid || !ObserverProps.validated" @click="insertComment">
                            コメント
                        </button>
                    </div>
                </validation-provider>
            </validation-observer>
        </div>
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
import Post from '~/components/Post.vue'
export default {
    layout: 'Home',
    components: { Post },
    data() {
        return {
            postDetail: [],
            commentText: null,
        };
    },
    methods: {
        async getComments(id) {
            const resData = await this.$axios.get("http://127.0.0.1:8000/api/comment/" +id);
            this.postDetail = resData.data.data;

        },
        async insertComment() {
            const sendData = {
                email: auth.currentUser.email,
                comments: this.commentText,
                post_id: this.$route.params.id,
            };
            await this.$axios.post("http://127.0.0.1:8000/api/comment/store/", sendData)
                .then(() => {
                    location.reload();
                })
                .catch(() => {
                    alert('投稿ができませんでした');
                });
        },
    },
    created() {
        this.getComments(this.$route.params.id);
    },
};
</script>

<style scoped>
.comment {
    background-color: #17191a;
}
@media (min-width: 1024px) {
    .comment {
        height: 800px;
    }
}
@media (min-width: 1440px) {
    .comment {
        height: 900px;
    }
}
.comment-title, .comment-content-title, .comment-user-name, .comments{
    color: #fff;
    background-color: #17191a;
}
.comment-title {
    font-weight: bold;
}
@media (min-width: 1024px) {
    .comment-title {
        font-size: 2vw;
        margin: 2.5vw 0 1.5vw 1.3vw;
    }
}
@media (min-width: 1440px) {
    .comment-title {
        font-size: 1.8vw;
        margin: 2vw 0 1.2vw 1vw;
    }
}
.comment-content-title {
    text-align: center;
}
@media (min-width: 1024px) {
    .comment-content-title {
        font-size: 1.4vw;
    }
}
@media (min-width: 1440px) {
    .comment-content-title {
        font-size: 1.2vw;
    }
}
.comment-content, .comment-history {
    display: flex;
    flex-direction: column;
}
.comment-history {
    border: 1px solid #fff;
}
@media (min-width: 1024px) {
    .comment-history {
        padding: 1.5vw 2vw;
    }
}
@media (min-width: 1440px) {
    .comment-history {
        padding: 1vw 2vw;
    }
}
.comment-history:not(:last-child) {
    border-bottom: none;
}
@media (min-width: 1024px) {
    .comment-user-name {
        font-size: 1.7vw;
        margin-bottom: 0.7vw;
    }
}
@media (min-width: 1440px) {
    .comment-user-name {
        font-size: 1.4vw;
    }
}
@media (min-width: 1024px) {
    .comments {
        font-size: 1.2vw;
    }
}
@media (min-width: 1440px) {
    .comments {
        font-size: 1vw;
    }
}
.comment-input {
    display: block;
    width: 95%;
    border: 1px solid #fff;
    background-color: #000;
    border-radius: 10px;
    color: #fff;
    margin: 1.3vw 0.8vw 1vw 0.8vw;
    padding: 1vw;
}
@media (min-width: 1024px) {
    .comment-input {
        font-size: 1.4vw;
    }
}
@media (min-width: 1440px) {
    .comment-input {
        font-size: 1.1vw;
    }
}
.comment-error {
    position: relative;
    color: #DC143C;
    left: 2vw;
    padding: 1vw 0.5vw;
}
@media (min-width: 1024px) {
    .comment-error {
        font-size: 1.3vw;
    }
}
@media (min-width: 1440px) {
    .comment-error {
        font-size: 1vw;
    }
}
.comment-button {
    background-color: #8022d8;
    color: #fff;
    border-radius: 30px;
    box-shadow: 0.2vw 0.2vw 0.1vw #373737;
    margin-top: 1vw;
}
@media (min-width: 1024px) {
    .comment-button {
        font-size: 1.3vw;
        padding: 0.8vw 1.7vw;
    }
}
@media (min-width: 1440px) {
    .comment-button {
        padding: 0.7vw 1.5vw;
        font-size: 1vw;
    }
}
.validation {
    display: flex;
    justify-content: space-between;
}
</style>