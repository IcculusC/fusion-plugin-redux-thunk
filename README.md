# fusion-plugin-redux-thunk

Installs the [`redux-thunk`](https://github.com/reduxjs/redux-thunk) middleware for asynchronous dispatch.

This is just for convenience, you can see an alternative [here](#alternative).

---

### Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [Setup](#setup)
* [API](#api)
    * [Registration API](#registration-api)
* [Alternative](#alternative)

---

### Installation
```js
yarn add fusion-plugin-redux-thunk
```

### Usage

Dispatch a thunk!

```js
const imAThunk = () =>
    dispatch => {
        dispatch({ type: 'IM_A_THUNK' });
        setTimeout(() => dispatch({ type: 'HES_A_THUNK' }));
    };

store.dispatch(imAThunk());
```

### Setup

```js
// main.js
import React from 'react';
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  GetInitialStateToken,
} from 'fusion-plugin-react-redux';
import ThunkEnhancer, { ThunkEnhancerToken } from 'fusion-plugin-redux-thunk';
import App from 'fusion-react';
import { createPlugin } from 'fusion-core';
import { compose } from 'redux';
import reducer from './reducer';

export default () => {
  const app = new App(root);
  app.register(ReduxToken, Redux);
  app.register(ReducerToken, reducer);
  app.register(ThunkEnhancerToken, ThunkEnhancer);
  app.register(EnhancerToken, createPlugin({
    deps: { thunkEnhancer: ThunkEnhancerToken },
    provides: ({ thunkEnhancer }) => compose(thunkEnhancer),
  }));
  __NODE__ && app.register(GetInitialStateToken, async ctx => ({}));
}
```

### API

#### Registration API

##### `ThunkEnhancer`
```js
import ThunkEnhancer from 'fusion-plugin-redux-thunk';
```

The `redux-thunk` enhancer.  Installs redux middleware.  Typically registed to [`ThunkEnhancerToken`](#thunkenhancertoken)

##### `ThunkEnhancerToken`
```js
import { ThunkEnhancerToken } from 'fusion-plugin-redux-thunk';
```

Typically registered with [`ThunkEnhancer`](#thunkenhancer)

### Alternative

```js
// main.js
import React from 'react';
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  GetInitialStateToken,
} from 'fusion-plugin-react-redux';
import App from 'fusion-react';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default () => {
  const app = new App(root);
  app.register(ReduxToken, Redux);
  app.register(ReducerToken, reducer);
  app.register(EnhancerToken, applyMiddleware(thunk));
  __NODE__ && app.register(GetInitialStateToken, async ctx => ({}));
  return app;
}
```
