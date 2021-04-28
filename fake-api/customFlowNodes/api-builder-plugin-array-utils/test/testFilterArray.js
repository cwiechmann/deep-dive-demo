const { expect } = require('chai');
const { MockRuntime } = require('@axway/api-builder-test-utils');
const getPlugin = require('../src');
const fs = require('fs');

describe('flow-node array-utils', () => {
	let plugin;
	let flowNode;
	beforeEach(async () => {
		plugin = await MockRuntime.loadPlugin(getPlugin);
		plugin.setOptions({ validateOutputs: true });
		flowNode = plugin.getFlowNode('array-utils');
	});

	describe('#constructor', () => {
		it('should define flow-nodes', () => {
			expect(plugin).to.be.a('object');
			expect(plugin.getFlowNodeIds()).to.deep.equal([
				'array-utils'
			]);
			expect(flowNode).to.be.a('object');
		});
		it('should define valid flow-nodes', () => {
			plugin.validate();
		});
	});

	describe('#filterArray', () => {
		it('should error when inputArray parameter is missing', async () => {
			const { value, output } = await flowNode.filterArray({
				inputArray: null
			});

			expect(value).to.be.instanceOf(Error)
				.and.to.have.property('message', 'Missing required parameter: inputArray');
			expect(output).to.equal('error');
		});

		it('should error when propertyName parameter is missing', async () => {
			const { value, output } = await flowNode.filterArray({
				inputArray: [], propertyName: null
			});

			expect(value).to.be.instanceOf(Error)
				.and.to.have.property('message', 'Missing required parameter: propertyName');
			expect(output).to.equal('error');
		});

		it('should succeed with a valid array and filter parameters', async () => {
			var postsToTest = JSON.parse(fs.readFileSync('./test/resources/Posts.json'), null);
			const { value, output } = await flowNode.filterArray({ inputArray: postsToTest, propertyName: "userId", propertyValue: "8"  });

			expect(value).to.be.a('array');
			expect(value).to.have.lengthOf(9); // Expected 9 post for user with ID: 8, as one is missing the userId property
			expect(value[0].title).to.equal('et iusto veniam et illum aut fuga');
			expect(output).to.equal('next');
		});
	});
});
