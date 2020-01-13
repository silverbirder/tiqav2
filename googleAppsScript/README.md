# Usage

This directory is for slack bot:[Slash Commands](https://api.slack.com/interactivity/slash-commands)

## Setup
```bash:
# 1. Login
$ npm run login
# 2. Enabled Google Apps Script API.
# https://script.google.com/home/usersettings => Off to On
```

## Deploy
```bash
$ npm install
$ npm run push
$ npm run deploy
# return the DEPLOY ID
# -> https://script.google.com/macros/s/{DEPLOY ID}/exec
# -> this URL is Slask Bot Request URL.
```