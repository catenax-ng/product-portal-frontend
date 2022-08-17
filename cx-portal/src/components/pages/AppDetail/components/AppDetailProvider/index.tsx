import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import './AppDetailProvider.scss'

export default function AppDetailProvider() {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.providerInformation',
  })

  const { appId } = useParams()
  const { data } = useFetchAppDetailsQuery(appId ?? '')

  const tableData: TableType = {
    head: [t('appProvider'), t('website'), t('email'), t('phone')],
    body: [
      [(data && data.providerUri) ?? 'ERROR'],
      [(data && data.provider) ?? ''],
      [(data && data.contactEmail) ?? ''],
      [(data && data.contactNumber) ?? ''],
    ],
  }

  return (
    <div className="appdetail-provider">
      <div className="provider-content">
        <Typography variant="h4">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
      </div>
      <StaticTable data={tableData} horizontal={true} />
    </div>
  )
}
