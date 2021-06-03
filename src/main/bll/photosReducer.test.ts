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
    searchName: "car",
    page: 1,
    pages: 1,
    perpage: 20,
    total: "2",
    photo: [
        {
            farm: 4,
            id: "13682192405",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "33399358@N00",
            secret: "882c1eecff",
            server: "3718",
            title: "Car.",
            tags: ["afds", "dsdadsfas", "asd", "sadf", "fasd", "f", "safa"]
        }, {
            farm: 4,
            id: "3459301672",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "35676113@N08",
            secret: "c99ea870ee",
            server: "3594",
            title: "car",
            tags: ["one", "w", "asCaRRRRd", "lol", "iWantToWork", "f", "safa"]
        }
    ],
    receivingPhotosSuccess: true,
    receivingPhotosProgress: false,
    newName: "car",
    someError: ""
}

beforeEach(() => {
        startState = {
            searchName: "car",
            page: 1,
            pages: 1,
            perpage: 20,
            total: "2",
            photo: [
                {
                    farm: 4,
                    id: "13682192405",
                    isfamily: 0,
                    isfriend: 0,
                    ispublic: 1,
                    owner: "33399358@N00",
                    secret: "882c1eecff",
                    server: "3718",
                    title: "Car.",
                    tags: ["afds", "dsdadsfas", "asd", "sadf", "fasd", "f", "safa"]
                }, {
                    farm: 4,
                    id: "3459301672",
                    isfamily: 0,
                    isfriend: 0,
                    ispublic: 1,
                    owner: "35676113@N08",
                    secret: "c99ea870ee",
                    server: "3594",
                    title: "car",
                    tags: ["one", "w", "asCaRRRRd", "lol", "iWantToWork", "f", "safa"]
                }
            ],
            receivingPhotosSuccess: true,
            receivingPhotosProgress: false,
            newName: "cow",
            someError: ""
        }
    }
)

test('photos should be correct added', () => {
    const page = 1
    const pages = 1
    const newPhotoArray: PhotoType[] = [{
        farm: 4,
        id: "13682192333",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "Mixa",
        secret: "882c1eecff",
        server: "3718",
        title: "CarS",
    }]

    const action: ActionsType = setPhotos(newPhotoArray,page,pages );
    const endState = imageSearchReducer(startState, action)

    expect(endState.photo.length).toBe(1);
    expect(endState.photo[0].id).toBe("13682192333");
    expect(endState.photo[0].tags.length).toBe(0);
});

test('isGettingPhotosProgress should be correct changed', () => {

    let receivingPhotosProgress:boolean =true
    const action: ActionsType = setIsReceivingProgress(receivingPhotosProgress);
    const endState = imageSearchReducer(startState, action)

    expect(endState.receivingPhotosProgress).toBeTruthy()

    receivingPhotosProgress =false
    const newAction: ActionsType = setIsReceivingProgress(receivingPhotosProgress);
    const endState1 = imageSearchReducer(startState, newAction)

    expect(endState1.receivingPhotosProgress).toBeFalsy()
});

test('searchName should be correct changed', () => {
    const someName:string = "TodayIsMyDay"
    const action: ActionsType = setSearchName(someName);
    const endState = imageSearchReducer(startState, action)

    expect(endState.searchName).toBe("TodayIsMyDay");
});

test('tag should be correct added', () => {
    const id= "13682192405"
    const tag= "mine"
    const action: ActionsType = addTag(id,tag);
    const endState = imageSearchReducer(startState, action)

    expect(endState.photo[0].tags.some(element => element === tag)).toBeTruthy();
});

test('tag should be correct deleted', () => {
    const id= "13682192405"
    const tag= "dsdadsfas"
    const action: ActionsType = deleteTag(id,tag);
    const endState = imageSearchReducer(startState, action)

    expect(endState.photo[0].tags.length).toBe(6)
    expect(endState.photo[0].tags.some(element => element !== tag)).toBeTruthy();
});

test('page should be correct changed', () => {
    const page= 11
    const action: ActionsType = setPage(page);
    const endState = imageSearchReducer(startState, action)
    expect(endState.page).toBe(11);
});

test('setNewName should be correct changed', () => {
    const newName:string= "newNewName"
    const action: ActionsType = setNewName(newName);
    const endState = imageSearchReducer(startState, action)
    expect(endState.newName).toBe("newNewName");
});


test('error should be correct changed', () => {
    const error:string= "newBigError"
    const action: ActionsType =setNewError(error);
    const endState = imageSearchReducer(startState, action)
    expect(endState.someError).toBe("newBigError");
});