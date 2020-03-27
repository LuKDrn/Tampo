
import firebase from 'firebase';

var firebaseKeys = {
    apiKey: "AIzaSyC5mBmYcaZywjWq2kKFQrNR4wlS_wnHu4o",
    authDomain: "tampo-41ba7.firebaseapp.com",
    databaseURL: "https://tampo-41ba7.firebaseio.com",
    projectId: "tampo-41ba7",
    storageBucket: "tampo-41ba7.appspot.com",
    messagingSenderId: "815374756118",
    appId: "1:815374756118:web:cfb7be8850379aa668c837",
    measurementId: "G-GJPWTJYBVP"
};
class Fire {
    constructor() {
        firebase.initializeApp(firebaseKeys)
    }

    // Envoie de la publication sur la base Firebase
    addPost = async ({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri)

        return new Promise((res, rej) => {
            this.firestore.collection("posts")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri
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
    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase
            .storage()
            .ref(path)
            .put(file);

            upload.on("state_changed", snapshot => {}, err => {
                rej(err)
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
            );
        });
    };

    get firestore() {
        return firebase.firestore()
    }
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    get timestamp() {
        return Date.now();
    }

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

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }
    
    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

}

Fire.shared = new Fire();
export default Fire;