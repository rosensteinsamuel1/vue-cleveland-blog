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
        addBlog: (state, payload) => {
            state.blogs.push(payload)
            state.filterBlogs = state.blogs.sort((a, b) => {
                return b.timestamp - a.timestamp;
            })
        },
        doneLoading: (state) => {
            state.loading = false
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
        },
        search: (state, payload) => {
            payload = payload.toLowerCase();
            state.filterBlogs = state.blogs.filter(blog => {
                console.log(blog)
                return (
                    blog.title.toLowerCase().match(payload) ||
                    blog.content.toLowerCase().match(payload) ||
                    blog.author.toLowerCase().match(payload)
                );
            });
        }
    },
    actions: {
        getBlogs: (context) => {
            context.loading = true
            DB.collection('posts').onSnapshot(result => {
                const changes = result.docChanges();
                changes.forEach(change => {
                    if (change.type === 'added') {
                        context.commit('addBlog', { ...change.doc.data(), id: change.doc.id })
                    }
                })
                context.commit('doneLoading')
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
                    console.log("doc.data() ", doc.data());
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
                    isMarkdown: blog.isMarkdown,
                    authorId: context.state.user.id
                })
                .then(() => {
                    if (imageId) {
                        console.log('blog.selectedImage: ', blog.selectedImage)
                        // upload image to firebase storage
                        const ref = Storage.ref().child('images/' + imageId)
                        ref.put(blog.selectedImage).then(() => { console.log('image saved') })
                    }
                }

                )
        }
    }
})