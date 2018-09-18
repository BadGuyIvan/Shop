import moxios from 'moxios'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { GET_ALL_PRODUCT } from "../src/redux/actions/constants"
import { getAllProduct } from "../src/redux/actions";
import { FetchProducts } from "../__mock__/getAllProduct";

const mockStore = configureMockStore([thunk]);

describe('GET /products', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  test('Should dispatch GET_ALL_PRODUCT action and a product', async (done) => {
    moxios.stubRequest('/products', {
      status: 201,
      response: FetchProducts
    })

    const returnedAction = [{
      type: GET_ALL_PRODUCT,
      payload: FetchProducts
    }];

    const store = mockStore({}, null ,done)
    await store.dispatch(getAllProduct());

    expect(store.getActions()).toEqual(returnedAction)
    done();
  });
});
