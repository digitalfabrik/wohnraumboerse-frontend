import React from 'react'
import locationIcon from '../assets/location-icon.svg'
import Header from './Header'
import HeaderActionItem from '../HeaderActionItem'
import integreatLogo from '../assets/integreat-app-logo.png'

class GeneralHeader extends React.Component {
  render () {
    return <Header logo={integreatLogo} logoHref={'/'} actionItems={[new HeaderActionItem({href: '/', iconSrc: locationIcon})]} />
  }
}

export default GeneralHeader
