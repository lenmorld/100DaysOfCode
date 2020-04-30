# Part 1: Github webhooks

https://developer.github.com/webhooks/creating/

We have a Node-Express server that acts as a webhook client for Github webhooks send via POST request to the registered URL

- After registration of URL in Github repo, Github sends a webhook ping
- After pushing commit(s) to repo, Github sends a webhook with details on the commit

Details: https://www.notion.so/lennythedev/Webhooks-part-1-Github-362577ac78ec4ff8aae7be58c0a7940f

# Part 2: Minimal webhooks service in Node

## Server

Here we have a Node-Express server that:

- allows registration of client URLs
  - they get pinged via POST after registration
- sample event that sends a webhook to each URL
  - its just a _setInterval_ for demo purposes

## Client

- Needs to register its URL first to server on `/register`
  - In reality, this could be a registration form POST
  - Here, it's just a GET and hard-code yada yada for demo purposes
- Has a `/webhooks` route that logs webhook from server
