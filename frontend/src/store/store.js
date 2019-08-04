import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        playlist: [ ]
    },
    mutations: {
        addTrackToPlaylist(state, tr) {
            state.playlist.push(tr)
        },
        clearPlaylist(state) {
            state.playlist = [ ]
        }
    },
    actions: {
        addTrackToPlaylist(context, t) {
            context.commit('addTrackToPlaylist', t)
        },
        clearPlaylist(context) {
            context.commit('clearPlaylist')
        }
    },
    getters: {
        playlist: state => {
            return state.playlist
        }
    }
})

