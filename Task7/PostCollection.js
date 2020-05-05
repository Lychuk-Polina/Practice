"use strict";
class PostCollection{
    _posts = [];

    constructor(posts){
        this._posts = posts;
    }

    addAll(posts){
        let notValidPosts = [];

         for (let i = 0; i < posts; i++){
		
            if (PostCollection.validate(posts[i])){
                this._posts.push(posts[i]);
            }
            else {
                notValidPosts.push(posts[i]);
            }
        }
        return notValidPosts;

    }

    clear(){

        this._posts.splice(0, this._posts.splice);

    }

    get(id){
        let post = posts.find(function(item){
            return item.id == id;
        });
        return post;
    }
 
	static validate(post) {
	    return (post.id != undefined) && (post.description != undefined) && 
	    		(post.createdAt!= undefined)&&(post.author != undefined && post.author.length != 0);
		}

 		
	add(post){
        if(PostCollection.validate(post)){
        	this._posts.push(post);
        	return true;
            
        }return false; 
    }

 	editPost(id, post){

		const oldPost = this._posts.find(post => post.id === id);
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

		if(!PostCollection.validate(post)){
			return false;
			}
			return true;
	} 


    remove(id){
        let index = posts.findIndex(function(item){
            return item.id == id
        });
        if(index !== -1){ 

        posts.splice(index, 1);
        return true;
	    }
	}	
	 	
	getPage(skip = 0, top = 10, filters) {

			 let filtered = this._filter(filters); 
			 filtered.sort(this.compareData);
			return filtered.slice(skip, skip + top);

		}
 

  _filter(filters) {
        let filtered = this._posts;	  
        Object.entries(filters).forEach(([i, thisArg]) => {
           if (thisArg instanceof Array) {
            filtered = filtered.filter(post => post[i].some((tag) =>
                    thisArg.includes(tag)));
              } else if (thisArg instanceof Date) {
                 	filtered = filtered.filter(post => post[i].toDateString() ===
                 	 thisArg.toDateString());
              } else { 	
                    filtered = filtered.filter(post => post[i] === thisArg);
               		 }	            
 			});
     return filtered;
    };	   

    
	compareData(post1, post2){
		return post2.createdAt - post1.createdAt;
		}
	};

	let postCollection = new PostCollection(posts);
    postCollection.clear();
    postCollection.addAll(posts);

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
	console.log(postCollection.add({
	id: '21',
	description: 'We added NEW post.',
	createdAt: new Date(),
	author: 'Peter Pen',
	photoLink: 'https://images.unsplash.com/photo-1587614387292-a600352229d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=623&q=80',
	hashTags: ['#love'],
	likes: ['Rihanna'],
	}));
	console.log(" Add not validatePost:");
	 console.log(postCollection.add(1));
	console.log(" Get new post:");
	console.log(postCollection.get(21));
	console.log(" GetPost with id=3:");
	console.log(postCollection.get(3));
	console.log("GetPost with incorrect id");
    console.log(postCollection.get(50));
	console.log(" Edit post with id=9:");
	console.log(postCollection.get('9'));
	postCollection.editPost(9, editedPost);
	console.log(" Post after editing:");
	console.log(postCollection.get('9'));
	console.log("EditPost with incorrect parameters");
    console.log(postCollection.editPost('44', 'aaaa'));
    console.log("Add new post:");
    console.log(postCollection.add({
	id: '22',
	description: 'We added NEW post.',
	createdAt: new Date(),
	author: 'Anna Heraska',
	photoLink: 'https://images.unsplash.com/photo-1587614387292-a600352229d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=623&q=80',
	hashTags: ['#love'],
	likes: ['Rihanna'],
	}));
 	console.log(" Check getPosts with filter:");
    console.log(postCollection.getPage(0, 22,{
	author: 'Anna Heraska',
	hashTags: ['#love'],
	}));

    console.log("RemovePost with incorrect id");
    console.log(postCollection.remove(100));
	console.log(" Remove post with id=21:");
	postCollection.remove('21');
	console.log(posts); 
 