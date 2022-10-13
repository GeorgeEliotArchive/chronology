## Documentation for AWS Setup - 10/13/22

#### Tutorials (in order of completion)
1. [Setup Your AWS Environment](https://aws.amazon.com/getting-started/guides/setup-environment/)
2. [Getting Started with AWS CDK](https://aws.amazon.com/getting-started/guides/setup-cdk/?intClick=gsdir)
3. [Getting Started with Elastic Beanstalk](https://aws.amazon.com/getting-started/guides/deploy-webapp-elb/?intClick=gsdir)

#### FAQ
- ```this``` is throwing a compilation error. How do I fix this?

  This is due to a discrepancy between the version of aws libraries are using. What the tutorial doesn't tell you is that they are using notation derived from v1. What you need is to used the notation from v2. Below is an example of v2 importing.
  
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
