import React from 'react'
import Footer from './Footer'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'

const cityConfig = getCurrentCityConfig()

class LivingFooter extends React.Component {
  static propTypes = {
  }

  render () {
    return <Footer><a href={cityConfig.impressumUrl} target='_blank'>Impressum</a></Footer>
  }
}

export default LivingFooter
