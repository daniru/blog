import { environment as PROD_environment} from './environment.prod';
import { environment as DEV_environment } from './environment';

describe ('Environment Files', () => {

  it('Prod enviroment file contains production flag true', () => {
    expect(PROD_environment.production).toBeDefined();
    expect(PROD_environment.production).toBeTruthy();
  });

  it('Dev enviroment file contains production flag true', () => {
    expect(DEV_environment.production).toBeDefined();
    expect(DEV_environment.production).toBeFalsy();
  });

});
