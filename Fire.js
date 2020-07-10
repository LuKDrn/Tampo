// Copyright TAMPO 
// Author : Lucas DEROUIN

import * as firebase from 'firebase';

class Fire {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyC5mBmYcaZywjWq2kKFQrNR4wlS_wnHu4o",
            authDomain: "tampo-41ba7.firebaseapp.com",
            databaseURL: "https://tampo-41ba7.firebaseio.com",
            projectId: "tampo-41ba7",
            storageBucket: "tampo-41ba7.appspot.com",
            messagingSenderId: "815374756118",
            appId: "1:815374756118:web:cfb7be8850379aa668c837",
            measurementId: "G-GJPWTJYBVP"
        });
    }
    //Création d'un utilisateur 
    createUser = async user => {
        let remoteUri= null
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            let db = this.firestore.collection("users").doc(this.uid)
            db.set({
                name: user.name,
                email: user.email,
                avatar: "",
                city: user.city,
                sexe: user.sexe,
                instruments: user.instruments,
                styles: user.styles,
                pratiques: user.pratiques
            })
            if (user.avatar){
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);
                db.set({avatar: remoteUri}, {merge: true});
            }
        }
        catch (error) {
            alert(error);
        }
    }
    
    //Ajout dans la base de la publication
    addPost = async ({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri);

        return new Promise((res, rej) => {
            this.firestore
            .collection("posts")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                video: remoteUri
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error);
            });
        });
    };

    // Téléchargement de la photos séléctionné
    uploadPhotoAsync = async (uri) => {
        const path = `videos/${this.uid}/${Date.now()}.mp4`;
        
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
            .storage()
            .ref(path)
            .put(file);

            upload.on(
                "state_changed",
                 snapshot => {},
                  err => {
                    rej(err)
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
            );
        });
    };

    // Envoie de messages
    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message);
        });
    };
    
    //Affichage de messages
    parse = message => {
        const {user, text, timestamp} = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };
    signOut = () => {
        firebase.auth().signOut();
    }
    //Connexion à la BDD
    get firestore() {
        return firebase.firestore();
    }
    //Récupérer l'utilisateur connecte
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    // L'heure actuelle
    get timestamp() {
        return Date.now();
    }


    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }
    
    get db() {
        return firebase.database().ref("messages");
    }
}

Fire.shared = new Fire();
export default Fire;