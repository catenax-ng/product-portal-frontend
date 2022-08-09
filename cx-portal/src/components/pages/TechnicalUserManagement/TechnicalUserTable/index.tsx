import { IconButton, Table, Button } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { fetchPage } from 'features/admin/service/actions'
import { itemsSelector } from 'features/admin/service/slist'
import { ServiceAccount } from 'features/admin/service/types'
import uniqueId from 'lodash/uniqueId'

export const TechnicalUserTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const serviceAccounts = useSelector(itemsSelector)

  useEffect(() => {
    dispatch(fetchPage(0))
  }, [dispatch])

  const onUserDetailsClick = (userId: string, name: string) => {
    navigate('/usermanagement/technicaluser/userdetails/' + userId, {
      state: { name: name },
    })
  }

  return (
    <div style={{ paddingTop: '30px' }}>
      <Table
        title={t('content.usermanagement.technicalUser.tableHeader')}
        toolbar={{
          onSearch: () => {
            console.log('search function')
          },
        }}
        columns={[
          {
            field: 'name',
            headerName: t('global.field.userName'),
            flex: 2,
          },
          {
            field: 'clientId',
            headerName: t('global.field.clientId'),
            flex: 1,
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 1,
            renderCell: ({ row }: { row: ServiceAccount }) => (
              <IconButton
                color="secondary"
                onClick={() =>
                  onUserDetailsClick(row.serviceAccountId, row.name)
                }
              >
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
        rows={serviceAccounts}
        rowsCount={serviceAccounts.meta.totalElements}
        getRowId={(row: { [key: string]: string }) =>
          uniqueId(row.serviceAccountId)
        sx={{ marginTop: '80px' }}
        disableColumnMenu
        hideFooter
        />
        <div className="load-more-button-container">
          {serviceAccounts.meta.totalPages !== serviceAccounts.meta.page + 1 && (
            <Button
              size="medium"
              sx={{ mt: 15 }}
              onClick={() => setPageNumber((prevState) => prevState + 1)}
            >
              {t('content.invite.load_button')}
            </Button>
          )}
        </div>
  )
}
