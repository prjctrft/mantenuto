import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import SpeakeasyForm, { SpeakeasyFormComponent } from './SpeakeasyForm';

describe('<SpeakeasyForm />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {/* <SpeakeasyForm handleSubmit={handleSubmit} /> */}
        <SpeakeasyForm />
      </Provider>
    );
  });

  it('should render self and a form', () => {
    expect(component.exists()).to.be.true;
    expect(component.find('form').exists()).to.be.true;
  });

  describe('"validateCode" method', () => {
    let component;
    let props;
    let method;
    beforeEach(() => {
      props = {codes: ['hello', 'yes']}
      component = shallow(<SpeakeasyFormComponent {...props} />);
      method = component.instance().validateCode;
    })

    it('should exist', () => {
      expect(method).to.be.a('function');
    });

    it('should return "undefined" if no arguments are passed', () => {
      expect(method()).to.be.equal(undefined);
    });

    it('should return "undefined" if a correct code is passed', () => {
      props.codes.forEach((code) => {
        expect(method(code)).to.be.equal(undefined);
      });
    });

    it('should return and error message if the wrong code is passed', () => {
      expect(method('on no!')).to.be.a('string');
    })
  })
})
