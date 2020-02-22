
---
layout: post
title:  "gitlab ci configuring w/ netlify "
date:   2020
categories: gitlab ci-cd
---


when deploying using gitlab ci you have tasks defined in stages.

Make sure to use container that hopefully already has all tools you need.

each script step starts at root of repo.

so you have to cd on each step back into same directory.. unless theres a better way?

```yaml
#.gitlab-ci.yml
stages:
  - deploy_step

deploy_step:
  image: node:latest

  stage: deploy
  environment:
    THE_VAL: green
  only:
    - master
  script:
    - npm -v
    - cd template-master && npm i
    # your build command
    - cd template-master && npm run build
    - echo "hi"
    - echo `pwd` 
    - npm install netlify-cli -g
    - cd template-master && netlify deploy --dir public --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --prod
```
