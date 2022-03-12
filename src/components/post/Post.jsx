import React from 'react';
import './post.css'
import {Link} from "react-router-dom"


export default function Post({post}) {
  return <div className='post'>
    <img className='postImg' src={post.photo} alt="" />
    <div className="postInfo">
      <div className="postCats">
      <Link to={`/?cat=${post.categories}`} className='link postCat'><b> {post.categories}</b></Link>
      </div>
      <Link to={`/post/${post._id}`} className='link'>
        <span className="postTitle">{post.title}</span>
      </Link>
      <hr />
      
    </div>
    <div className="details">
      <span className='postAuthor'>Author:     
              <Link to={`/?user=${post.username}`} className='link'><b> {post.username}</b></Link></span>
      <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
    <p className='postDesc'>{post.desc}</p>
  </div>;
}
