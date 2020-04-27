'use strict';

let posts = [];

for (let i = 1; i <= 20; i++){
    let post = {

        id: i,
        description: ' post nubmer ' + i,
        createdAt: new Date(),
        author: 'Anna Heraska',
        photoLink: 'https://images.unsplash.com/photo-1587614387292-a600352229d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=623&q=80',
        hashTags: [ '#design'],
        likes: ['Nicki Minaj', 'Rihanna']

    };

    posts.push(post);
}