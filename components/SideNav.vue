<template>
    <div class="sidebar">
        <img class="logo" src="~static/images/logo.png" alt="">
        <ul class="menu-group">
            <li class="menu-item-home">
                <NuxtLink to="/index">ホーム</NuxtLink>
            </li>
            <li class="menu-item-logout">
                <button class="logout-button" @click="logout">ログアウト</button>
            </li>
        </ul>
        <validation-observer ref="obs" v-slot="ObserverProps">
            <div class="post-form">
                <p class="post-title">シェア</p>
                <validation-provider v-slot="{ errors }" rules="required|max:120">
                    <textarea class="post-textarea" name="投稿" id="post_text" v-model="postText" rows="9"></textarea>
                    <div class="form-error">{{ errors[0] }}</div>
                </validation-provider>
                <button class="post-button" :disabled="ObserverProps.invalid || !ObserverProps.validated"
                    @click="insertPost">
                    シェアする
                </button>
            </div>
        </validation-observer>
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
export default {
    data() {
        return {
            postText: null,
        }
    },
    methods: {
        logout() {
            auth.signOut()
                .then(() => {
                    this.$router.replace('/login');
                })
                .catch(() => {
                    alert('ログアウトに失敗しました');
                })
        },
        async insertPost() {
            const sendData = {
                email: auth.currentUser.email,
                post_text: this.postText,
            };
            await this.$axios.post("http://127.0.0.1:8000/api/post/store", sendData)
                .then(() => {
                    location.reload();
                })
                .catch(() => {
                    alert('投稿ができませんでした');
                });
        },
    },
};
</script>

<style scoped>
.sidebar {
    background-color: #17191a;
}
@media (min-width: 1024px) {
    .sidebar {
        width: 25%;
        height: 800px;
    }
}
@media (min-width: 1440px) {
    .sidebar {
        width: 20%;
        height: 900px;
    }
}
@media (min-width: 1024px) {
    .logo {
        width: 55%;
        margin: 3vw 2vw 0 2vw;
    }
}
@media (min-width: 1440px) {
    .logo {
        width: 50%;
        margin: 2vw 1.5vw 0 1.5vw;
    }
}
.menu-item-home, .menu-item-logout {
    margin-bottom: 1vw;
    list-style: none;
}
.menu-item-home::before, .menu-item-logout::before {
    content: '';
    display: inline-block;
    background-size: contain;
    vertical-align: middle;
}
@media (min-width: 1024px) {
    .menu-item-home::before, .menu-item-logout::before {
        width: 25px;
        height: 25px;
    }
}
@media (min-width: 1440px) {
    .menu-item-home::before, .menu-item-logout::before {
        width: 30px;
        height: 30px;
    }
}
.menu-item-home::before {
    background-image: url(/images/home.png);
}
.menu-item-logout::before {
    background-image: url(/images/logout.png);
}
.menu-item-home a, .menu-item-logout a {
    color: #fff;
    position: relative;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
}
@media (min-width: 1024px) {
    .menu-item-home a {
        font-size: 1.4vw;
        padding: 1vw 1.5vw;
        top: 0.3vw;
    }
}
@media (min-width: 1440px) {
    .menu-item-home a {
        font-size: 1.1vw;
        padding: 0.5vw 1.3vw;
        top: 0.2vw;
    }
}
.logout-button {
    border: none;
    background-color: #17191a;
    color: #fff;
    margin-left: 1vw;
}
@media (min-width: 1024px) {
    .logout-button {
        font-size: 1.3vw;
    }
}
@media (min-width: 1440px) {
    .logout-button {
        font-size: 1vw;
    }
}
@media (min-width: 1024px) {
    .post-form {
        margin: 3vw;
    }
}
@media (min-width: 1440px) {
    .post-form {
        margin: 2vw;
    }
}
.post-title {
    color: #fff;
}
@media (min-width: 1024px) {
    .post-title {
        font-size: 1.4vw;
    }
}
@media (min-width: 1440px) {
    .post-title {
        font-size: 1.1vw;
    }
}
.post-textarea {
    border: 1px solid #fff;
    background-color: #17191a;
    border-radius: 10px;
    color: #fff;
    padding: 1vw;
}
@media (min-width: 1024px) {
    .post-textarea {
        width: 90%;
        font-size: 1.2vw;
    }
}
.form-error {
    position: absolute;
    color: #DC143C;
}
@media (min-width: 1024px) {
    .form-error {
        left: 8vw;
        top: 17.7vw;
        font-size: 1.3vw;
        padding: 1vw 0.5vw;
    }
}
@media (min-width: 1440px) {
    .form-error {
        left: 7vw;
        top: 12.5vw;
        font-size: 1vw;
        padding: 1vw 0.5vw;
    }
}
.post-button {
    background-color: #8022d8;
    color: #fff;
    border-radius: 30px;
    box-shadow: 0.2vw 0.2vw 0.1vw #373737;
    margin-top: 1vw;
}
@media (min-width: 1024px) {
    .post-button {
        font-size: 1.3vw;
        padding: 0.8vw 1.7vw;
        margin-left: 8.5vw;
    }
}
@media (min-width: 1440px) {
    .post-button {
        padding: 0.7vw 1.5vw;
        font-size: 1vw;
        margin-left: 7.5vw;
    }
}
</style>