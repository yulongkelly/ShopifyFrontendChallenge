### How to run it

```
clone the repository
npm install
npm start
```

### The Challenge

We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:
* Search OMDB and display the results (movies only)
* Add a movie from the search results to our nomination list
* View the list of films already nominated
* Remove a nominee from the nomination list


### Features

1. Search results come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).
2. Each search result listd its title, year of release and a button to nominate that film.
3. Updates to the search terms also updates the result list
4. Movies in search results can be added and removed from the nomination list.
5. If a search result has already been nominated, its nominate button is disabled.
6. The user can add as many as nominations they want but it will display a banner at the top when the user has 5 or more than 5 nominations.
7. As long as the page didn't get refreashed, user can search for another movie while keeping the data for the nomination list
