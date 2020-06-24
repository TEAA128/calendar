import App from '../client/src/components/App.jsx';
import Calendar from '../client/src/components/Calendar.jsx';
import Guests from '../client/src/components/Guests.jsx';

describe('<App /> rendering', () => {
  it('check if <App/> is a <div></div>', () => {
      let wrapper = shallow(<App />);
      expect(wrapper.type()).toEqual('div');
  });
});

describe('<Calendar /> rendering', () => {
  it('check if <Calendar/> is a <div></div>', () => {
      let wrapper = shallow(<Calendar />);
      expect(wrapper.type()).toEqual('div');
  });
});

describe('<Guests /> rendering', () => {
  it('check if <Guests/> is a <div></div>', () => {
      let wrapper = shallow(<Guests />);
      expect(wrapper.type()).toEqual('div');
  });
});