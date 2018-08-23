// @flow

import {type StoreEnhancer} from 'redux';

export type ThunkEnhancerServiceType = {
  createStore: StoreEnhancer<*, *, *>,
};
