# redpesk Application Framework Javascript client over Websocket

This library allows you to call verbs and receive events from a web browser. To
avoid Cross-Origin Resource Sharing issues, an application using `afb-ws` must
be distributed on the same domain name than the binder it connects to.

## Sample project

An example project is available in the `sample` directory (see the Git
repository). Its code is well documented and can be used as a template.

To run it, you must have the `helloworld-binding` compiled somewhere on your
system, and put its path in `sample/package.json` (replace the two occurrences
of `/SOMEWHERE/ON/YOUR/COMPUTER/`). Then:

- `cd` in sample
- `npm install`
- `npm build`
- `npm start`
- go to `http://localhost:1234` in your browser; open the Javascript console and
see the magic happens 🪄

You can also use `npm debug` instead of `npm build` to create a source map; that
will allow you to use the original sources in the browser's debugger.

The sample project uses `vite` as the packer; it provides templates for Vue.js,
React, Svelte and many more. Additionally, it is used as the build tool of
bigger frameworks like Nuxt or SvelteKit.
