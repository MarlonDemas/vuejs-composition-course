import { reactive, readonly } from "vue"
import axios from 'axios'
import { Post } from "./types"
import { todayPost, thisWeek, thisMonth } from "./mocks";

interface PostStates {
    ids: string[]
    all: Record<string, Post>
    loaded: boolean
}

interface State {
    posts: PostStates
}

const initialPostsState = (): PostStates => ({
    all: {
        [todayPost.id.toString()]: todayPost,
        [thisMonth.id.toString()]: thisMonth
    },
    ids: [
        todayPost.id.toString(), thisMonth.id.toString()
    ],
    loaded: false
})

const initialState = (): State => ({ 
    posts: initialPostsState() 
})

class Store {
    protected state: State

    constructor(initialState: State) {
        this.state = reactive(initialState)
    }

    public getState() {
        return readonly(this.state)
    }

    async fetchPosts() {
        const response = await axios.get<Post[]>('/posts')
        const ids: string[] = []
        const all: Record<string, Post> = {}
        for (const post of response.data) {
            ids.push(post.id.toString())
            all[post.id.toString()] = post
        }

        this.state.posts = {
            ids,
            all,
            loaded: true
        }
    }
}

const store = new Store(initialState())
store.getState()

export const useStore = () => store