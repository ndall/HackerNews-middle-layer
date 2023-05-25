# Hacker News Interface

A 2-page interface for the [Hacker News](https://news.ycombinator.com/) website.

## Tooling

List of core Frameworks/Libraries/APIs used:

- Vue 3 (Composition API)
- Vue Router
- Pinia
- Quasar
- [Hacker News API](https://github.com/HackerNews/API)

## Features

Main page:

- The news list, each consisting of the title, link to the corresponding URL, relative time of publication, score, and number of comments
- Buttons and dropdown menus for switching the category of news to display, changing the size of the list, refreshing the list and setting an auto-refresh delay

Clicking on an item from the list will take you to the Story page, which contains:

- The story's title, score, author and publication date
- Buttons for navigating to the corresponding URL or back to the Main page
- Comments section with a refresh button and expand/collapse buttons for parent comments

## Demo

You can see the demo on [the website](https://de-oz.github.io/vue-hacker-news-interface/) published via Github Pages.
