"use strict";
(function() {

    function getPost(id){
        let post = posts.find(function(item){
            return item.id == id;
        });
        return post;
    }

	function validatePost(post){

		if(post.id == undefined || post.createdAt == undefined || post.photoLink == undefined){
			return false;
		}
		if( post.hashTags == undefined || post.likes == undefined){
			return false;
		}
		if (post.likes === undefined) {
			return false;
		}
		if(post.description.length >= 200 || post.description == undefined){
			return false;
		}
		if (post.createdAt === undefined) {
			return false;
		}
		 
		if (!post.author) {
   		 return false
		}
		 else if (post.author.length === 0) {
			return false;
		}
		if (post.photoLink === undefined) {
			return false;
		}

		return true;
	}

    function addPost(post){
        if(!validatePost(post)){
            return false;
        }
        else{
            posts.push(post);
        }   return true;
    }

 	function editPost(id, post){

		const oldPost = posts.find(post => post.id === id);
		if (post.description) {
	    	oldPost.description = post.description;
		}
		if (post.photoLink) {
	    	oldPost.photoLink = post.photoLink;
		}
		if (post.hashTags) {
	    	oldPost.hashTags = post.hashTags;
		}
		if (post.createdAt) {
	    	oldPost.createdAt = post.createdAt;
		}
		if (post.author) {
	    	oldPost.author = post.author;
		}
		if (post.likes) {
	    	oldPost.likes = post.likes;
		}

		if(!validatePost(post)){
			return false;
			}
			return true;
	} 


    function removePost(id){
        let index = posts.findIndex(function(item){
            return item.id == id
        });
        if(index == -1){
            return false;
        }
        else{
            posts.splice(index, 1);
        }
        return true;
    }

    function getPosts(skip = 0, top = 10, filters) {

		if (skip === undefined || top === undefined) {
			return undefined;
		}

		let filteredPosts = [];

		for (let i = skip; i < top; i++) {

			filteredPosts.push(posts[i]);
		}
		 if (filters !== undefined && filters.author !== undefined && filters.author.length !== 0) {

			filteredPosts = filteredPosts.filter(post => post.author == filters.author);
		 }

		 if (filters !== undefined && filters.createdAt !== undefined) {

			filteredPosts = filteredPosts.filter(post => post.createdAt == filters.createdAt);
	 	}

		 if (filters !== undefined && filters.hashTags !== undefined && filters.hashTags.length !== 0) {

			filteredPosts = filteredPosts.filter(post => contains(post.hashTags, filters.hashTags));
		 }

		return filteredPosts.sort(compareData);
	}

	function contains(container, element){

		if (!element.length) {
			return true;
		}
		  if (!container.length) {
		   return false; 
		}

		for(let i=0; i<element.length;i++){

			if(!container.includes(element[i])){

				return false;
			}
		}
		return true;
	}

  
	function compareData(post1, post2){
		return post2.createdAt - post1.createdAt;
	}

	var editedPost={
	id: '0',
	description: 'This post was edited.',
	createdAt: new Date(),
	author: 'Anna Heraska',
	photoLink: 'https://images.unsplash.com/photo-1587614387292-a600352229d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=623&q=80',
	hashTags: ['#love'],
	likes: ['Rihanna'],
	};
 
	console.log(" all posts:");
	console.log(posts);
	console.log(" Add validatePost:");
	console.log(addPost({
	id: '21',
	description: 'We added NEW post.',
	createdAt: new Date(),
	author: 'Peter Pen',
	photoLink: 'https://images.unsplash.com/photo-1587614387292-a600352229d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=623&q=80',
	hashTags: ['#love'],
	likes: ['Rihanna'],
	}));
	console.log(" Add not validatePost:");
	console.log(addPost(1));
	console.log(" Add new post:");
	console.log(getPost(21));
	console.log(" GetPost with id=3:");
	console.log(getPost(3));
	console.log("GetPost with incorrect id");
    console.log(getPost(50));
	console.log(" Edit post with id=9:");
	console.log(getPost('9'));
	editPost(9, editedPost);
	console.log(" Post after editing:");
	console.log(getPost('9'));
	console.log("EditPost with incorrect parameters");
    console.log(editPost('44', 'aaaa'));
    console.log(addPost({
	id: '22',
	description: 'We added NEW post.',
	createdAt: new Date(),
	author: 'Anna Heraska',
	photoLink: 'https://images.unsplash.com/photo-1587614387292-a600352229d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=623&q=80',
	hashTags: ['#love'],
	likes: ['Rihanna'],
	}));
 	console.log(" Check getPosts without filter:");
 	console.log(getPosts(0,21));
	console.log(" Check getPosts with filter:");
    console.log(getPosts(0, 22,{
	author: 'Anna Heraska',
	hashTags: ['#love'],
	}));

    console.log("RemovePost with incorrect id");
    console.log(removePost(100));
	console.log(" Remove post with id=21:");
	removePost('21');
	console.log(posts); 
}());