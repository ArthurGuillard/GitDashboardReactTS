# GitDashboardReact
This small application requests a list of GitHub Repositories by username.<br>
Requests are made via GitHub public API (https://developer.github.com/v3/)<br>
It displays the list of repositories and save an history of searches in the local storage.<br><br>

## Purpose
The purpose of the project is to understand and test different React concepts such as:
* Hooks
    * useRef
    * useSelector
    * useContext
    * useState
    * etc...
* Redux
* Reducers
* Contexts

Another purpose was to try out different libraries:
* Form validation: Final form (https://github.com/final-form/react-final-form)
* momentJS (https://momentjs.com/)
* Material UI (https://material-ui.com/)
* Typescript

## About principal components
* ***GHRResearcher*** component: does request to GitHub and save a single request result into redux store. It also updates the SearchHistoryContext used to handle the search History.
* ***GHRDataDisplayer*** component: get a single user data from the redux store and displays information about each repositories(name, description, url, etc...).
* ***GHRSearchHistory*** component: Gets search history data from the SearchHistoryContext and displays it as a list.

## External libraries
```
npm install -g typescript
npm install @material-ui/core
npm install @material-ui/icons
npm install redux react-redux
npm install @type/react-redux
npm install final-form react-final-form
npm install moment react-moment
```
