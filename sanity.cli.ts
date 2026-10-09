import {defineCliConfig} from 'sanity/cli'
import {PROJECT} from './project'

export default defineCliConfig({
  api: PROJECT,
  deployment: {
    appId: 's6z86eaytshhos6jqfsx7551',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
