import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {

  WebApp.connectHandlers.use((req,res,next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if(link){
      res.statusCode = 302;
      res.setHeader('Location',link.url);
      res.end();
      Meteor.call('links.TrackVisit', _id)
    }else{
      next();
    }
  });
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('this is from custom middleware');
  //   console.log(req.url,req.meathod, req.headers, req.query);
  //
  //   next();
  // });


});