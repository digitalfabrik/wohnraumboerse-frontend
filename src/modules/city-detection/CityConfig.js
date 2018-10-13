// @flow

class CityConfig {
  cmsName: string
  hostName: string
  formsEnabled: boolean
  title: string
  logo: string
  favicon: string

  constructor ({ cmsName, hostName, formsEnabled, title, logo, favicon }: {|
    cmsName: string, hostName: string, formsEnabled: boolean,
    title: string, logo: string, favicon: string
  |}) {
    this.cmsName = cmsName
    this.hostName = hostName
    this.formsEnabled = formsEnabled
    this.title = title
    this.logo = logo
    this.favicon = favicon
  }
}

export default CityConfig
