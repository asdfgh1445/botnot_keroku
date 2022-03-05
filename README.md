# BotNot App

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/Shopify/shopify-app-node.svg?branch=master)](https://travis-ci.com/Shopify/shopify-app-node)

Boilerplate to create an embedded Shopify app made with Node, [Next.js](https://nextjs.org/), [Shopify-koa-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth), [Polaris](https://github.com/Shopify/polaris-react), and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components).

## Installation

Install Shopify CLI on macOS or Windows. For other platforms and package managers, refer to Install [Shopify CLI](https://github.com/Shopify/shopify-app-cli).

run:

macOS installation with Homebrew

```sh
$ brew tap shopify/shopify
$ brew install shopify-cli
```

Windows installation with RubyGems

```sh
$ gem install shopify-cli
```

Or, fork and clone repo

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- In the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

## Usage

This repository is used by [Shopify-App-CLI](https://github.com/Shopify/shopify-app-cli) as a scaffold for Node apps. You can clone or fork it yourself, but it’s faster and easier to use Shopify App CLI, which handles additional routine development tasks for you.

## License

This respository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## App configuration

Create a custom app in the Shopify Partners dashboard. Go to the App Setup section. Enter app name and contact email. In the App URL field enter the URL when your app is served, for example https://app.botnot.io/.  
In the Allowed redirection URL(s) field enter the URL of the app callback in the following format.

    https://<app-domain>/auth/callback

for example

    https://app.botnot.io/auth/callback

### Go to the Extensions section and create the links for orders:

Values for the links:

    Link label = Approve Order
    Link target URL = http://app.botnot.com/transaction/approve
    Page to show link = Order details


    Link label = Block Order
    Link target URL = http://app.botnot.com/transaction/mark_as_fraud
    Page to show link = Order details


    Link label = View Transaction Details
    Link target URL =http://app.botnot.com/transaction
    Page to show link = Order details

### Install a custom app:

Go to the app in the Shopify Partners dashboard and generate an installation link in the “Merchant install link” section:
Send the link to the merchant to install the app on the merchant store.

### Install a public app:

Send a link to the merchant in the following format

    https://<app-domain>/auth?shop=<store-url>

for example

    https://dev.botnot.io/auth?shop=bot-not-app.myshopify.com.

To make it work the app should be verified by shopify.

## Run the app locally:

Install Shopify CLI on the local environment Shopify CLI for apps. Go to the app root folder and run shopify app serve command. It will run the app locally and create an ngrok tunnel to the local version of the app.

### Authenticate

Run shopify login in a terminal to log into your Partner account.

In a terminal, type

```sh
$ shopify login.
```

In your browser window, log into your Partner account.

### Start a local development server

After your app is created, start a local development server.

When you start the server, Shopify CLI uses [ngrok](https://ngrok.com/) to create a secure tunnel. ngrok gives your app a unique URL. You need to authenticate with ngrok before starting the server.

To start a local development server, run the following commands:

1 . Authenticate with ngrok:

```sh
$ shopify app tunnel auth <token>
```

2 . Start the server:

```sh
$ shopify app serve
```

### Install your app on your development store

With the server running, open a new terminal window and run the following command to open your app in your browser and install it on a development store.

Run the following command:

```sh
 $ shopify populate
```

This command asks you to confirm that you want to populate resources for the store that you're logged into.

### Deploy your app

Using the Shopify CLI, you can deploy your app to an external platform. Currently, the only available platform is [Heroku](https://heroku.com). To deploy your app, run the following command. Be sure to specify the project type in the command.

To deploy your app, run the following command:

```sh
$ shopify app deploy
```
