import { AppRoutingModule } from './app-routing.module';

describe('App Routing', () => {

  it ('should be instanciate', () => {
    const routingModule = new AppRoutingModule();
    expect(routingModule).toBeDefined();
  })

});
