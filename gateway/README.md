# Gateway Example

## Getting Started

1. Clone this repository

2. Run `npm install`

3. Open `./auth.js`

4. Insert your Access keys:

```js
const auth = {
  apikey: "your-api-key",
  secret: "your-secret",
  // ...
}
```

<a target="_blank" href="https://docs.iddataweb.com/docs/workflow-access-keys">Tip: How To Find Your Access Keys<a>

4. Run `npm start`

## Using Gateway Prefill

Upon starting the app, you'll find that you have two options to run it:

1. Straight-forward Login.

  This option jump starts the workflow, and you'll be prompted to enter in information as you go along. 

2. Prefill your information.

This option highlights a feature of Gateway:

 You can prefill an individual's information (external) without them having to enter it in manually.

This can also be useful if the information is sensitive, and should not be allowed to modify.

For this use case, prefill functionality is demonstrated with a file (JSON) upload.

In production, your external data source can be anything. An employee database, a third-party identity provider (Google Account), and more.

To use this feature, you'll need special credentials to access the **AXN Admin** API.

To request new credentials, please reach out to your designated Solutions Architect.