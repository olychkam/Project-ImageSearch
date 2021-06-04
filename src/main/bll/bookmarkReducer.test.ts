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
                    bookmarkPhotoId: "45925416992",
                    bookmarkPhoto: {
                        farm: 5,
                        id: "45925416992",
                        isfamily: 0,
                        isfriend: 0,
                        ispublic: 1,
                        owner: "73422502@N08",
                        secret: "c9caac8cb9",
                        server: "4838",
                        title: "Cat",
                        tags: ["aa", "new"]
                    }
                },
              ]
        }
    }
)


test('photo should be correct deleted', () => {
    const id = "45925416992"
    const action: ActionsType = deletePhotoFromBookmark(id);
    const endState = bookmarkReducer(startState, action)
    expect(endState.bookmark.length).toBe(1);
});

test('tag  should be correct added to photo', () => {
    const id = "45925416992"
    const tag = "new"
    const action: ActionsType = addTagToBookmark(id, tag);
    const endState = bookmarkReducer(startState, action)
    expect(endState.bookmark.length).toBe(1);
    expect(endState.bookmark[0].bookmarkPhoto.tags).toContain("new")
});

