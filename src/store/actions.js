import { DB } from '../firebase/db'
import { Auth } from '../firebase/auth'
import { Storage } from '../firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export const actions = {
    getBlogs: (context) => {
        context.loading = true
        DB.collection('posts').onSnapshot(result => {
            const changes = result.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    context.commit('addBlog', { ...change.doc.data(), id: change.doc.id })
                }
                if (change.type === 'modified') {
                    // remove old blog
                    context.commit('removeBlog', change.doc.id)
                    // add modified blog
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
    addNewBlog: (context, { selectedImage, title, content, isMarkdown }) => {
        let imageId = null
        let dbSave;
        if (selectedImage) {
            // create a unique identifier for the image's location and retrieval
            imageId = uuidv4();
            console.log('blog.selectedImage: ', selectedImage)
            // upload image to firebase storage before saving to database
            const ref = Storage.ref().child('images/' + imageId)
            dbSave = ref.put(selectedImage)
        } else {
            dbSave = Promise.resolve()
        }
        dbSave.then(() => {
            DB.collection("posts")
                .doc()
                .set({
                    title,
                    content,
                    isMarkdown,
                    imageId,
                    timestamp: Date.now(),
                    author: context.state.user.name,
                    authorId: context.state.user.id
                })
        })
    }
}
