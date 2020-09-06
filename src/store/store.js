import Vue from 'vue'
import Vuex from 'vuex'
import { DB } from '../firebase/db'
import { Auth } from '../firebase/auth'
import { Storage } from '../firebase/storage'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        blogs: [],
        filterBlogs: [],
        loading: true,
        signedIn: false,
        user: {
            name: "",
            id: ""
        }
    },
    mutations: {
        getBlogs: (state, payload) => {
            state.blogs = payload
            state.loading = false;
        },
        signInUser: (state, payload) => {
            state.signedIn = true
            state.user.name = payload.name
            state.user.id = payload.id
        },
        logOut: (state) => {
            state.signedIn = false;
            state.user.name = ""
            state.user.id = null
        }
    },
    actions: {
        getBlogs: (context) => {
            context.loading = true
            DB.collection('posts').get().then(result => {
                const _blogs = []
                result.docs.map(doc => {
                    _blogs.push({ ...doc.data(), id: doc.id })
                })
                context.commit('getBlogs', _blogs)
            })
        },
        retrieveUser: (context) => {
            Auth.onAuthStateChanged((user) => {
                if (user === null) {
                    // context.user.id = null
                } else {
                    console.log('user is alread logged in!')
                    if (!user.name) {
                        context.dispatch('getUserInfo', user.uid)
                    }
                }
            })
        },
        signInNewUser: (context, user) => {
            console.log('signInNewUser')
            DB.collection("users")
                .doc(user.id)
                .set({
                    username: user.username,
                    email: user.email
                })
                .then(() => {
                    context.dispatch('getUserInfo', user.id)

                })
                .catch(err => {
                    console.log("ERROR: ", err);
                });
        },
        getUserInfo: (context, uid) => {
            DB.collection("users")
                .doc(uid)
                .get()
                .then(doc => {
                    console.log("doc.data(): ", doc);
                    context.commit('signInUser', {
                        name: doc.data().username,
                        id: doc.id
                    });
                });
        },
        logOut: (context) => {
            Auth.signOut().then(() => {
                console.log('Signed out from Firebase')
                context.commit('logOut')
            }).catch(err => console.log('There was an ERROR signing out: ', err))
        },
        addNewBlog: (context, blog) => {
            // create a unique identifier for the image's location and retrieval
            let imageId = null
            if (blog.selectedImage) {
                imageId = uuidv4();
            }
            DB.collection("posts")
                .doc()
                .set({
                    title: blog.title,
                    content: blog.content,
                    topic: blog.topic,
                    timestamp: Date.now(),
                    author: context.state.user.name,
                    imageId: imageId,
                    isMarkdown: blog.isMarkdown
                })
                .then(() => {
                    if (imageId) {
                        console.log('blog.selectedImage: ', blog.selectedImage)
                        // upload image to firebase storage
                        const ref = Storage.ref().child('images/' + imageId)
                        ref.put(blog.selectedImage)
                    }
                })
        }
    }
})