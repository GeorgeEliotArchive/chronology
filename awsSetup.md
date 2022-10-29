## Documentation for AWS Setup - 10/29/22

#### Tutorials (in order of completion)
1. [Setup Your AWS Environment](https://aws.amazon.com/getting-started/guides/setup-environment/)
2. [Getting Started with AWS CDK](https://aws.amazon.com/getting-started/guides/setup-cdk/?intClick=gsdir)
3. [Getting Started with Elastic Beanstalk](https://aws.amazon.com/getting-started/guides/deploy-webapp-elb/?intClick=gsdir)

#### Additional Resources
The tutorials are unfortunately out of date with some of AWS' recent versions. Below is some documentation that displays current server resource capabilities.

- [Solution Stack Names](https://docs.aws.amazon.com/elasticbeanstalk/latest/platforms/platforms-supported.html): Shows platforms available for creating environments.


#### Notes

- During the process, I figured I could just take the main javascript file, rename it to app.js (and adjust accordingly) to produce the files AWS wanted. Recall that these files are "app.js", "index.html", your json packages, and a "server.js" (optional). app.js serves as a main function, crafting the parts of your application together while index.html builds together and styles the necessary parts of your presentation. To do this, you MUST create a new file called "app.js" and ensure that it is driving the execution similar to how it shows you in the tutorials above. I will insert some example code from when I was testing with calendarMap.

```javascript
var express = require('express'); //import for server library
var path = require('path'); //built in library for node to help with PATH
var app = express(); 
var fs = require('fs'); //filestream, also built in
var port = 8080; //as far as I'm aware, this number can be mostly anything

app.use(express.static(path.join(__dirname, "public"))); //in a folder "public", include all .js, .html, .css files

app.get('/', function(req, res) {
    html = fs.readFileSync('index.html') //read index page
    res.write(html); // create index page
    res.end(); //end response
});

app.listen(port, function() {
    console.log('Server running at http://127.0.0.1:%s', port); //just included this for heck of it
});
```

#### FAQ
- ```this``` is throwing a compilation error. How do I fix this?

  This is due to a discrepancy between the version of aws libraries are using. What the tutorial doesn't tell you is that they are using notation derived from v1. What you need is to use the notation from v2. Below is an example of v2 import notation.
  
  ```javascript 
  import s3assets = require('aws-cdk-lib/aws-s3-assets'); 
  ```
  The main library is aws-cdk-lib, which should be automatically added via the tutorials. From there, whenever the tutorial asks you to import via the method below
  
  ```javascript
  import s3assets = require('@aws-cdk/aws-s3-assets');
  ```
  use the first one instead.
  
- The [server had issues starting Node.js](https://stackoverflow.com/questions/20634122/failed-to-find-package-json-node-js-may-have-issues-starting-verify-package-js). How do I fix this?
  
  Earlier in the 3rd tutorial, they asked you to zip the app files together. If you're not using a Linux terminal, like bash, then the zip command doesn't work. Perhaps you zipped manually in that case. If you zipped the PARENT DIRECTORY, it will throw an error. You have to click into the directory the app is located and then ctrl+click all the files inside and zip those.

- Environment is degraded. How do I fix this?

  Unfortunately, the answer to this question isn't clear cut. You'll need to rely on the environment logs and your understanding (or Google/Stack Overflow) to slowly break down any issues. My best advice is to read the note I made regarding the files required above. It'll be a lot more straightfoward in debugging.
