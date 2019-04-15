<template>
    <div id="app">
        <!-- Banner -->
        <div class="header">
            <div>
                <h1>ShortLinks</h1>
                <p>Use ShortLinks to create shortend URL's to share...</p>
            </div>
            <div v-if="user===null">
                <div id="account" title="Create an account for free!">
                    <label for="sign in">Sign In</label>
                    <button id="sign in" type="submit" v-on:click="showLogin()"><img src="./assets/user.png" /></button>
                </div>
            </div>
            <div v-else>
                <div id="account" title="Sign Out!">
                    <label for="sign out">{{user.username}}</label>
                    <button id="sign out" type="submit" v-on:click="showSignout()"><img src="./assets/user.png" /></button>
                </div>
            </div>
        </div>

        <div v-if="showForm">
            <register @escape="escape" @uploadFinished="getUser()" />
        </div>
        <div v-if="showSignoutForm">
            <signout @escape="escape" />
        </div>

        <!-- <div id="nav">
            <router-link to="/">Default</router-link> |
            <router-link to="/about">About</router-link>
        </div> -->
        <router-view />
    </div>
</template>

<script>
    import Register from '@/components/Register.vue'
    import Signout from '@/components/Signout.vue'
    export default {
        name: 'default',
        components: {
            Register,
            Signout,
        },
        data() {
            return {
                showForm: false,
                showSignoutForm: false,
            }
        },
        created() {
            this.getUser();
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        methods: {
            async getUser() {
                this.showForm = false;
                this.error = "";
                try {
                    this.error = await this.$store.dispatch('getUser');
                } catch (error) {
                    // Not logged in. That's OK!
                }

                if (this.$store.state.user === null) {
                    this.$router.push('/');
                } else {
                    this.$router.push('/user');
                }
            },
            showLogin() {
                this.showForm = true;
            },
            escape() {
                this.showForm = false;
                this.showSignoutForm = false;
            },
            showSignout() {
                this.showSignoutForm = true;
            },
        }
    }
</script>

<style>
    #app {
        font: 400 16px 'PT Sans', sans-serif;
    }

    .header {
        justify-content: space-between;
        vertical-align: top;
        background-image: linear-gradient(to bottom right, rgb(76, 153, 0), rgb(154, 205, 50));
        border-radius: 4px;
        padding: 10px 100px;
        color: white;
        display: flex;
    }

    .header a {
        color: white;
    }

    .header h1 {
        margin: 10px;
    }

    .header p {
        margin: 10px;
    }

    #account {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .header label {
        margin-right: 1px;
        text-align: center;
    }

    .header button {
        background-color: Transparent;
        border: none;
    }

    .header img {
        max-width: 50px;
        max-height: 50px;
    }

    .inputForm label {
        display: inline-block;
        transition: all 150ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
        transition: transform color left;
        background-color: white;
        font-size: 16px;
        color: #80868b;
        padding: 0 8px;
        bottom: 12px;
        left: 8px;
        position: absolute;
        z-index: 1;
    }

    .inputForm>div {
        position: relative;
    }

    .inputForm input {
        box-flex: 1;
        flex-shrink: 1;
        background-color: transparent;
        border: none;
        display: block;
        height: 48px;
        padding: 13px 15px;
        line-height: 24px;
        margin: 0;
        min-width: 0%;
        outline: none;
        z-index: 0;
        border-radius: 4px;
        border: 1px solid #80868b;
        font-size: 16px;
        box-sizing: border-box;
        margin: 16px 0;
        width: 100%;
        position: relative;
        z-index: 2;
        transition: all 250ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
        transition: border-color;
    }

    .inputForm input:focus~label,
    .inputForm input.hasText~label {
        transform: scale(0.75) translateY(-34px);
        left: -8px;
        z-index: 3;
    }

    .inputForm input:focus~label {
        color: rgb(76, 153, 0);
    }

    .inputForm input:focus {
        color: black;
        border-color: rgb(76, 153, 0);
        border-width: 2px;
        padding-left: 14px;
    }

    .inputForm button {
        width: 100%;
        height: 48px;
        color: white;
        background-color: rgb(76, 153, 0);
        border: 1px solid rgb(76, 153, 0);
        border-radius: 4px;
        transition: all 250ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
        transition: background-color;
        cursor: pointer;
    }

    .inputForm button:hover {
        background-color: rgb(51, 102, 0);
    }

    #close {
        padding-left: 10px;
        padding-top: 10px;
        margin: 0;
        background-color: Transparent;
        border: none;
    }
</style>
