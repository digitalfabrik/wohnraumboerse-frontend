// @flow

import DisclaimerModel from '../models/DisclaimerModel'
import { isEmpty } from 'lodash/lang'
import EndpointBuilder from '../EndpointBuilder'
import moment from 'moment'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'

const DISCLAIMER_ENDPOINT_NAME = 'disclaimer'

export default new EndpointBuilder(DISCLAIMER_ENDPOINT_NAME)
  .withStateToUrlMapper(state => {
    return `https://cms.integreat-app.de/${getCurrentCityConfig(state.cityConfigs._data).cmsName}` +
      `/de/wp-json/extensions/v3/disclaimer`
  })
  .withMapper((json: any) => {
    if (isEmpty(json)) {
      throw new Error('disclaimer:notAvailable')
    }

    return new DisclaimerModel({
      id: json.id,
      title: json.title,
      content: json.content,
      lastUpdate: moment(json.modified_gmt)
    })
  })
  .build()
