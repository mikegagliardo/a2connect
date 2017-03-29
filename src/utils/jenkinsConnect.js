import Jenkins from 'jenkins';
import _ from 'lodash';

const jenkinsConnect = {};

jenkinsConnect.getJob = (params) => {
  var connection = Jenkins({
    baseUrl: params.url,
    promisify: true
  });

  return connection.build.get(params.jobName, params.buildNumber);
}

export default jenkinsConnect;
