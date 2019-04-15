<template>
    <!-- Inputs -->
    <div class="default">
        <!-- Inputs -->
        <div id="wrapperLeft">
            <form class="inputForm" @submit.prevent="addShortcut">
                <p>Create a Shortcut</p>
                <div>
                    <input title="Shortcut for a website." v-model="shortcut" v-bind:class="{ hasText: hasShortcut }" />
                    <label>Shortcut</label>
                </div>
                <div>
                    <input title="Paste a url for the webpage your shortcut links to." v-model="link" v-bind:class="{ hasText: hasLink }" />
                    <label>Link</label>
                </div>
                <button type="submit">Create</button>
                <p>Shortcuts expire after 7 days, for a permament link create a free account!</p>
            </form>
        </div>
        <div id="wrapperRight" v-if="shortcutCreated">
               <p>Shortcut Created</p>
               <a v-bind:href="created">{{showLink}}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'default',
        data() {
            return {
                shortcut: '',
                link: '',
                shortcutCreated: false,
                showLink: '',
                created: '',
            }
        },
        created() {
            (function() {
                this.getUser();
                if (this.user !== null) {
                    this.$router.push('/user');
                }
            })();
        },
        computed: {
            hasShortcut() {
                return this.shortcut.trim().length !== 0;
            },
            hasLink() {
                return this.link.trim().length !== 0;
            },
        },
        methods: {
            async addShortcut() {
                try {
                    this.error = "";
                    this.error = await this.$store.dispatch('addShortcut', {
                        shortcut: this.shortcut,
                        link: this.link,
                    });

                    this.shortcutCreated = true;
                    this.showLink = this.getShowLink(this.shortcut);
                    this.created = this.getLink(this.shortcut);

                    this.shortcut = "";
                    this.link = "";
                } catch (error) {
                    console.log(error);
                    alert("Error creating shortcut!");
                }
            },
            getLink(shorturl) {
                return 'http://' + window.location.hostname + '/q/' + shorturl;
            },
            getShowLink(shorturl) {
                return window.location.hostname + '/q/' + shorturl;
            },
        }
    }
</script>

<style scoped>
    .default {
        position: absolute;
    }

    #wrapperLeft {
        float: left;
        width: 500px;
        padding-left: 25px;
    }

    #wrapperRight {
        float: right;
        max-width: 500px;
        margin-left: 50px;
    }
</style>
