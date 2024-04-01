<template>
    <div class="register">
        <validation-observer ref="obs" v-slot="ObserverProps">
            <div class="register-content">
                <p class="register-title">新規登録</p>
                <validation-provider v-slot="{ errors }" rules="required|max:20">
                    <div class="register-error">{{ errors[0] }}</div>
                    <input class="register-input" v-model="name" name="ユーザーネーム" type="name" placeholder="ユーザーネーム">
                </validation-provider>
                <input class="register-input" v-model="email" type="email" placeholder="メールアドレス">
                <input class="register-input" v-model="password" type="password" placeholder="パスワード">
                <div class="register-error" v-if="registerErrorMessage">
                    {{ registerErrorMessage }}
                </div>
                <button class="register-button" @click="register"
                    :disabled="ObserverProps.invalid || !ObserverProps.validated">
                    新規登録
                </button>
            </div>
        </validation-observer>
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
export default {
    layout: 'Auth',
    data() {
        return {
            name: null,
            email: null,
            password: null,
            registerErrorMessage: null,
        };
    },
    methods: {
        register() {
            auth.createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    const sendData = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    };
                    this.$axios.post("http://127.0.0.1:8000/api/auth/register/", sendData);
                    this.$store.dispatch('confirmLogin');
                    this.$router.push('index');
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email":
                            this.registerErrorMessage = 'メールアドレスの形式が違います';
                            break;
                        case "auth/email-already-in-use":
                            this.registerErrorMessage = 'このメールアドレスはすでに使われています';
                            break;
                        case "auth/weak-password":
                            this.registerErrorMessage = 'パスワードは6文字以上で入力してください';
                            break;
                        default:
                            this.registerErrorMessage = 'エラーが起きました。しばらくしてから再度お試しください';
                            break;
                    }
                });
        },
    },
};
</script>

<style scoped>
.register {
    text-align: center;
}
@media (min-width: 1024px) {
    .register {
        height: 700px;
    }
}
@media (min-width: 1440px) {
    .register {
        height: 800px;
    }
}
.register-title {
    font-weight: bold;
    margin: 0;
}
@media (min-width: 1024px) {
    .register-title {
        font-size: 1.3vw;
        padding: 1.7vw 1vw 0 1vw;
    }
}
@media (min-width: 1440px) {
    .register-title {
        font-size: 1vw;
        padding: 1.5vw 1vw 0 1vw;
    }
}
.register-content {
    display: inline-flex;
    flex-direction: column;
    align-self: center;
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 5vh;
    margin-top: 15vh;
}
.register-input {
    margin: 1.3vw 3vw 0 3vw;
    border-radius: 10px;
}
@media (min-width: 1024px) {
    .register-input {
        width: 25vw;
        font-size: 1.3vw;
        padding: 1vw;
    }
}
@media (min-width: 1440px) {
    .register-input {
        width: 20vw;
        font-size: 1vw;
        padding: 0.8vw;
    }
}
.register-error {
    color: #DC143C;
    padding: 1.5vw 1vw 0 1vw;
}
@media (min-width: 1024px) {
    .register-error {
        font-size: 1.3vw;
    }
}
@media (min-width: 1440px) {
    .register-error {
        font-size: 1vw;
    }
}
.register-button {
    display: inline-block;
    background-color: #8022d8;
    border: none;
    color: #fff;
    border-radius: 30px;
    box-shadow: 0.2vw 0.2vw 0.1vw #373737;
}
@media (min-width: 1024px) {
    .register-button {
        font-size: 1.3vw;
        margin: 1.5vw 12vw 0 12vw;
        padding: 0.9vw;
    }
}
@media (min-width: 1440px) {
    .register-button {
        margin: 1.5vw 10vw 0 10vw;
        font-size: 1vw;
        padding: 0.7vw 1.5vw;
    }
}
</style>./Register.vue