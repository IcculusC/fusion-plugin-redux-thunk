// @flow
import {
  createPlugin,
  createToken,
  type FusionPlugin,
  type Token,
} from 'fusion-core';
import {compose, type StoreEnhancer} from 'redux';
import thunk from 'redux-thunk';
import {type ThunkEnhancerServiceType} from './types';

export const ThunkEnhancerToken: Token<StoreEnhancer<*, *, *>> = createToken(
  'ThunkEnhancerToken'
);

const plugin = createPlugin({
  provides(): StoreEnhancer<*, *, *> {
    return createStore => (...args) => {
      const store = createStore(...args);
      const {getState, dispatch} = store;
      const dispatch_ = compose(thunk({getState, dispatch}))(dispatch);

      return {
        ...store,
        dispatch: dispatch_,
      };
    };
  },
});
export default ((plugin: any): FusionPlugin<empty, ThunkEnhancerServiceType>);
