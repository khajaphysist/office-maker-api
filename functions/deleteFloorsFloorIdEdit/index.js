'use strict';

console.log('Loading function');

const commonModule = require('../../common');

exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  var user = event.requestContext.authorizer;

  var id = event.pathParameters.floorId;

  const db = commonModule.db(event);
  db.deleteFloorWithObjects(user.tenantId, id).then((data) => {
    commonModule.lambdaUtil(event).send(callback, 200, data);
  }).catch((err) => {
    commonModule.lambdaUtil(event).send(callback, 500, err);
  });
};
