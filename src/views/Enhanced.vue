<template>
    <!-- Inputs -->
    <div class="default">
        <!-- Inputs -->
        <div id="wrapperLeft">
            <form class="inputForm" @submit.prevent="addShortcut">
                <p v-if='update'>Edit a Shortcut</p>
                <p v-else>Create a Shortcut</p>
                <div>
                    <input title="Shortcut for a website." v-model="shortcut" v-bind:class="{ hasText: hasShortcut }" />
                    <label>Shortcut</label>
                </div>
                <div>
                    <input title="Paste a url for the webpage your shortcut links to." v-model="link" v-bind:class="{ hasText: hasLink }" />
                    <label>Link</label>
                </div>
                <button type="submit">{{buttonLabel}}</button>
                <button id="cancel" type="reset" v-if="update" v-on:click="cancel()">Cancel</button>
            </form>
        </div>
        <div id="wrapperRight">
            <div id="items_container">
                <div class="item_box" v-for="item in userShortcuts" v-bind:key="item._id" v-on:click="selected(item)">
                    <div>
                        <p>Your Shortcut is:</p>
                        <a v-bind:href="getLink(item.shortcut)">{{getShowLink(item.shortcut)}}</a>
                        <p>Which links to: {{item.link}}</p>
                    </div>
                    <button title="Delete Shortcut" type="submit" v-on:click="deleteShortcut(item.shortcut)"><img src="../assets/exit.png" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'default',
        data() {
            return {
                shortcut: '',
                oldlink: '',
                link: '',
                showForm: false,
                registerationForm: false,
                showSignoutForm: false,
                buttonLabel: 'Create',
                update: false,
            }
        },
        computed: {
            hasShortcut() {
                return this.shortcut.trim().length !== 0;
            },
            hasLink() {
                return this.link.trim().length !== 0;
            },
            user() {
                return this.$store.state.user;
            },
            userShortcuts() {
                return this.$store.state.userShortcuts;
            }
        },
        created() {
            (function() {
                this.myUser();
                if (this.user === null) {
                    this.$router.push('/');
                }
            })();
        },
        methods: {
            async myUser() {
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
            async updateItem() {
                this.error = "";
                try {
                    this.error = await this.$store.dispatch('updateItem', {
                        oldlink: this.oldlink,
                        shortcut: this.shortcut,
                        link: this.link,
                    });

                    if (this.error === "") {
                        this.cancel();
                        await this.myUser();
                    }
                } catch (error) {
                    this.error = error.response.data.message;
                    alert("Key already Exists! Try a different Key!");
                }
            },
            async addShortcut() {
                if (this.update) {
                    this.updateItem();
                    return;
                } else {
                    try {
                        this.error = "";
                        this.error = await this.$store.dispatch('addShortcutLoggedIn', {
                            shortcut: this.shortcut,
                            link: this.link,
                        });
                        this.shortcut = "";
                        this.link = "";

                        if (this.error === "") {
                            await this.myUser();
                        }
                    } catch (error) {
                        console.log(error);
                        alert("Error creating shortcut!");
                    }
                }
            },
            async deleteShortcut(shorty) {
                console.log(shorty);
                try {
                    this.error = "";
                    this.error = await this.$store.dispatch('deleteShortcut', {
                        shorty: shorty,
                    });
                    if (this.error === "") {
                        this.cancel();
                        await this.myUser();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            getLink(shorturl) {
                return 'http://' + window.location.hostname + '/q/' + shorturl;
            },
            getShowLink(shorturl) {
                return window.location.hostname + '/q/' + shorturl;
            },
            selected(item) {
                this.oldlink = item.shortcut;
                this.shortcut = item.shortcut;
                this.link = item.link;
                this.buttonLabel = "Update";
                this.update = true;
            },
            cancel() {
                this.shortcut = '';
                this.link = '';
                this.buttonLabel = "Create";
                this.update = false;
                this.oldlink = '';
            },
        }
    }
</script>

<style scoped>
    .default {
        position: absolute;
    }

    #wrapperRight {
        float: right;
        max-width: 500px;
        margin-left: 50px;
    }

    #wrapperLeft {
        float: left;
        width: 500px;
        padding-left: 25px;
    }

    #cancel {
        width: 100%;
        height: 48px;
        color: white;
        background-color: #a8a8a8 !important;
        border: 1px solid #a8a8a8 !important;
        margin-top: 5px !important;
        border-radius: 4px;
        transition: all 250ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
        transition-property: background-color;
        cursor: pointer;
    }

    #cancel:hover {
        background-color: #808080 !important;
    }

    /* List of user shortcuts (shown when logged in) */
    #items_container {
        padding-top: 45px;
    }

    .item_box {
        margin: 5px;
        min-width: 500px;
        border-radius: 4px;
        border: 1px solid #80868b;
        display: flex;
    }

    .item_box:hover,
    .item_box:focus {
        border-color: rgb(76, 153, 0);
        border-width: 2px;
    }

    .item_box p {
        padding-left: 10px;
    }

    .item_box a {
        padding-left: 10px;
        font-style: italic;
    }

    .item_box button {
        float: right;
        background-color: Transparent;
        border: none;
        position: absolute;
        margin-top: 30px;
        right: 10px;
    }

    .item_box img {
        max-width: 25px;
        max-height: 25px;
    }

    .item_box button:hover {
        background-color: #D3D3D3;
        border-radius: 4px;
    }
</style>
