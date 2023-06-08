# IDW Test Applications

As part of our **self-service** initiative, you can now use these example apps to learn how to integrate with and implement our verification workflows and services.

What's here:

|**/api**| A collection of projects utilizing the AXN Verify API.|
|-|-|
||MobileMatch|
||KBA|
||BioGovID|
||MobileMatch to KBA|
||MobileMatch to BioGovID|

|/gateway| A scaffold project that supports running any workflow with AXN Gateway.|
|-|-|


## Getting Started

1. Clone this repository. Then, navigate to any of the projects listed above.

2. Run `npm install`

3. Open `./auth.js`

4. Insert your Access keys:

```js
const auth = {
  apikey: "your-workflow-apikey",
  secret: "your-workflow-secret",
  // ...
}
```

<a target="_blank" href="https://docs.iddataweb.com/docs/workflow-access-keys">Tip: Locating Your Access Keys<a>

4. Run `npm start`

## Documentation

To read more about how it all works:

<a target="_blank" href="https://docs.iddataweb.com/docs/verify-api-mobilematch">API: MobileMatch<a>

<a target="_blank" href="https://docs.iddataweb.com/docs/verify-api-gov-id-capture-verification-desktop-to-mobile">API: BioGovID<a>

<a target="_blank" href="https://docs.iddataweb.com/docs/verify-api-dynamic-kba">API: KBA<a>

<a target="_blank" href="https://docs.iddataweb.com/docs/api-integration-of-mobilematch-to-biogovid">API: MobileMatch to BioGovID<a>

<a target="_blank" href="https://docs.iddataweb.com/docs/api-integration-of-mobilematch-to-kba">API: MobileMatch to KBA<a>

<a target="_blank" href="https://docs.iddataweb.com/docs/overview">Gateway<a>
