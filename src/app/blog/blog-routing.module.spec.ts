import { BlogRoutingModule } from './blog-routing.module';

describe('Blog Routing', () => {

  it ('should be instanciate', () => {
    const routingModule = new BlogRoutingModule();
    expect(routingModule).toBeDefined();
  })

});
