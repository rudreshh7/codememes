import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, storage, auth } from "../lib/firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }
    const storageRef = ref(storage, `posts/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert("Upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Get current user
          const user = auth.currentUser;

          // create post document
          const postDoc = {
            username: user.displayName,
            userAvatar: user.photoURL,
            image: downloadURL,
            caption: caption,
            likes: [],
            bookmarks: [],
            date: new Date().toISOString(),
          };
          // Add post to firestore

          const newPostRef = doc(db, "posts", Date.now().toString());
          await setDoc(newPostRef, postDoc);

          alert("Post uploaded successfully");
          setImage(null);
          setCaption("");
          setProgress(0);
        });
      }
    );
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <div>
        <label htmlFor="image">Select Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="caption">Caption</label>
        <textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleUpload}>Upload Post</button>
    </div>
  );
};

export default CreatePost;
