import reducers from '../reducers'

describe('reducers', () => {
  it('should have all reducers we currently need', () => {
    // This helped to find possible typos in file names or endpoint names
    expect(reducers).toEqual({
      disclaimer: expect.any(Function),
      categories: expect.any(Function),
      cityConfigs: expect.any(Function)
    })
  })
})
