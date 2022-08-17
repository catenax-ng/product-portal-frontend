import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import { fetch } from 'features/apps/details/actions'
import { itemSelector } from 'features/apps/details/slice'
import './AppDetailProvider.scss'

export default function AppDetailProvider() {
  const { t } = useTranslation('', {
    keyPrefix: 'content.appdetail.providerInformation',
  })

  const { appId } = useParams()

  const item = useSelector(itemSelector)
  console.log('item', item)

  useEffect(() => {
    fetch(appId!)
  }, [appId])

  const tableData: TableType = {
    head: [t('appProvider'), t('website'), t('email'), t('phone')],
    body: [
      [item.providerUri ?? 'ERROR'],
      [item.provider],
      [item.contactEmail],
      [item.contactNumber],
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
