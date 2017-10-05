import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Listen from './Listen';

describe('<Listen />', () => {
	const component = mount(<Listen />);
	const instance = component.instance();

	it('should not render <Connecting /> component by default', () => {
		expect(component.find('Connecting').exists()).to.be.false;
	});

	it('should render <Preferences /> by default', () => {
		expect(component.find('Preferences').exists()).to.be.true;
	});

	it('this.state.connecting should be set to false', () => {
		expect(component.state('connecting')).to.equal(false);
	});

	it('call handleAnytime', () => {
		instance.handleAnytime();
		expect(component.find('Connecting').exists()).to.be.true;
		expect(component.find('Preferences').exists()).to.be.false;

		component.setState({connecting: false});
	});

	it('call handleNow', () => {
		instance.handleNow();
		expect(component.find('Connecting').exists()).to.be.true;
		expect(component.find('Preferences').exists()).to.be.false;
	});
});
