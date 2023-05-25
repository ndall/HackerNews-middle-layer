# ACP Bachelor projects 2023

This repository contains boilerplate code for ACP's Bachelor project 2023.

## Your task

In order to learn how to create a web server with Jolie. We would like you to develop a web server that serves the content identical to one that [hacker news api](https://github.com/HackerNews/API) provides. We will use the Jolie code that you develop here later for your project.

### Develop a Jolie server

First, you would need to develop a Jolie server that serves the content identical to what [hacker news api](https://github.com/HackerNews/API) provides. You can start by observing the response from [storyapi](https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty) and [itemapi](https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty). You can also observe the request form web inspection when open the web after run `npm dev`from the front-end code (see below).

### Modify Front-end code to call Jolie

You can configure the front-end to call Jolie by altering following lines in `vue-hacker-news-interface-main/src/composables`

```js
// useGetNews.js
    let { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/${newsCategory}stories.json`
    );
```

and

```js
// useGetStory.js
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
```

point the location of the call to your Jolie server.

***Note: you might need to add header on Jolie server "Access-Control-Allow-Origin: \*" to the output port in order to allow the browser to use the response***

## Code Structure

- `vue-hacker-news-interface-main` contains front-end application of hacker news interface (all credits goes to https://github.com/de-oz/vue-hacker-news-interface) which we will develop a Jolie server to serves its content.

## Front-end script

prerequisite: node installation on your machine (see https://nodejs.org/en/download/)

Run in development environment (to see it's look and feel)

```bash
cd vue-hacker-news-interface-main
npm install && npm run serve
```

Build the web application

```bash
cd vue-hacker-news-interface-main
npm install && npm run build
```

## Additional ideas

- Add [lenonardo](https://github.com/jolie/leonardo) as a web server that serves all web content.
- Add Database component to the API.

Good luck and have fun :)