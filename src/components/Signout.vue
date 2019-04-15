<template>
<!-- Logging out -->
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-border">
                        <button id="close" type="submit" v-on:click="close()"><img src="../assets/exit.png" /></button>
                        <div class="modal-container">
                            <div class="modal-header">
                                <h1 class="modal-title">Sign out</h1>
                            </div>
                            <div class="modal-body">
                                <center>
                                    <form id="inputForm" @submit.prevent="signout">
                                        <button type="submit">Sign Out</button>
                                    </form>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
    export default {
        name: 'default',
        props: {
            show: Boolean,
        },
        data() {
            return {

            }
        },
        created() {},
        methods: {
            async signout() {
                this.error = "";
                try {
                    this.error = await this.$store.dispatch("signout");
                    console.log(this.error);
                    if (this.error === "") {
                        this.close();
                        this.$router.push('/');
                    }
                } catch (error) {
                    // don't worry about it
                }
            },
            close() {
                this.$emit('escape');
            },
        }
    }
</script>

<style scoped>
    /* Login Form */
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-border {
        width: 500px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }

    .modal-container {
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
    }

    .modal-header h1 {
        margin-bottom: 30px;
        font-size: 1.5em;
    }

    .modal-body {
        margin: 0;
    }

    .modal-body input {
        margin-bottom: 20px;
        height: 30px;
    }

    .modal-footer {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }

    .modal-default-button {
        float: right;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .modal-border img {
        padding: 5px;
        max-width: 25px;
        max-height: 25px;
    }

    .modal-border img:hover {
        background-color: #D3D3D3;
        border-radius: 50%;
    }

    .modal-footer button {
        color: black;
        border-radius: 4px;
        width: 125px;
        background-color: #D3D3D3;
        border: none;
    }

    .modal-footer button:hover {
        background-color: #a8a8a8;
    }

    #inputForm label {
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

    #inputForm>div {
        position: relative;
    }

    #inputForm input {
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

    #inputForm input:focus~label,
    #inputForm input.hasText~label {
        transform: scale(0.75) translateY(-34px);
        left: -8px;
        z-index: 3;
    }

    #inputForm input:focus~label {
        color: rgb(76, 153, 0);
    }

    #inputForm input:focus {
        color: black;
        border-color: rgb(76, 153, 0);
        border-width: 2px;
        padding-left: 14px;
    }

    #inputForm button {
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

    #inputForm button:hover {
        background-color: rgb(51, 102, 0);
    }

    #close {
        padding-left: 10px !important;
        padding-top: 10px !important;
        margin: 0 !important;
        background-color: Transparent;
        border: none;
    }
</style>
