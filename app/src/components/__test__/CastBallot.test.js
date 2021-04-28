import CastBallot from '../voting/CastBallot';
import renderer from 'react-test-renderer';




describe('CastBallot', ()=> {
    it('should render properly', ()=>{
       const tree = renderer.create(<CastBallot/>).toJSON();
       expect(tree).toMatchSnapshot();
    })
})
