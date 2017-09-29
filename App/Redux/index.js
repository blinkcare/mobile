import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    github: require('./GithubRedux').reducer,
    search: require('./SearchRedux').reducer,
    login: require('./LoginRedux').reducer,
    settings: require('./SettingsRedux').reducer,
    main: require('./MainRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
