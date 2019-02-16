<template>
    <div>
        <p>Track</p>
        <template v-for="p in lyrics">
            <strong v-if="p.header">{{ p.header }}</strong>
            <p>
                <template v-for="line in p.lines">
                    {{line}}<br/>
                </template>
            </p>
        </template>
    </div>
</template>
<script>
    import TrackService from '../api-services/track.service'

    export default {
        name: 'Track',
        data() {
            return {
                lyrics: [ ]
            }
        },
        created() {
            let id = this.$route.params.id
            TrackService.getLyrics(id).then((response) => {
                this.lyrics = response.data
            })
        }
    }
</script>
