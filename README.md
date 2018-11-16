# Purpose

Test how we can customize Select2 to behave like Intuit's Searchable Dropdown.

See this story for details: https://logikcull.atlassian.net/browse/CREEP-1382

# Getting Started

* `npm install`
* `npm run start`
* Visit http://localhost:1234 to see the app running.

Use the following if you need to run the app on a specific port. You can pass any options to parcel using the syntax below.
`npm run start -- --port 3111`

This project uses [ParcelJS](https://parceljs.org/getting_started.html) to bundle and serve the application.

The entry point is the `index.html` and it pulls in the assets automatically for you.

# File Structure

- Index.js - This is the main app bundle
  - select.js - This is where we configure and render Select2 using the custom adapter below.
  - inputSelectionAdapter.js - This defines a new adapter to render the `Selection` component of Select2. This shows how you can modify what is rendered onto the page.
