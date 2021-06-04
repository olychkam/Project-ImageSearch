import axios from "axios";

const apiKey = "625ed08df8da6e2b8be6906d2889a09e"
const instance = axios.create({
    baseURL: `https://api.flickr.com/services/rest/`,
})

export const photoAPI = {
    getPhotos(text: string, page: number) {
        return instance.get<GetPhotosResponseType>(
            `?method=flickr.photos.search`
            , {
                params: {
                    api_key: apiKey,
                    format: "json",
                    page,
                    per_page: 10,
                    text,
                    nojsoncallback: true,
                    sort: "relevance"
                }
            }
        )
            .then((r) => {
                return r.data
            })
    }
}

export type GetPhotosResponseType = {
    stat: string,
    photos: {
        page: number,
        pages: number,
        total: string,
        perpage: number,
        photo: Array<PhotoType>
    }
}
export type PhotoType = {
    isfamily: number
    isfriend: number
    ispublic: number
    farm: number
    id: string
    owner: string
    secret: string
    server: string
    title: string
}
