import chalk from 'chalk';
import clear from 'clear';
import { textSync } from 'figlet';
import prefs from './utils/prefs';

clear();

console.log(
  chalk.yellow(
    textSync('A2 Connect', { horizontalLayout: 'full' })
  )
);

prefs.setP('test', {hello: true});
console.log(prefs.getP('test'));
prefs.clearAll();