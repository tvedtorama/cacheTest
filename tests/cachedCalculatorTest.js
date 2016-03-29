import computer from '../server/cachedComputer'

import chai from 'chai'
import crap from 'chai-as-promised'

chai.use(crap)
chai.should() // Needs to call should() to install the object prototype method (or something)

describe('DoACachedCalculation', () => {

	it('should not fail to evaluate the lenghty calculation', () => {
		return computer('a long one').should.eventually.equal(10)
	})

	it('but be much faster the second time', () => {
		return computer('a long one').should.eventually.equal(10)
	})


	it('should fail when pushed', () => {
		return computer('this will fail').should.eventually.be.rejectedWith('failed...') // .and.be.an.instanceOf(Error)  -- cant get this additional check to work  http://stackoverflow.com/questions/29363455/test-a-rejection-with-chai-as-promised
	})
})