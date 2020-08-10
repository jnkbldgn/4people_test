import Handlers from './handlers';

const eventSources = '/event';

export default function configureEventSources() {
  const eventSource = new EventSource(eventSources);
  Handlers.forEach((handler) => {
    eventSource.addEventListener(handler.eventType, (event) => {
      handler.handle(event);
    });
  });
}
