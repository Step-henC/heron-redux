import {store, persistor} from './store';

jest.mock('./redux/quantFormSlice', () => ({}))

describe('store', () => {
it('should be defined', () => {
expect(store).toBeDefined();
expect(persistor).toBeDefined();
})})