const initialState = { favoritesVideo : [] }

function toggleFavorite(state = initialState, action){
    let nextState
    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteVideoIndex = state.favoritesVideo.findIndex(item => item.id === action.value.id)
            if (favoriteVideoIndex !== -1) {
                //Remove video if already in favorites array
                nextState = {
                    ...state,
                    favoritesVideo: state.favoritesVideo.filter( (item, index) => index !== favoriteVideoIndex)
                }
            }
            else {
                //Add favorite video if isn't in favorites array
                nextState = {
                    ...state,
                    favoritesVideo: [...state.favoritesVideo, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite