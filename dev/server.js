import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { name: 'Bob' });
      server.create('user', { name: 'Alice' });
    },

    routes() {
      this.namespace = '';

      this.get('/', (schema) => {
        return schema.users.all();
      });

      this.post('/users/sign_in', (schema) => {
        return new Response(200, {}, { error: 'The database is on vacation.' });
      });

      this.passthrough();
    },
  });

  return server;
}
