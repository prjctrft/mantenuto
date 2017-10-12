import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Listen from './Listen';

describe('<Listen />', () => {
	let component;

	beforeEach(() => {
		component = mount(<Listen />);
	})

	it('should render <Preferences /> by default', () => {
		expect(component.find('Preferences').exists()).to.be.true;
	});

	it('this.state.connecting should be set to false', () => {
		expect(component.state('connecting')).to.equal(false);
	});

	it('call handleAnytime', () => {
		component.instance().handleAnytime();
		component.update();
		expect(component.find('Connecting').exists()).to.be.true;
		expect(component.find('Preferences').exists()).to.be.false;
	});

	it('call handleNow', () => {
		component.instance().handleNow();
		component.update();
		expect(component.find('Connecting').exists()).to.be.true;
		expect(component.find('Preferences').exists()).to.be.false;
	});
});
