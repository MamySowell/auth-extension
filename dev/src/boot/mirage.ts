import { createServer, Response } from 'miragejs';

// @ts-ignore
if (window.Cypress) {
  // If your app makes requests to domains other than / (the current domain), add them
  // here so that they are also proxied from your app to the handleFromCypress function.
  // For example: let otherDomains = ["https://my-backend.herokuapp.com/"]
  const methods = ['get', 'put', 'patch', 'post', 'delete'];

  const otherDomains: string[] = [];
  createServer({
    environment: 'test',
    routes() {
      for (const domain of ['/', ...otherDomains]) {
        for (const method of methods) {
          // @ts-ignore
          this[method](`${domain}*`, async (schema, request) => {
            // @ts-ignore
            const [status, headers, body] = await window.handleFromCypress(
              request
            );
            return new Response(status, headers, body);
          });
        }
      }

      // If your central server has any calls to passthrough(), you'll need to duplicate them here
      this.passthrough();
    },
  });
}
