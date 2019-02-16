<template>
    <div>
        <p>Artist</p>
        <b-row>
            <ul>
                <template v-for="album in albums">
                    <template v-if="album.discs.length>1">
                        <li>
                            {{ album.year }} - {{ album.name }}<br/>
                            <ul>
                                <li v-for="disc in album.discs">
                                    <router-link :to="'/geluid/disc/'+disc.discid">CD{{ disc.volume }}</router-link>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <template v-else>
                        <li><router-link :to="'/geluid/disc/'+album.discs[0].discid">{{ album.year }} - {{ album.name }}</router-link></li>
                    </template>
                </template>
            </ul>
        </b-row>
    </div>
    </div>
</template>
<script>
    import ArtistService from '../api-services/artist.service'

    export default {
        name: 'Artist',
        data() {
            return {
                albums: [ ]
            }
        },
        created() {
            let id = this.$route.params.id
            ArtistService.get(id).then((response) => {
                let albums = Object.values(response.data)
                albums.sort((a, b) => {
                    if (a.year != b.year)
                        return a.year - b.year
                    return a.name - b.name
                })
                this.albums = albums
            })
        }
    }
</script>
