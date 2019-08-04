<template>
  <v-card>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <v-expansion-panel v-model="panelIndex">
      <v-expansion-panel-content v-for="track in tracks" :key="track.trackid">
        <template v-slot:header>{{ track.title }}</template>
         <v-card>
           <v-card-text v-for="p in lyrics[track.trackid]">
             <div v-if="p.header" class="header">{{ p.header }}</div>
             <div v-for="line in p.lines">
               {{ line }}
             </div>
           </v-card-text>
         </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </v-card>
</template>
<script>
  import DiscService from '../api-services/disc.service'
  import TrackService from '../api-services/track.service'

    export default {
        name: 'Disc',
        data() {
            return {
                breadcrumbs: [ ],
                tracks: [ ],
                lyrics: { }
            }
        },
        props: {
            panelIndex: -1
        },
        created() {
            let id = this.$route.params.id
            DiscService.get(id).then((response) => {
                var resp = response.data
                var tracks = resp['tracks']
                tracks.sort((a, b) => {
                    return a.num - b.num
                })
                var lyrics = { };
                tracks.forEach((track) => {
                    lyrics[track.trackid] = [ { 'header': null, 'lines': [ 'Loading...' ] } ]
                })
                this.lyrics = lyrics;
                this.tracks = tracks;

                var artist = resp['artist']
                var album = resp['album']
                this.breadcrumbs = [
                    { 'text': artist.name, 'href': '#/geluid/artist/' + artist.id },
                    { 'text': album.name, 'href': '#geluid/album/' + album.id, 'disabled': true },
                ]
            })
        },
        watch: {
            panelIndex: function() {
                const trackid = this.tracks[this.panelIndex].trackid
                TrackService.getLyrics(trackid).then((response) => {
                    var resp = response.data
                    var lyrics = resp['lyrics']
                    if (lyrics.length == 0) {
                        lyrics.push({ 'header': null, 'lines': [ '(lyrics not available)' ] })
                    }
                    this.lyrics[trackid] = lyrics
                })
            }
        }
    }
</script>
<style scoped>
div.header {
    font-weight: bold;
}
</style>
