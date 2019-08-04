<template>
  <v-card>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <v-list>
      <v-list-tile v-for="album in albums" :key="album.id" no-action>
        <v-list-tile-title>{{ album.year }} - {{ album.name }}</v-list-tile-title>
          <v-list v-for="disc in album.discs" :key="disc.discid">
            <v-list-tile :to="'/geluid/disc/'+disc.discid">
              <v-list-tile-title>CD{{ disc.volume }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list v-for="disc in album.discs" :key="disc.discid">
            <v-list-tile @click="enqueue(disc)">
              <v-list-tile-title>+ {{ disc.volume }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
<script>
    import ArtistService from '../api-services/artist.service'
    import DiscService from '../api-services/disc.service'

    function processResponse(response) {
          var albums = Object.values(response.data['albums'])
          var artist = response.data['artist']
          albums.sort((a, b) => {
              if (a.year != b.year)
                  return a.year - b.year
              return a.name - b.name
          })

          albums.forEach((a) => {
              a.discs.sort((a, b) => {
                if (a.year != b.year)
                  return a.year - b.year
                if (a.volume != b.volume)
                  return a.volume - b.volume
                return a.discid - b.discid
              })
          })
          return { 'albums': albums, 'artist': artist }
    }

    export default {
        name: 'Artist',
        data() {
            return {
                breadcrumbs: [ ],
                albums: [ ]
            }
        },
        beforeRouteEnter(to, from, next) {
            let id = to.params.id
            ArtistService.get(id).then((response) => {
                let resp = processResponse(response)
                next(vm => {
                    vm.albums = resp.albums
                    vm.breadcrumbs = [
                        { 'text': resp.artist.name, 'href': '#/geluid/artist/' + resp.artist.id, 'disabled': true },
                    ]
                })
            })
        },
        watch: {
            $route() {
                this.albums = {}
                ArtistService.get(this.$route.params.id).then((response) => {
                  let resp = processResponse(response)
                  this.albums = resp.albums
                  this.breadcrumbs = [
                      { 'text': resp.artist.name, 'href': '#/geluid/artist/' + resp.artist.id, 'disabled': true },
                  ]
                })
            }
        },
        methods: {
            enqueue(disc) {
                DiscService.get(disc.discid).then((response) => {
                    let data = response.data
                    const artistName = data.artist.name
                    let tracks = data.tracks
                    tracks.sort((a, b) => {
                        return a.num - b.num
                    })

                    tracks.forEach((track) => {
                        this.$store.commit('addTrackToPlaylist', {
                            title: track.title,
                            artist: artistName,
                            howl: null,
                            display: true,
                            fileid: track.fileid,
                            duration: track.length
                        })
                    })
                })
            }
        }
    }
</script>
