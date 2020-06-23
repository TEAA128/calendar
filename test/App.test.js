import App from '../client/src/components/App.jsx';


describe('<App /> rendering', () => {
  it('check if <App/> is a <div></div>', () => {
      let wrapper = shallow(<App />);
      expect(wrapper.type()).toEqual('div');
  });
});