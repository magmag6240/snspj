<template>
    <header class="header">
        <img class="title" src="images/logo.png">
        <nav class="nav">
            <ul class="menu-group">
                <li class="menu-item">
                    <NuxtLink to="/register">新規登録</NuxtLink>
                </li>
                <li class="menu-item">
                    <NuxtLink to="/login">ログイン</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    height: 100px;
    padding: 0 50px;
    margin-bottom: 30px;
    background-color: #17191a;
    align-items: center;
}
@media (min-width: 1024px) {
    .title {
        width: 18%;
    }
}
@media (min-width: 1440px) {
    .title {
        width: 15%;
    }
}
.menu-item {
    list-style: none;
    display: inline-block;
    padding: 10px;
}
.menu-item a {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}
@media (min-width: 1024px) {
    .menu-item a {
        font-size: 1.4vw;
    }
}
@media (min-width: 1440px) {
    .menu-item a {
        font-size: 1.2vw;
    }
}
</style>