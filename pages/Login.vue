<template>
    <div class="login">
        <div class="login-content">
            <p class="login-title">ログイン</p>
            <input class="login-input" v-model="email" type="email" placeholder="メールアドレス" required/>
            <input class="login-input" v-model="password" type="password" placeholder="パスワード" required/>
            <div class="login-error" v-if="loginErrorMessage">
            {{ loginErrorMessage }}
            </div>
            <button class="login-button" @click="login">ログイン</button>
        </div>
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
export default {
    layout: 'Auth',
    data() {
        return {
            email: '',
            password: '',
            loginErrorMessage: '',
        };
    },
    methods: {
        login() {
            if (!this.email || !this.password) {
                this.loginErrorMessage = 'メールアドレスまたはパスワードが入力されていません';
            }
            auth.signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$store.dispatch('confirmLogin');
                    this.$router.push('index');
                })
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            this.loginErrorMessage = 'メールアドレスの形式が違います';
                            break;
                        case 'auth/email-already-in-use':
                            this.loginErrorMessage = 'このメールアドレスはすでに使われています';
                            break;
                        case 'auth/weak-password':
                            this.loginErrorMessage = 'パスワードは6文字以上で入力してください';
                            break;
                        default:
                            this.loginErrorMessage = 'エラーが起きました。しばらくしてから再度お試しください';
                            break;
                    };
                });
        }
    }
};
</script>

<style scoped>
.login {
    text-align: center;
}
@media (min-width: 1024px) {
    .login {
        height: 700px;
    }
}
@media (min-width: 1440px) {
    .login {
        height: 800px;
    }
}
.login-title {
    font-weight: bold;
    margin: 0;
}
@media (min-width: 1024px) {
    .login-title {
        font-size: 1.3vw;
        padding: 1.7vw 1vw 0 1vw;
        margin-bottom: 2vw;
    }
}
@media (min-width: 1440px) {
    .login-title {
        font-size: 1vw;
        padding: 1.5vw 1vw 0 1vw;
        margin-bottom: 1.7vw;
    }
}
.login-content {
    display: inline-flex;
    flex-direction: column;
    align-self: center;
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 5vh;
    margin-top: 15vh;
}
.login-input {
    margin: 1.3vw 3vw 0 3vw;
    border-radius: 10px;
}
@media (min-width: 1024px) {
    .login-input {
        width: 25vw;
        font-size: 1.3vw;
        padding: 1vw;
    }
}
@media (min-width: 1440px) {
    .login-input {
        width: 20vw;
        font-size: 1vw;
        padding: 0.8vw;
    }
}
.login-error {
    color: #DC143C;
    padding: 1.5vw 1vw 0 1vw;
}
@media (min-width: 1024px) {
    .login-error {
        font-size: 1.3vw;
    }
}
@media (min-width: 1440px) {
    .login-error {
        font-size: 1vw;
    }
}
.login-button {
    display: inline-block;
    background-color: #8022d8;
    border: none;
    color: #fff;
    border-radius: 30px;
    box-shadow: 0.2vw 0.2vw 0.1vw #373737;
}
@media (min-width: 1024px) {
    .login-button {
        font-size: 1.3vw;
        margin: 1.5vw 12vw 0 12vw;
        padding: 0.9vw;
    }
}
@media (min-width: 1440px) {
    .login-button {
        margin: 1.5vw 10vw 0 10vw;
        font-size: 1vw;
        padding: 0.7vw 1.5vw;
    }
}
</style>./Login.vue