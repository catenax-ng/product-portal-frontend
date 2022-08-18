/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { DetailGrid } from '../../../shared/basic/DetailGrid'
import { Grid, Divider, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getEdgebyEdgeIdSelector } from 'features/irs/slice'
import dayjs from 'dayjs'

export const EdgeDetails = ({ edge }: { edge: any }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const edgeInfo = useSelector((state) => {
    return getEdgebyEdgeIdSelector(state, edge)
  })

  const hasEdges = () => edgeInfo.length > 0

  return (
    <>
      <Divider sx={{ mr: -2, ml: -2 }} />
      <Grid
        container
        sx={{
          width: `calc(100% + ${theme.spacing(4)})`,
          m: `0 -${theme.spacing(2)}`,
          p: 2,
          typography: 'label3',
          bgcolor: 'background.background09',
        }}
      >
        <Grid item xs={12}>
          Edge
        </Grid>
      </Grid>

      {hasEdges() && (
        <>
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={t('content.irs.dialog.edge.catenaXId') + ':'}
            content={edgeInfo[0].catenaXId}
          />
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={t('content.irs.dialog.edge.childCatenaXId') + ':'}
            content={edgeInfo[0].childItem.childCatenaXId}
          />
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={t('content.irs.dialog.edge.assembledOn') + ':'}
            content={dayjs(edgeInfo[0].childItem.assembledOn).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          />
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={t('content.irs.dialog.edge.lastModifiedOn') + ':'}
            content={dayjs(edgeInfo[0].childItem.lastModifiedOn).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          />
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={t('content.irs.dialog.edge.lifecycleContext') + ':'}
            content={edgeInfo[0].childItem.lifecycleContext}
          />
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={
              t('content.irs.dialog.edge.measurementUnit.datatypeURI') + ':'
            }
            content={edgeInfo[0].childItem.quantity.measurementUnit.datatypeURI}
          />
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={
              t('content.irs.dialog.edge.measurementUnit.lexicalValue') + ':'
            }
            content={
              edgeInfo[0].childItem.quantity.measurementUnit.lexicalValue
            }
          />
          <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
          <DetailGrid
            topic={t('content.irs.dialog.edge.quantityNumber') + ':'}
            content={edgeInfo[0].childItem.quantity.quantityNumber}
          />
        </>
      )}

      {/* <SyntaxHighlighter
        key={`payload_${edge.id}_2`}
        style={googlecode}
        language="json"
      >
        {JSON.stringify(edgeInfo, null, 2)}
      </SyntaxHighlighter> */}
    </>
  )
}
