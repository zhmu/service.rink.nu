<template>
    <div>
        <p>Geluid</p>
        <b-row>
            <ul>
                <li v-for="artist in artists">
                    <router-link :to="'/geluid/artist/'+artist.artistid">{{ artist.name }}</router-link>
                </li>
            </ul>
        </b-row>
    </div>
</template>
<script>
    import ArtistService from '../api-services/artist.service'

    export default {
        name: 'Geluid',
        data() {
            return {
                artists: [ ]
            }
        },
        created() {
            ArtistService.getAll().then((response) => {
                this.artists = response.data
                this.artists.sort((a, b) => {
                    return a.name < b.name ? -1 : 1
                })
            })
        }
    }
</script>
