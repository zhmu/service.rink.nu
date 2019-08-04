<template>
  <v-content @enqueue='enqueueDisc'>
    <v-container>
      <player-title-bar></player-title-bar>
      <player-playlist-panel :selectedTrack="selectedTrack" @selecttrack="selectTrack" @playtrack="play" @pausetrack="pause" @stoptrack="stop" @skiptrack="skip"></player-playlist-panel>
      <player-controls-bar @playtrack="play" @pausetrack="pause" @stoptrack="stop" @skiptrack="skip"></player-controls-bar>
    </v-container>
  </v-content>
</template>

<script>
  import PlayerTitleBar from '../components/PlayerTitleBar.vue'
  import PlayerPlaylistPanel from '../components/PlayerPlaylistPanel.vue'
  import PlayerControlsBar from '../components/PlayerControlsBar.vue'
  import { mapState } from 'vuex'
  //import Howl from 'howler'

  export default {
    components: {
      PlayerTitleBar,
      PlayerPlaylistPanel,
      PlayerControlsBar
    },
    data () {
      return {
        /*playlist: [
          {title: "IRQ 0 SYSTEM CLOCK", artist: "MASTER BOOT RECORD", howl: null, display: true, fileid: 43169, duration: 12},
          {title: "IRQ 1 KEYBOARD", artist: "MASTER BOOT RECORD", howl: null, display: true, fileid: 43157, duration: 34},
          {title: "IRQ 2 CASCADE", artist: "MASTER BOOT RECORD", howl: null, display: true, fileid: 43171, duration: 56},
        ],*/
        selectedTrack: null,
        index: 0,
        playing: false
      }
    },
    computed: {
      playlist() {
        return this.$store.getters.playlist
      },
      currentTrack() {
        return this.playlist[this.index]
      }
    },
    created: function() {
    },
    methods: {
      selectTrack(track) {
        this.selectedTrack = track
      },
      stop() {
        this.currentTrack.howl.stop()
        this.playing = false
      },
      play(index) {
          let selectedTrackIndex = this.playlist.findIndex(track => track === this.selectedTrack)
          if (typeof index === 'number') {
              index = index
          } else if (this.selectedTrack) {
            if (this.selectedTrack != this.currentTrack) {
              this.stop()
            }
            index = selectedTrackIndex
          } else if (typeof index !== 'number') {
            index = this.index
          }

          let track = this.playlist[index]
          if (track.howl === null) {
              track.howl = new Howl({
                  src: [`/api/file/${track.fileid}/mp3`],
                  format: [ 'mp3' ],
                  onend: () => {
                    this.skip('next')
                  }
              })
          }

          if (track.howl.playing()) {
            return
          } else {
            track.howl.play()
          }

          this.selectedTrack = this.playlist[index]
          this.playing = true
          this.index = index
      },
      pause() {
        this.currentTrack.howl.pause()
        this.playing = false
      },
      skip(direction) {
        let index = 0

        if (direction === "next") {
            index = this.index + 1
            if (index >= this.playlist.length) {
                index = 0
            }
        } else {
            index = this.index - 1
            if (index < 0) {
                index = this.playlist.length - 1
            }
        }
        this.skipTo(index)
      },
      skipTo(index) {
        if (this.currentTrack) {
            this.currentTrack.howl.stop()
        }
        this.play(index)
      },
      enqueueDisc(disc) {
        alert(disc)
      }
    }
  }
</script>
