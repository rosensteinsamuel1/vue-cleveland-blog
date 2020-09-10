import { DB } from '../firebase/db'
import { Auth } from '../firebase/auth'
import { Storage } from '../firebase/storage'
import { v4 as uuidv4 } from 'uuid'

import { GET_BLOGS, USER_NEW_SIGN_IN, USER_CHECK_LOGGED_IN, USER_GET_INFO, USER_LOG_OUT } from './action-types'

import { ADD_NEW_BLOG, UPDATE_BLOG, DONE_LOADING, USER_SIGN_IN, USER_LOG_OUT_COMMIT } from './mutation-types'

export const actions = {
    [GET_BLOGS]: (context) => {
        context.loading = true
        DB.collection('posts').onSnapshot(result => {
            const changes = result.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    context.commit(ADD_NEW_BLOG, { ...change.doc.data(), id: change.doc.id })
                }
                if (change.type === 'modified') {
                    // remove old blog and update blogs
                    context.commit(UPDATE_BLOG, { ...change.doc.data(), id: change.doc.id })
                }
            })
            context.commit(DONE_LOADING)
        })
    },
    [USER_CHECK_LOGGED_IN]: (context) => {
        Auth.onAuthStateChanged((user) => {
            if (user === null) {
                // context.user.id = null
            } else {
                console.log('user is alread logged in!')
                if (!user.name) {
                    context.dispatch(USER_GET_INFO, user.uid)
                }
            }
        })
    },
    [USER_NEW_SIGN_IN]: (context, user) => {
        console.log('signInNewUser')
        DB.collection("users")
            .doc(user.id)
            .set({
                username: user.username,
                email: user.email
            })
            .then(() => {
                context.dispatch(USER_GET_INFO, user.id)

            })
            .catch(err => {
                console.log("ERROR: ", err);
            });
    },
    [USER_GET_INFO]: (context, uid) => {
        DB.collection("users")
            .doc(uid)
            .get()
            .then(doc => {
                console.log("doc.data() ", doc.data());
                context.commit(USER_SIGN_IN, {
                    name: doc.data().username,
                    id: doc.id
                });
            });
    },
    [USER_LOG_OUT]: (context) => {
        Auth.signOut().then(() => {
            console.log('Signed out from Firebase')
            context.commit(USER_LOG_OUT_COMMIT)
        }).catch(err => console.log('There was an ERROR signing out: ', err))
    },
    [ADD_NEW_BLOG]: (context, { selectedImage, title, content, isMarkdown }) => {
        let imageId = null
        let dbSave;
        /** 
         * upload image to firebase storage before saving to database so that the image
         * can be retrieved when post loads the first time (saving data is faster than saving
         * the image)
        */
        if (selectedImage) {
            // create a unique identifier for the image's location and retrieval
            imageId = uuidv4();
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
