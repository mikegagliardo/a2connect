import inquirer from 'inquirer';
import _ from 'lodash';

const homeMenu = {};

export const actions = {
  DOCKER_INFO: 'Docker Information',
  EXIT: 'Exit'
}

homeMenu.getPrompt = (callback) => {
  const choices = _.values(actions);

  return new Promise(
    (resolve) => {
      inquirer.prompt(
            [
              {
                type: 'list',
                name: 'action',
                message: 'Select an action to execute:',
                choices: choices
              }
            ]
          ).then((answers) => {
            resolve(answers.action);
          }
      );
    }
  );
}

export default homeMenu;