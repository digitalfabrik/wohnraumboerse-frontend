import React from 'react'
import { shallow } from 'enzyme/build/index'
import RouterFragment from '../RouterFragment'
import RouteConfig from '../../RouteConfig'
import Route from '../../Route'

describe('RouterFragment', () => {
  it('should render', () => {
    shallow(<RouterFragment routeConfig={new RouteConfig()} scrollHeight={0} />)
  })

  it('should match routes and use route config', () => {
    const id = 0xBABE
    const route = new Route({ id, path: '/' })
    const tree = shallow(<RouterFragment routeConfig={new RouteConfig([route])} scrollHeight={0} />)

    expect(tree.instance().matchRoute(id)).toBe(route)
  })
})
