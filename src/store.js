import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        userShortcuts: null,
        lookup: null,
        showForm: 0,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            if (user !== null) {
                state.userShortcuts = user.shortcuts.reverse();
            }
        },
        setLookup(state, lookup) {
            state.lookup = lookup;
        },
        setShowForm(state, formNumber) {
            state.showForm = formNumber;
        }
    },
    actions: {
        async register(context, data) {
            console.log("Register");
            try {
                let response = await axios.post("/api/users", data);
                context.commit('setUser', response.data);
                // close the dialog
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async login(context, data) {
            console.log("Login");
            try {
                let response = await axios.post("/api/users/login", data);
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                console.log("FAILURE");
                this.error = error.response.data.message;
            }
        },
        async updateItem(context, data) {
            console.log("Update Item");
            this.error = "";
            try {
                let response = await axios.put("/api/users/upload/" + data.oldlink, data);
                console.log(response);
                return "";
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async signout(context) {
            console.log("Sign Out");
            try {
                let response = await axios.delete("/api/users");
                console.log(response);
                context.commit('setUser', null);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async getUser(context) {
            console.log("Get User");
            try {
                let response = await axios.get("/api/users");
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                // Not logged in. That's OK!
            }
        },
        async addShortcut(context, data) {
            console.log("Add Shortcut");
            try {
                let response = await axios.post("/upload", data);
                console.log(response);
                context.commit('setLookup', response.data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async addShortcutLoggedIn(context, data) {
            console.log("Add Shortcut");
            try {
                // Logged in API.
                let response = await axios.post("/api/users/upload", data);
                console.log(response);
                context.commit('setLookup', response.data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async deleteShortcut(context, data) {
            console.log("Delete Shortcut");
            try {
                await axios.delete("/api/users/upload/" + data.shorty);
                return "";
            } catch (error) {
                console.log(error);
            }
        },
    }
})
