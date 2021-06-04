import {
    addTag, deleteTag,
    imageSearchReducer, InitialStateImageSearchType,
    setIsReceivingProgress, setNewError, setNewName, setPage,
    setPhotos,
    setSearchName
} from "./imageSearchReducer";
import {ActionsType} from "./redux-store";
import {PhotoType} from "../dal/API";

let startState: InitialStateImageSearchType = {
    searchName: "Cat",
    page: 1,
    pages: 1,
    perpage: 10,
    total: "2",
    photo: [
        {
            farm: 5,
            id: "45925416992",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "73422502@N08",
            secret: "c9caac8cb9",
            server: "4838",
            title: "Cat",
            tags: ["aa", "new", "you"]
        }, {
            farm: 5,
            id: "25690386427",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "154097975@N05",
            secret: "8c2b3eaf76",
            server: "4676",
            title: "Cat",
            tags: ["aa", "new"]
        }
    ],
    receivingPhotosSuccess: true,
    receivingPhotosProgress: false,
    newName: "Cat",
    someError: ""
}

beforeEach(() => {
        startState = {
            searchName: "Cat",
            page: 1,
            pages: 1,
            perpage: 10,
            total: "2",
            photo: [
                {
                    farm: 5,
                    id: "45925416992",
                    isfamily: 0,
                    isfriend: 0,
                    ispublic: 1,
                    owner: "73422502@N08",
                    secret: "c9caac8cb9",
                    server: "4838",
                    title: "Cat",
                    tags: ["aa", "new", "you"]
                }, {
                    farm: 5,
                    id: "25690386427",
                    isfamily: 0,
                    isfriend: 0,
                    ispublic: 1,
                    owner: "154097975@N05",
                    secret: "8c2b3eaf76",
                    server: "4676",
                    title: "Cat",
                    tags: ["aa", "new"]
                }
            ],
            receivingPhotosSuccess: true,
            receivingPhotosProgress: false,
            newName: "Cat",
            someError: ""
        }
    }
)

test('photos should be correct added', () => {
    const page = 1
    const pages = 1
    const newPhotoArray: PhotoType[] = [{
        farm: 4,
        id: "45925416992",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "154097975@N05",
        secret: "8c2b3eaf76",
        server: "4676",
        title: "Cat",
    }]

    const action: ActionsType = setPhotos(newPhotoArray,page,pages );
    const endState = imageSearchReducer(startState, action)

    expect(endState.photo.length).toBe(1);
    expect(endState.photo[0].id).toBe("45925416992");
    expect(endState.photo[0].tags.length).toBe(0);
});

test('searchName should be correct changed', () => {
    const someName:string = "Hello"
    const action: ActionsType = setSearchName(someName);
    const endState = imageSearchReducer(startState, action)

    expect(endState.searchName).toBe("Hello");
});

