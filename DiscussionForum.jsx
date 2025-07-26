

// import React, { useState, useEffect, useContext } from 'react';
// import TypingAnimation from './TypingAnimation';
// import { getAuth } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import '../Discussion/DiscussionForum.css';
// import {
//   getFirestore,
//   collection,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
//   deleteDoc,
//   doc,
//   query,
//   where,
//   getDocs,
// } from 'firebase/firestore';
// import UserContext from '../../../Components/LoginSignup/UserContext';
// import './DiscussionForum.css';

// // Firebase configuration
// const firebaseConfig = {
//}

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// const DiscussionForum = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');
//   const [replies, setReplies] = useState({});
//   const [replyText, setReplyText] = useState({});
//   const { loggedInUserName } = useContext(UserContext);
    
//   const isAdmin = loggedInUserName && loggedInUserName.endsWith('@admin.cs.uol.edu.pk');

//   // console.log("Logged in user:", loggedInUserName);
//   // console.log("Is admin?", isAdmin);
  
//   useEffect(() => {
   
  

//     const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
//       const postsData = [];
//       snapshot.forEach((doc) => postsData.push({ ...doc.data(), id: doc.id }));
  
//       // Sort posts by createdAt (latest first)
//       postsData.sort((a, b) => {
//         const timeA = a.createdAt?.toDate?.() || new Date(0);
//         const timeB = b.createdAt?.toDate?.() || new Date(0);
//         return timeB - timeA;
//       });
  
//       setPosts(postsData);
  
//       // Fetch replies
//       postsData.forEach(async (post) => {
//         const repliesSnapshot = await getDocs(
//           query(collection(db, 'replies'), where('postId', '==', post.id))
//         );
//         const postReplies = repliesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setReplies((prevState) => ({ ...prevState, [post.id]: postReplies }));
//       });
//     });
  
//     return () => unsubscribe();
//   }, []);
  
//   if (loggedInUserName === 'Guest') return null;
  
//   const handlePostSubmit = async () => {
//     if (newPost.trim()) {
//       await addDoc(collection(db, 'posts'), {
//         content: newPost,
//         createdAt: serverTimestamp(),
//         author: loggedInUserName,
//       });
//       setNewPost('');
//     }
//   };

//   const handleReplySubmit = async (postId) => {
//     const replyContent = replyText[postId];
//     if (replyContent?.trim()) {
//       await addDoc(collection(db, 'replies'), {
//         postId,
//         content: replyContent,
//         createdAt: serverTimestamp(),
//         author: loggedInUserName,
//       });

//       setReplyText((prev) => ({ ...prev, [postId]: '' }));

//       const repliesSnapshot = await getDocs(
//         query(collection(db, 'replies'), where('postId', '==', postId))
//       );
//       const postReplies = repliesSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setReplies((prevState) => ({ ...prevState, [postId]: postReplies }));
//     }
//   };

//   const handleDeletePost = async (postId, postAuthor) => {
//     if (isAdmin) {
//       try {
//         await deleteDoc(doc(db, 'posts', postId));
//       } catch (error) {
//         console.error('Error deleting post: ', error);
//       }
//     } else {
//       alert("You don't have permission to delete this post.");
//     }
//   };

//   const handleDeleteReply = async (postId, replyId, replyAuthor) => {
//     if (isAdmin) {
//       try {
//         await deleteDoc(doc(db, 'replies', replyId));
//         const updatedReplies = { ...replies };
//         updatedReplies[postId] = updatedReplies[postId].filter((reply) => reply.id !== replyId);
//         setReplies(updatedReplies);
//       } catch (error) {
//         console.error('Error deleting reply: ', error);
//       }
//     } else {
//       alert("You don't have permission to delete this reply.");
//     }
//   };

//   return(
//     <div
//   className="container py-5"
//   style={{
//     minHeight: '100vh',
//     backgroundColor: '#f3f4f6' // soft light gray
//   }}
// >
//   {/* Header */}
//   <div className="d-flex justify-content-center mb-5">
//     <div
//       className="p-4 shadow-lg rounded-4"
//        style={{
//         width: '100%',
//         maxWidth: '700px',
//         textAlign: 'center',
//         backgroundColor: '#ffffff',
//         border: '1px solid rgba(0, 0, 0, 0.05)',
//       }}
//     >
//       <h1
//         className="discussion-logo mb-2"
//          style={{
//           color: '#3b3054', // muted indigo
//           fontWeight: '700',
//           fontSize: '2.75rem',
//           letterSpacing: '1px',
//         }}
//       >
//         Discussion Forum
//       </h1>
//       <TypingAnimation />
//     </div>
//   </div>

//   {/* New Post */}
//   <div className="d-flex justify-content-center mt-4">
//     <div
//       className="card shadow-lg p-4 w-100 border-0 mt-5"
//       style={{
//         maxWidth: '700px',
//         backgroundColor: '#ffffff',
//         borderRadius: '1rem',
//         border: '1px solid rgba(0,0,0,0.05)',
//       }}
//     >
//       <textarea
//         className="form-control mb-3 fs-5"
//         placeholder="Start a new discussion..."
//         value={newPost}
//         onChange={(e) => setNewPost(e.target.value)}
//       />
//       <button className="btn btn-primary w-100 fs-5" onClick={handlePostSubmit}>
//         Post
//       </button>
//     </div>
//   </div>

//   {/* Posts and Replies */}
//   <div className="row justify-content-center mt-4 fs-5">
//     {posts.map((post) => {
//       const createdAtDate = post.createdAt?.toDate();
//       const formattedDateTime = createdAtDate
//         ? new Intl.DateTimeFormat('default', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//             hour12: true,
//             timeZone: 'Asia/Karachi',
//           }).format(createdAtDate)
//         : '';

//       return (
//         <div key={post.id} className="col-12 mb-4" style={{ maxWidth: '700px' }}>
//           <div
//             className="card post-card shadow-lg mt-3 border-0 h-100 fs-5"
//             style={{
//               backgroundColor: '#ffffff',
//               borderRadius: '1rem',
//               border: '1px solid rgba(0, 0, 0, 0.05)',
//             }}
//           >
//             <div className="card-body rounded">
//               <h5 className="card-title text-primary">{post.author}</h5>
//               <p className="card-text">{post.content}</p>
//               <small className="text-muted">{formattedDateTime}</small>

//               {/* Delete post */}
//               {isAdmin && (
//                 <div className="mt-3">
//                   <button
//                     className="btn btn-outline-danger btn-sm w-100 fs-5"
//                     onClick={() => handleDeletePost(post.id, post.author)}
//                   >
//                     Delete Post
//                   </button>
//                 </div>
//               )}

//               {/* Reply */}
//               <div className="mt-4">
//                 <textarea
//                   className="form-control mb-2"
//                   placeholder="Write a reply..."
//                   value={replyText[post.id] || ''}
//                   onChange={(e) =>
//                     setReplyText({ ...replyText, [post.id]: e.target.value })
//                   }
//                 />
//                 <button
//                   className="btn btn-outline-success btn-sm w-100 fs-5"
//                   onClick={() => handleReplySubmit(post.id)}
//                 >
//                   Reply
//                 </button>
//               </div>

//               {/* Replies */}
//               {replies[post.id] &&
//                 replies[post.id].map((reply) => {
//                   const replyCreatedAtDate = reply.createdAt?.toDate();
//                   const formattedReplyDateTime = replyCreatedAtDate
//                     ? new Intl.DateTimeFormat('default', {
//                         year: 'numeric',
//                         month: '2-digit',
//                         day: '2-digit',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         second: '2-digit',
//                         hour12: true,
//                         timeZone: 'Asia/Karachi',
//                       }).format(replyCreatedAtDate)
//                     : '';

//                   return (
//                     <div key={reply.id} className="border-top pt-2 mt-3">
//                       <h6 className="text-success">{reply.author}</h6>
//                       <p className="mb-1">{reply.content}</p>
//                       <small className="text-muted">{formattedReplyDateTime}</small>
//                       {isAdmin && (
//                         <button
//                           className="btn btn-outline-danger btn-sm mt-2 w-100 fs-5"
//                           onClick={() =>
//                             handleDeleteReply(post.id, reply.id, reply.author)
//                           }
//                         >
//                           Delete Reply
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </div>

//   );
// };

// export default DiscussionForum;
// export { db, auth };


import React, { useState, useEffect, useContext } from 'react';
import TypingAnimation from './TypingAnimation';
import UserContext from '../../../Components/LoginSignup/UserContext';
import './DiscussionForum.css';

const DiscussionForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState({});
  const { loggedInUserName } = useContext(UserContext);

  const isAdmin = loggedInUserName?.endsWith('@admin.cs.uol.edu.pk');

  const getUserRole = (email) => {
    if (email.endsWith('@admin.cs.uol.edu.pk')) return 'Admin';
    if (email.endsWith('@student.uol.edu.pk')) return 'Student';
    if (email.endsWith('@cs.uol.edu.pk')) return 'Supervisor';
    if (email.endsWith('@cs.uol.edu.pk')) return 'Evaluator';
    return 'Unknown';
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/discussion/discussionforum/getallpost');
      const data = await response.json();
      if (response.ok) setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchReplies = async () => {
    try {
      const response = await fetch('http://localhost:8080/discussion/discussionforum/getReply');
      const data = await response.json();
      if (response.ok) {
        const groupedReplies = {};
        data.forEach((reply) => {
          const key = reply.content;
          if (!groupedReplies[key]) groupedReplies[key] = [];
          groupedReplies[key].push(reply);
        });
        setReplies(groupedReplies);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchReplies();
  }, []);

  const handlePostSubmit = async () => {
    if (newPost.trim()) {
      try {
        let audience = [getUserRole(loggedInUserName)];

        const response = await fetch('http://localhost:8080/discussion/discussionforum/createpost', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ author: loggedInUserName, content: newPost, audience }),
        });

        const data = await response.json();
        if (response.ok) {
          setNewPost('');
          fetchPosts();
        } else {
          alert(data.errors?.[0]?.msg || 'Failed to create post');
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleReplySubmit = async (postContent) => {
    const replyContent = replyText[postContent];
    if (replyContent?.trim()) {
      try {
        const response = await fetch('http://localhost:8080/discussion/discussionforum/createReply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reply: replyContent,
            author: loggedInUserName,
            content: postContent,
            audience: [getUserRole(loggedInUserName)],
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setReplyText((prev) => ({ ...prev, [postContent]: '' }));
          fetchReplies();
        } else {
          alert(data.errors?.[0]?.msg || 'Failed to post reply');
        }
      } catch (error) {
        console.error('Error posting reply:', error);
      }
    }
  };
const handleDeletePost = async (postContent) => {
  if (!isAdmin) return alert('Only admins can delete posts.');
  try {
    const response = await fetch(
      `http://localhost:8080/discussion/discussionforum/deletepost/${encodeURIComponent(postContent)}`,
      { method: 'DELETE' }
    );
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || 'Failed to delete post');
      return;
    }
    // Refresh posts and replies after successful deletion
    await fetchPosts();
    // await fetchReplies();
  } catch (err) {
    console.error('Error deleting post:', err);
  }
};

const handleDeleteReply = async (replyTextContent) => {
  if (!isAdmin) return alert('Only admins can delete replies.');
  try {
    const response = await fetch(
      `http://localhost:8080/discussion/discussionforum/deleteReply/${encodeURIComponent(replyTextContent)}`,
      { method: 'DELETE' }
    );
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || 'Failed to delete reply');
      return;
    }
    // Refresh replies and posts after successful deletion
    // await fetchPosts();
    await fetchReplies();
  } catch (err) {
    console.error('Error deleting reply:', err);
  }
};

  return (
    <div className="container py-5" style={{ minHeight: '100vh' }}>
      <div className="d-flex justify-content-center">
        <div
          className="p-4 rounded-circle shadow-sm pt-5 pd-5"
          style={{ width: '100%', maxWidth: '700px', textAlign: 'center', backgroundColor: '#60248668' }}
        >
          <h1 className="discussion-logo mb-3" style={{ color: 'beige' }}>
            Discussion Forum
          </h1>
          <TypingAnimation />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <div className="card shadow-lg p-4 w-100 border-0" style={{ maxWidth: '700px' }}>
          <textarea
            className="form-control mb-3"
            placeholder="Start a new discussion..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        {posts.map((post, index) => (
          <div key={index} className="col-12 mb-4" style={{ maxWidth: '700px' }}>
            <div className="card post-card shadow-lg mt-3 border-0 h-100">
              <div className="card-body rounded">
                <h5 className="card-title text-primary">{post.author}</h5>
                <p className="card-text">{post.content}</p>

                {isAdmin && (
                  <div className="mt-3">
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => handleDeletePost(post.content)}
                    >
                      Delete Post
                    </button>
                  </div>
                )}

                <div className="mt-4">
                  <textarea
                    className="form-control mb-2"
                    placeholder="Write a reply..."
                    value={replyText[post.content] || ''}
                    onChange={(e) =>
                      setReplyText({ ...replyText, [post.content]: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-outline-success btn-sm w-100"
                    onClick={() => handleReplySubmit(post.content)}
                  >
                    Reply
                  </button>
                </div>

                {replies[post.content] &&
                  replies[post.content].map((reply, i) => (
                    <div key={i} className="border-top pt-2 mt-3">
                      <h6 className="text-success">{reply.author}</h6>
                      <p className="mb-1">{reply.reply}</p>
                      {isAdmin && (
                        <button
                          className="btn btn-outline-danger btn-sm mt-2 w-100"
                          onClick={() => handleDeleteReply(reply.reply)}
                        >
                          Delete Reply
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;

