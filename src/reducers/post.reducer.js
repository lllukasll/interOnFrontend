import { postConstants } from '../constants';

export function posts(state = {}, action) {
    switch (action.type) {
        case postConstants.CREATEGROUPPOST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case postConstants.CREATEGROUPPOST_SUCCESS:
            return {
                ...state,
                created: true,
                messageShown: true
            };
        case postConstants.CREATEGROUPPOST_FAILURE:
            return {
                error: action.error
            };
        case postConstants.GETGROUPPOSTS_REQUEST:
            return {
                loading: true
            };
        case postConstants.GETGROUPPOSTS_SUCCESS:
            return {
                posts: action.posts
            };
        case postConstants.GETGROUPPOSTS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
/*
export function getAllPosts(state = {}, action) {
    switch (action.type) {
        case postConstants.GETGROUPPOSTS_REQUEST:
            return {
                loading: true
            };
        case postConstants.GETGROUPPOSTS_SUCCESS:
            return {
                posts: action.posts
            };
        case postConstants.GETGROUPPOSTS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
*/