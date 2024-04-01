<template>
    <div class="index">
        <p class="index-title">ホーム</p>
        <Post v-for="post in postLists" :key="post.id"
            :post_id="post.id"
            :user_name="post.user.name"
            :likes_count="post.likes_count"
            :post_text="post.post_text" />
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
import Post from '~/components/Post.vue'
export default {
    components: { Post },
    layout: 'Home',
    data() {
        return {
            postLists: [],
        }
    },
    methods: {
        async getPosts() {
            const resData = await this.$axios.get("http://127.0.0.1:8000/api/index/");
            this.postLists = resData.data.data;
        },
    },
    created() {
        this.getPosts();
        auth.onAuthStateChanged((user) => {
            if (user) {
                location.reload
            } else {
                this.$router.replace('login');
            }
        });
    },
};
</script>

<style scoped>
.index {
    background-color: #17191a;
}
@media (min-width: 1024px) {
    .index {
        height: 800px;
    }
}
@media (min-width: 1440px) {
    .index {
        height: 900px;
    }
}
.index-title, .index-message {
    color: #fff;
    background-color: #17191a;
}
.index-title {
    font-weight: bold;
}
@media (min-width: 1024px) {
    .index-title {
        font-size: 2vw;
        margin: 2.5vw 0 1.5vw 1.3vw;
    }
}
@media (min-width: 1440px) {
    .index-title {
        font-size: 1.8vw;
        margin: 2vw 0 1.2vw 1vw;
    }
}
</style>