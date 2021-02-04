import Autocomplete from './Autocomplete';
import './main.css';
import { StatesFinder } from './FindStrategies/StatesFinder';
import { GithubUsersFinder } from './FindStrategies/GithubUsersFinder';

const numOfResults = 10;

// US States
const statesFinder = new StatesFinder();
new Autocomplete(document.getElementById('state'), {
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
  getListItems: (query) => {
    return statesFinder.getResults(query, numOfResults);
  }
});



// Github Users
const githubUsersFinder = new GithubUsersFinder();
new Autocomplete(document.getElementById('gh-user'), {
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
  getListItems: (query) => {
    return githubUsersFinder.getResults(query, numOfResults);
  }
});
