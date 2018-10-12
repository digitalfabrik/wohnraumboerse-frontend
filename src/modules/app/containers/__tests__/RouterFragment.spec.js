import React from 'react'
import { mount, shallow } from 'enzyme'
import ConnectedRouterFragment, { RouterFragment } from '../RouterFragment'
import RouteConfig from '../../RouteConfig'
import Route from '../../Route'
import configureMockStore from 'redux-mock-store'
import EndpointBuilder from '../../../endpoint/EndpointBuilder'
import CityConfig from '../../../city-detection/CityConfig'
import EndpointProvider from '../../../endpoint/EndpointProvider'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Payload from '../../../endpoint/Payload'

const cityConfigs = [new CityConfig({
  'cmsName': 'neuburgschrobenhausenwohnraum',
  'hostName': 'raumfrei.neuburg-schrobenhausen.de',
  'formsEnabled': true,
  'title': 'Raumfrei Neuburg-Schrobenhausen',
  'logo': 'http://127.0.0.1:8080/v0/city-configs/image/neuburg_logo.svg',
  'favicon': 'http://127.0.0.1:8080/v0/city-configs/image/neuburg_favicon.ico'
}), new CityConfig({
  'cmsName': 'testumgebungwohnraum',
  'hostName': 'test.wohnen.integreat-app.de',
  'formsEnabled': true,
  'title': 'Testumgebung',
  'logo': '',
  'favicon': ''
}), new CityConfig({
  'cmsName': 'bayreuthwohnraum',
  'hostName': 'wohnraumboerse.bayreuth.de',
  'formsEnabled': false,
  'title': 'Bayreuth',
  'logo': 'http://127.0.0.1:8080/v0/city-configs/image/bayreuth_logo.png',
  'favicon': 'http://127.0.0.1:8080/v0/city-configs/image/bayreuth_favicon.ico'
})
]

const cityConfigsEndpoint = new EndpointBuilder('cityConfigs')
  .withStateToUrlMapper(state => 'https://someendpoint/a/b/api.json')
  .withMapper(json => json)
  .withResponseOverride(cityConfigs)
  .build()

describe('RouterFragment', () => {
  it('should render', () => {
    shallow(
      <RouterFragment cityConfigs={cityConfigs} routeConfig={new RouteConfig()}
                      scrollHeight={0} />)
  })

  it('should match routes and use route config', () => {
    const id = 0xBABE
    const route = new Route({id, path: '/'})
    const tree = shallow(
      <RouterFragment cityConfigs={cityConfigs} routeConfig={new RouteConfig([route])} scrollHeight={0} />)

    const reactComponent = tree.instance()
    expect(reactComponent.matchRoute(id)).toBe(route)
  })

  it('should dispatch fetch actions', () => {
    const mockStore = configureMockStore([thunk])

    const routeConfig = new RouteConfig()
    const scrollHeight = 0

    const store = mockStore({
      cityConfigs: new Payload(false)
    })

    mount(<Provider store={store}>
      <EndpointProvider endpoints={[cityConfigsEndpoint]}>
        <ConnectedRouterFragment
          routeConfig={routeConfig}
          scrollHeight={scrollHeight} />
      </EndpointProvider>
    </Provider>)

    expect(store.getActions()).toHaveLength(2)
    expect(store.getActions()).toContainEqual({
      payload: new Payload(false, cityConfigs, null, 'https://someendpoint/a/b/api.json', expect.any(Number)),
      type: 'FINISH_FETCH_DATA_CITYCONFIGS'
    })
  })
})
