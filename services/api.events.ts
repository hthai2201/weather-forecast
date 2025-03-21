import mitt from 'mitt';

type Events = {
  API_REQUEST: Response;
};
const ApiEvents = mitt<Events>();

export default ApiEvents;
