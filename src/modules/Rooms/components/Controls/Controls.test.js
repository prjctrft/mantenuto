import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import { Controls } from './Controls';

describe('<Controls />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = shallow(
      <Provider store={store}>
        <Controls />
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });
});
