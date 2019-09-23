var Webmention = require('./lib/webmention');
var sendMention = require('./lib/send');
var  ms = require('ms');
var parse = require('url').parse;

exports.handler = function(event, context, callback) {
//console.log('deploy-succeeded');
  //console.log('event', event);
  //console.log('context', context);
  //console.log('branch', process.env.BRANCH);
  //console.log('url', process.env.URL);
  //console.log('site-context', process.env.CONTEXT);

  const url = "https://www.synesthesia.co.uk/index.xml"

  url = parse(url).href;

  const send = data => {
      res.end(data);
  };

  console.log('>> %s %s', method === 'post' ? 'SEND' : 'QUERY', url);

  const wm = new Webmention({ limit });
  wm.on('error', e => {
    send(JSON.stringify({ error: true, message: e.message }));
  });

  wm.on('endpoints', urls => {
   if (method === 'post') {
      return Promise.all(urls.map(sendMention)).then(reply => {
        if (reply.length)
          db.updateRequestCount(
            '__sent',
            reply.filter(_ => _.status < 400).length
          ).catch(E => console.log('error updating __sent count', E));
        timings.send = Date.now() - now.getTime();
        send(JSON.stringify({ urls: reply }));
      });
    }

    if (urls.length === 0 && wm.mentions.length > 0) {
      return send(
        JSON.stringify({
          error: true,
          message: `No webmention endpoints found in the ${
            wm.mentions.length
          } content ${wm.mentions.length === 1 ? 'entry' : 'entries'}`,
        })
      );
    }

    send(JSON.stringify({ urls }));
  });

  wm.fetch(url);

  callback(null, {
    statusCode: 200,
    body: "Hello, World"
    });

};
