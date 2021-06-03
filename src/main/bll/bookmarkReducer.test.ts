import {
    addTagToBookmark,
    bookmarkReducer, deletePhotoFromBookmark, InitialStateType,
} from "./bookmarkReducer";
import {ActionsType} from "./redux-store";


let startState: InitialStateType = {bookmark: []}
beforeEach(() => {
        startState = {
            bookmark: [
                {
                    bookmarkPhotoId: "13682192405",
                    bookmarkPhoto: {
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
                    }
                },
                {
                    bookmarkPhotoId: "211",
                    bookmarkPhoto: {
                        farm: 3,
                        id: "211",
                        isfamily: 0,
                        isfriend: 0,
                        ispublic: 1,
                        owner: "Nick",
                        secret: "882c3f",
                        server: "2118",
                        title: "x3",
                        tags: ["rweg", "ww", "eer", "ll", "ljj", "f", "safa"]
                    }
                }]
        }
    }
)


test('photo should be correct deleted', () => {
    const id = "13682192405"
    const action: ActionsType = deletePhotoFromBookmark(id);
    const endState = bookmarkReducer(startState, action)
    expect(endState.bookmark.length).toBe(1);
    expect(endState.bookmark[0].bookmarkPhotoId).toBe("211")
});

test('tag  should be correct added to photo', () => {
    const id = "13682192405"
    const tag = "newTagE"
    const action: ActionsType = addTagToBookmark(id, tag);
    const endState = bookmarkReducer(startState, action)
    expect(endState.bookmark.length).toBe(2);
    expect(endState.bookmark[0].bookmarkPhoto.tags).toContain("newTagE")
});

