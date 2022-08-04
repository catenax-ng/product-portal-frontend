import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { useEffect, useRef } from 'react'
import PageService from 'services/PageService'
import { useDispatch, useSelector } from 'react-redux'
import { subscribedSelector } from 'features/apps/marketplace/slice'
import { fetchSubscribed } from 'features/apps/marketplace/actions'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const items = useSelector(subscribedSelector)

  useEffect(() => {
    dispatch(fetchSubscribed())
  }, [dispatch])

  const reference = PageService.registerReference(label, useRef(null))

  return (
    <div ref={reference} className="orange-background">
      <section className="business-applications-section">
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            marginBottom: '48px !important',
          }}
          variant="h3"
          className="section-title"
        >
          {t('content.home.businessApplicationsSection.title')}
        </Typography>

        <Carousel gapToDots={5}>
          {items.map((item) => {
            return (
              <Card
                key={uniqueId(item.title)}
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                buttonText="Details"
                imageSize="small"
                imageShape="round"
                variant="minimal"
                expandOnHover={false}
                filledBackground={true}
                onClick={item.onClick}
              />
            )
          })}
        </Carousel>
      </section>
    </div>
  )
}
