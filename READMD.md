# Gmail Slack Notifier

Apps Script to notify received Gmail to Slack channel

## Requirements

- clasp

## Deploy

### Create new Slack app

1. Create new app
1. Install the app to your workspace
1. Allow the app to access `files:write` as Bot Token Scopes
1. Invite the app to your channel
1. Get Bot User OAuth Token

In each steps, for details, see Slack official docs.

### Create new Apps Script project

1. Create new project
   ```
   $ clasp create --type standalone
   $ clasp push
   ```
1. Allow this project to access your Gmail and to connect to external services if authorization prompt appears
1. In script property, set the Bot User Token as `TOKEN` and Slack channel as `CHANNEL`
   Currently (2021-03-23), to edit script property you have to switch to old Apps Script IDE
1. Set trigger to invoke `myFunction` every 5 minutes

## Why not use `Email` app?

[Email](https://slack.com/apps/A0F81496D-email) \
[Email app for Slack](https://slack.com/help/articles/360052463294-Email-app-for-Slack)

With this Slack official Email app, you can notify your received Gmail to Slack channel.
It is the best way.
It is a great Slack app but unavailable for Free plan.