import chalk from 'chalk';
import clear from 'clear';
import { textSync } from 'figlet';
import prefs from './utils/prefs';
import jenkinsConnect from './utils/jenkinsConnect';
import _ from 'lodash';
import homeMenu, { actions } from './menus/homeMenu';
import docker from './actions/docker';

clear();

console.log(
  chalk.yellow(
    textSync('A2 Connect', { horizontalLayout: 'full' })
  )
);

let running = true;

var handleAction = (action) => {
  return new Promise(
    (resolve) => {
      switch (action) {
        case actions.DOCKER_INFO:
          docker.execute().then((data) => {
            resolve();
          });
          break;
        case actions.EXIT:
          running = false;
            resolve();
          break;
        default:
            resolve();
          break;
      }
    }
  )
}

var showHomeMenu = () => {
  homeMenu.getPrompt().then(handleAction).then(() => {
    if (running) showHomeMenu();
  });
}

showHomeMenu();

