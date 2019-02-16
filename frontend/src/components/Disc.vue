<template>
    <div>
        <p>Disc</p>
        <b-row>
            <ol>
                <template v-for="track in tracks ">
                    <li><router-link :to="'/geluid/track/'+track.trackid">{{ track.title}}</router-link></li>
                </template>
            </ol>
        </b-row>
    </div>
    </div>
</template>
<script>
    import DiscService from '../api-services/disc.service'

    export default {
        name: 'Disc',
        data() {
            return {
                tracks: [ ]
            }
        },
        created() {
            let id = this.$route.params.id
            DiscService.get(id).then((response) => {
                this.tracks = response.data
                this.tracks.sort((a, b) => {
                    return a.num - b.num
                })
            })
        }
    }
</script>
