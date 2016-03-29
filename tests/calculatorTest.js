// import {expect, assert} from 'chai'
import chai from 'chai'
import crap from 'chai-as-promised'
import computer from '../server/computer'

chai.use(crap)
chai.should() // Needs to call should() to install the object prototype method (or something)

describe('DoACalculation', () => {

	it('will pass', () => {
		(10 + 12).should.equal(22)
	})

	it('should not fail to evaluate the lenghty calculation', () => {
		return computer('a long one').should.eventually.equal(10)
	})

	it('should fail when pushed', () => {
		return computer('this will fail').should.eventually.be.rejectedWith('failed...') // .and.be.an.instanceOf(Error)  -- cant get this additional check to work  http://stackoverflow.com/questions/29363455/test-a-rejection-with-chai-as-promised
	})
})