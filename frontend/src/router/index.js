import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Geluid from '../components/Geluid.vue'
import Artist from '../components/Artist.vue'
import Disc from '../components/Disc.vue'
import Track from '../components/Track.vue'

Vue.use(Router)
export default new Router({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/geluid', name: 'Geluid', component: Geluid },
        { path: '/geluid/artist/:id', name: 'Artist', component: Artist },
        { path: '/geluid/disc/:id', name: 'Disc', component: Disc },
        { path: '/geluid/track/:id', name: 'Track', component: Track }
    ]
})
