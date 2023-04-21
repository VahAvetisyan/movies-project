import "./Profile.css";
import { useState, useEffect } from "react";
import {ref,uploadBytes,getDownloadURL,listAll,} from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";

function Profile() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    return (

        <div className="Profile">
            <div>
            {imageUrls.length ? 
                imageUrls.map((url, i) => {
                    if (i === imageUrls.length - 1) {
                        return <img key={v4()} id="profile-picture" src={url} />;
                    }
                })
                : <img key={v4()} id="profile-picture" src={ref(storage, `account-25.png`)} />
            }
            
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button id="upload-button" onClick={uploadFile}> Upload Image</button>
            </div>
            <div>
                <h4></h4>
            </div>
            
        </div>
    );
}

export default Profile;