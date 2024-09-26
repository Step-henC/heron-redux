import {store, persistor} from './store';
jest.mock('./redux/quantformSlice', () => ({}))

describe('store', () => {
it('should be defined', () => {
expect(store).toBeDefined();
expect(persistor).toBeDefined();
})})