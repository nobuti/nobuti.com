---
title: Testing requests with miragejs
date: 2021-09-29
language: en
---

Think about everything that involves making requests: loading states, error handling, cache, latency ... and a thousand other things that asynchronous requests add to user flows in our applications.

We do ourselves no favors writing tests by ignoring the complexity that the network adds. Normally we mock up the request responses, adding hacks and obtuse code to solve asynchronous processes. We are punching holes in reality. And the code that ignores reality is not ready for production.

The ideal would be to be able to test this type of integration in conditions as close to the real world as possible. And just that is what [MirageJS][] does. Basically, it allows us to develop with the same conditions that we would have if we were developing against a server but facilitating the simulation of states. And most importantly, without ignoring the network.

### How does it work?

Mirage.js utilizes the Prerender library to hook into the native XMLHttpRequest and fetch function. So with each call to any of them (an HTTP request), Mirage.js intercepts it without making an actual HTTP request to a server.With Mirage.js, we can set the routes we want to mock, and also the response to return and the HTTP methods to mock.

### Mocking

To start mocking HTTP APIs, we need to import the createServer function from Mirage.js.

```
  import { createServer } from "miragejs"
```

Then, we call the `createServer` function. That’s it. Mirage will start intercepting HTTP request in our app, but since we have not specified the routes to mock, Mirage.js will let the HTTP request and will only log:

```
  Mirage: Your app tried to HTTP_METHOD_HERE 'YOUR_API_HERE', but there was no route defined to handle this request.
```

### Routes

We will use the `routes()` hook to set the API routes we want to mock. All we have to do is set a function in the `createServer` function:

```
createServer({
  routes() {
    ...
  }
})
```

And now we can set our routes in it. Mirage supports a wide range of HTTP methods for mocking:

```
this.get('/api/wadus', (schema, request) => {...});
this.get('/api/wadus:id', (schema, request) => {...});
this.post('/api/wadus', (schema, request) => {...});
this.patch('/api/wadus/:id', (schema, request) => {...});
this.put('/api/wadus/:id', (schema, request) => {...});
this.del('/api/wadus/:id', (schema, request) => {...});
this.options('/api/wadus/:id', (schema, request) => {...});
```

The `schema` argument is the primary way you interact with Mirage's data layer. `schema.db` gives us access to the Mirage.js in-memory database so we can manipulate the database. The `request` argument holds properties based on the request sent. For instance, `request.requestBody` holds the body of a request. Also `request.params` holds the parameters in a dynamic endpoint URL. In the example we can get the `:id` param using `request.params.id`.

### Seeds

MirageJS supoorts seeds to pre-populate the database with initial data. To make use of this feature, we will use the `seeds()` hook in the `createServer` function:

```
createServer({
  ...
  seeds(server) {
    server.create("todos", "Publish a post")
    server.create("todos", "Take a shower")
  }
  ...
})
```

Now, we can use `schema.db.todos` to get the data in a route handler function:

```
createServer({
  ...
  routes() {
    this.get("/api/todos", (schema) => {
      return schema.db.todos
    })
  }
})
```

### Fixtures

We can go a step further and build fixtures to populate the initial data. We can use it together with `faker` to build random data easily. To do this, we should define the "entity" the data model belongs to. Then, using the `Factory` factory function, we create the blueprint for this kind of data. Finally, in the `seeds()` hook, we create the data:

```
import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';

createServer({
  ...
  models: {
    todos: Model
  },
  factories: {
    todos: Factory.extend({
      name() {
        return faker.lorem.words(4)
      },
      done() {
        return faker.random.boolean()
      }
    }
  },
  seeds(server) {
    server.createList('todos', 20);
  },
  routes() {
    this.get("/api/todos", (schema) => {
      return schema.db.todos
    })
  }
})
```

### Managing HTTP errors

One important part of our job is to make our applications resilient to errors. With MirageJS we can simulate easily network errors, forcing a proper response for convenience matching our needs:

```
import { createServer, Response } from 'miragejs';

...
if (request.requestHeaders['x-csrf-token'] === 'undefined') {
  return new Response(
    422,
    { 'Content-Type': 'application/json' },
    { errors: [{ message: 'Unforbidden resource' }] }
  );
}
...

```

Let's see a real example. In some of our projects we have an abstraction to manage HTTP requests, redirecting the user to auth service if the session expired. The piece of code is something like this:

```
import { serialize } from 'object-to-formdata';
import location from 'Services/location';

// HTTP ERROR CODES
const UNAUTHORIZED_STATUS_CODE = 401;
const UNPROCESSABLE_ENTITY = 422;

const redirect = (response) => {
  if (response.callbackUrl) {
    location.replace(response.callbackUrl);
  } else {
    location.replace('/');
  }
};

const buildBody = (data) => serialize(data, { indices: true });

const serializeQuery = (params, prefix) => {
  const query = Object.keys(params).map((key) => {
    const value = params[key];
    if (value == null) {
      return '';
    }

    let q;
    if (Array.isArray(params)) {
      q = `${prefix}[]`;
    } else if (params.constructor === Object) {
      q = prefix ? `${prefix}[${key}]` : key;
    }

    if (typeof value === 'object') {
      return serializeQuery(value, q);
    }

    return `${q}=${encodeURIComponent(value)}`;
  });

  return [...query].join('&');
};

const buildParams = (params) => {
  let queryString = '';
  if (params != null) {
    queryString = serializeQuery(params);
    queryString = queryString && `?${queryString}`;
  }

  return queryString;
};

const processError = async (response) => {
  let message;
  let callback;
  const error = new Error();
  message = `Error ${response.status}: ${response.statusText}`;
  error.message = message;

  switch (response.status) {
    case UNAUTHORIZED_STATUS_CODE:
      callback = await response.json();
      redirect(callback);
      throw error;
    case UNPROCESSABLE_ENTITY: {
      message = await response.json();
      error.message = message.errors;
      throw error;
    }
    default: {
      throw error;
    }
  }
};

const handleResponse = (response) => {
  if (response.ok) {
    return response;
  }

  return processError(response);
};

const processResponse = async (response) => response.json();

const request = (url, options) => {
  const { headers, body, params, method } = options;
  const endpoint = `${url}${buildParams(params)}`;

  let opts = {
    method,
    headers
  };

  if (body != null) {
    opts = {
      ...opts,
      body: buildBody(body)
    };
  }

  return fetch(endpoint, opts).then(handleResponse).then(processResponse);
};

const buildRequest = (method) => (url, options = {}, token) => {
  let headers = {
    ...options.headers
  };

  if (token != null) {
    headers = {
      ...headers,
      'X-CSRF-Token': token
    };
  }

  return request(url, {
    ...options,
    headers,
    method
  });
};

export default {
  get: buildRequest('GET'),
  post: buildRequest('POST'),
  put: buildRequest('PUT'),
  patch: buildRequest('PATCH'),
  delete: buildRequest('DELETE')
};
```

There are some scenarios we would want to test here, from request management to handling parameters, responses or errors. This is the ideal scenario to enter MirageJS. Usually, we will use MirageJS in our integration tests, but also in unit tests in components interacting with the network, for instance, redux actions.

Our test suit for this service would be like this:

```
import { createServer, Response } from 'miragejs';
import FormDataParser from 'form-data-to-object';

import location from 'Services/location';
import ApiClient from 'Services/apiClient';

jest.mock('Services/location', () => ({
  replace: jest.fn()
}));

describe('ApiClient', () => {
  let server;

  const defaultResponse = {
    users: [
      { id: 1, username: 'Wadus' },
      { id: 3, username: 'Jane Wallaby' },
      { id: 2, username: 'John Doe' }
    ]
  };

  beforeEach(() => {
    server = createServer({
      routes() {
        this.namespace = 'api';

        const createUpdateHandler = (schema, request) => {
          const attrs = request.requestBody
            ? FormDataParser.toObj(Object.fromEntries(request.requestBody))
            : {};
          const id = request.params.id || 4;
          if (request.requestHeaders['x-csrf-token'] == null) {
            return new Response(401, { 'Content-Type': 'application/json' }, {});
          }

          return {
            ...attrs,
            id: +id
          };
        };

        const showHandler = (schema, request) => {
          const { sort } = request.queryParams;
          if (sort != null) {
            return defaultResponse.users.sort((a, b) =>
              sort === 'asc' ? a.id - b.id : b.id - a.id
            );
          }

          return defaultResponse.users;
        };

        this.get('/users', showHandler);
        this.post('/users', createUpdateHandler);
        this.put('/users/:id', createUpdateHandler);
        this.patch('/users/:id', createUpdateHandler);
        this.delete('/users/:id', createUpdateHandler);
      }
    });
    server.logging = false;
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.get('/api/users');
      expect(response).toEqual(defaultResponse.users);
    });

    it('should handle query params properly', async () => {
      let first;
      let response = await ApiClient.get('/api/users', {
        params: {
          sort: 'asc'
        }
      });

      [first] = response;
      expect(first.id).toEqual(1);

      response = await ApiClient.get('/api/users', {
        params: {
          sort: 'desc'
        }
      });

      [first] = response;
      expect(first.id).toEqual(3);
    });
  });

  describe('post', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.post(
        '/api/users',
        {
          body: {
            username: 'Supply admin'
          }
        },
        'wadus'
      );
      expect(response).toEqual({ id: 4, username: 'Supply admin' });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.post('/api/users', {
          body: {
            username: 'Supply admin'
          }
        });
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('put', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.put(
        '/api/users/1',
        {
          body: {
            username: 'Supply admin'
          }
        },
        'wadus'
      );
      expect(response).toEqual({ id: 1, username: 'Supply admin' });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.put('/api/users/1', {
          body: {
            username: 'Supply admin'
          }
        });
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('patch', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.patch(
        '/api/users/1',
        {
          body: {
            username: 'Supply admin'
          }
        },
        'wadus'
      );
      expect(response).toEqual({ id: 1, username: 'Supply admin' });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.patch('/api/users/1', {
          body: {
            username: 'Supply admin'
          }
        });
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('delete', () => {
    it('should handle response properly', async () => {
      const response = await ApiClient.delete('/api/users/1', {}, 'wadus');
      expect(response).toEqual({ id: 1 });
    });

    it('should raises if token is missing', async () => {
      try {
        await ApiClient.patch('/api/users/1', {});
      } catch (e) {
        expect(e.message).toMatch(/401/);
      }
    });
  });

  describe('errors', () => {
    it('should handle errors properly', async () => {
      server.get('/users', () => new Response(404, { 'Content-Type': 'application/json' }, {}));

      try {
        await ApiClient.get('/api/users');
      } catch (e) {
        expect(e.message).toBeDefined();
        expect(e.message).toEqual('Error 404: Not Found');
      }
    });

    it('should handle 422 properly', async () => {
      server.get(
        '/users',
        () =>
          new Response(
            422,
            { 'Content-Type': 'application/json' },
            { errors: ['Unprocessable entity', 'Wadus wadus error'] }
          )
      );

      try {
        await ApiClient.get('/api/users');
      } catch (e) {
        expect(e.message).toBeDefined();
        expect(e.message).toEqual(['Unprocessable entity', 'Wadus wadus error']);
      }
    });

    describe('401 error', () => {
      it('should redirect to callback url', async () => {
        server.get(
          '/users',
          () =>
            new Response(
              401,
              { 'Content-Type': 'application/json' },
              { callbackUrl: '/unauthorized' }
            )
        );

        try {
          await ApiClient.get('/api/users');
        } catch (e) {
          expect(location.replace).toHaveBeenCalledWith('/unauthorized');
        }
      });

      it('should redirect to root url', async () => {
        server.get('/users', () => new Response(401, { 'Content-Type': 'application/json' }, {}));

        try {
          await ApiClient.get('/api/users');
        } catch (e) {
          expect(location.replace).toHaveBeenCalledWith('/');
        }
      });
    });
  });
});
```

There are some interesting details here that worths to mention.

We use `form-data-to-object` to parse the response body easily.

On the other hand, MirageJS is too verbose, logging too much information for every request. It's nice when you have to debug a single tests but it becomes unmanagable when running a lot of tests. For this, we would usually want to:

```
server.logging = false;
```

It's a good practice to create the server in the `beforeEach` jest hook to avoid multiple instances running. Then we shut it down in the `afterEach` hook:

```
let server

beforeEach(() => {
  server = createServer({
    ...
  })
})

afterEach(() => {
  server.shutdown();
});
```

Another important thing to mention is we can overwrite single routes in our test. This is very helpful when testing edge cases or errors:

```
it('should handle errors properly', async () => {
  server.get('/users', () => new Response(404, { 'Content-Type': 'application/json' }, {}));

  try {
    await ApiClient.get('/api/users');
  } catch (e) {
    expect(e.message).toBeDefined();
    expect(e.message).toEqual('Error 404: Not Found');
  }
});
```

As you see, using MirageJS in our test has tremendous benefits to add confidence in our code. One additional side effect of this is that these solutions allow us to decouple the frontend development from the backend. Sometimes we need to wait until the backend is ready to start developing the frontend. Introducing MirageJS in our workflow allows us to work on a feature making the frontend independent.

And that's all, happy testing!


[MirageJS]: https://miragejs.com/
