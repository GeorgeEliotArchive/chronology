## Documentation for AWS Setup - 10/13/22

#### Tutorials (in order of completion)
1. [Setup Your AWS Environment](https://aws.amazon.com/getting-started/guides/setup-environment/)
2. [Getting Started with AWS CDK](https://aws.amazon.com/getting-started/guides/setup-cdk/?intClick=gsdir)
3. [Getting Started with Elastic Beanstalk](https://aws.amazon.com/getting-started/guides/deploy-webapp-elb/?intClick=gsdir)

#### FAQ
- ```this``` is throwing a compilation error. How do I fix this?

  This is due to a discrepancy between the version of aws libraries are using. What the tutorial doesn't tell you is that they are using notation derived from v1. What you need is to used the notation from v2. Below is an example of v2 importing.
  
  ```import s3assets = require('aws-cdk-lib/aws-s3-assets'); ```
