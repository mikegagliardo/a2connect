import cmd from 'node-run-cmd';
import inquirer from 'inquirer';
import async from 'async';
import CLI from 'clui';
import cliff from 'cliff';
import chalk from 'chalk';

var Spinner = CLI.Spinner;

const docker = {};

docker.getSchemaName = () => {
  var questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter the TestN schema name:',
      default: 'a2e2e',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'TestN schema name is required.';
        }
      }
    }
  ];

  console.log();
  return new Promise (
    (resolve) => {
      inquirer.prompt(questions).then((answers) => {
        resolve(answers.name);
      });
    }
  )
}

docker.getDockerId = (schemaName) => {
  var spinner = new Spinner('Obtaining docker information...');
  spinner.start();
  return new Promise(
    (resolve) => {
      cmd.run(`export DOCKER_HOST=tcp://bld-testn-01 && docker inspect --format='{{.Id}}' ${schemaName}_etl_1`, 
        {
          shell: true,
          onData: (data) => {
            spinner.stop();
            resolve(data);
          },
        });
    }
  )
}

docker.getConnectCmd = (dockerId) => {
  return new Promise(
    (resolve) => {
      return resolve(`docker exec -it ${dockerId.trim()} /bin/sh`);
    }
  )
}

docker.getUrls = (schemaName) => {
  var spinner = new Spinner('Obtaining docker information...');
  spinner.start();
  return new Promise(
    (resolve) => {
      cmd.run(`export DOCKER_HOST=tcp://bld-testn-01 && docker inspect --format='{{.NetworkSettings.Ports}} ' ${schemaName}_etl_1`, 
        {
          shell: true,
          onData: (data) => {
            spinner.stop();
            resolve(data);
          },
        });
    }
  )
}

docker.execute = () => {

  return new Promise(
    (resolve) => {
      docker.getSchemaName().then(docker.getDockerId).then(docker.getConnectCmd).then(
        (data) => {
          var rows = [['CMD:'.yellow, data]]
          console.log(cliff.stringifyRows(rows));
          console.log();
          resolve();
        }
      );  
    }
  );
}

export default docker;