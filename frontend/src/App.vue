<template>
  <v-app>
    <v-toolbar app fixed clipped-left>
      <v-menu>
        <v-toolbar-title slot="activator">
          service.rink.nu
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-on:click="geluid()">
            Geluid
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-card>
      <v-navigation-drawer app fixed clipped>
          <v-list v-for="item in items" :key="item.id">
              <v-list-tile :to="'/geluid/artist/'+item.id">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-content>
      <v-container>
        <Player/>
      </v-container>
      <v-container @enqueue='enqueue'>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import Player from './components/Player.vue'
import ArtistService from './api-services/artist.service'

export default {
  name: 'App',
  components: {
    Player
  },
  methods: {
    geluid() {
      ArtistService.getAll().then((response) => {
        var resp = response.data
        resp.sort((a, b) => {
            return a.name < b.name ? -1 : 1
        })

        var items = [ ]
        resp.forEach(function(r) {
          items.push({ 'name': r.name, 'id': r.artistid, 'items': [ ] })
        })
        this.items = items
      })
    },
    enqueue() {
        alert('enqueue')
    }
  },
  data () {
    return {
      items: [
      ]
    }
  }
}
</script>
