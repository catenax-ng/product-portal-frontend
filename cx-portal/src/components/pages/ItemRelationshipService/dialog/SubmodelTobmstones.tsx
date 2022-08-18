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

import { Box, Divider } from '@mui/material'
import { SubmodelDescriptors } from 'features/irs/types'
import { DetailGrid } from '../helper/DetailGrid'
import { Tombstones } from 'features/irs/types'
import { useSelector } from 'react-redux'
import {
  getTombstonesByEndpointAdress,
  getSubmodelPaloadBySubmodelId,
} from 'features/irs/slice'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { useTheme } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import SourceIcon from '@mui/icons-material/Source'
import uniqueId from 'lodash/uniqueId'

interface props {
  subModel: SubmodelDescriptors
  // hasTombstones?: (x:boolean) => void
  // setPayload?: (x:boolean) => void
}

export const SubmodelTobmstones = ({ subModel }: props) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const tombstones: Tombstones[] | [] = useSelector((state) => {
    if (subModel != null) {
      return getTombstonesByEndpointAdress(
        state,
        subModel.endpoints[0].protocolInformation.endpointAddress
      )
    } else {
      return []
    }
  })

  let hasTombstoness = tombstones.length > 0 ? true : false

  // hasTombstones(hasTombstoness)

  const submodelId = subModel.identification
  const submodelPayload = useSelector((state) => {
    if (submodelId) {
      return getSubmodelPaloadBySubmodelId(state, submodelId)
    } else {
      return []
    }
  })

  const hasPayload = () => (submodelPayload.length > 0 ? true : false)

  return (
    <>
      {hasTombstoness && (
        <Box key={'tombstones'}>
          <Box
            style={{
              display: 'inline-block',
              color: theme.palette.error.light,
              marginTop: 20,
            }}
          >
            <ErrorOutlineIcon
              style={{
                fontSize: 50,
                float: 'left',
                verticalAlign: 'middle',
                marginTop: 10,
              }}
            ></ErrorOutlineIcon>
            <h2 style={{ float: 'left', marginLeft: 10 }}>
              {t('content.irs.dialog.submodelTombstones.title')}
            </h2>
          </Box>

          {/* <Grid
            container
            sx={{
              width: `calc(100% + ${theme.spacing(4)})`,
              m: `0 -${theme.spacing(2)}`,
              p: 2,
              typography: 'label3',
              bgcolor: theme.palette.error.light,
            }}
          >
            <Grid item xs={12}>
              <ErrorOutlineIcon style={{paddingTop:5}}></ErrorOutlineIcon> {t('content.irs.dialog.submodelTombstones.title')}
            </Grid>
          </Grid> */}

          {tombstones.map((stone) => {
            // console.log(JSON.parse('{'+stone.processingError.errorDetail.toString()+'}'))
            return (
              <Box key={`${uniqueId(stone.catenaXId)}`}>
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.dialog.submodelTombstones.lastAttempt')}
                  content={dayjs(stone.processingError.lastAttempt).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.dialog.submodelTombstones.errorDetail')}
                  content={
                    stone.processingError.errorDetail
                    // <SyntaxHighlighter style={googlecode}>
                    //   {
                    //   // JSON.stringify(JSON.parse(stone.processingError.errorDetail), null, 2)
                    //   }
                    // </SyntaxHighlighter>
                  }
                />
              </Box>
            )
          })}
        </Box>
      )}

      {hasPayload() && (
        <>
          <Box
            style={{
              display: 'inline-block',
              color: theme.palette.success.main,
              marginTop: 20,
            }}
          >
            <SourceIcon
              style={{
                fontSize: 50,
                float: 'left',
                verticalAlign: 'middle',
                marginTop: 10,
              }}
            ></SourceIcon>
            <h2 style={{ float: 'left', marginLeft: 10 }}>
              {t('content.irs.dialog.submodelPayload.title')}
            </h2>
          </Box>

          {/* <h2 style={{ color: theme.palette.success.main }}>{t('content.irs.dialog.submodelPayload.title')}</h2> */}
          {submodelPayload.map((payload) => {
            console.log(payload.payload)
            return (
              <Box
                key={`payload_${payload.identification}_${payload.aspectType}`}
              >
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />

                <DetailGrid
                  topic={t('content.irs.dialog.submodelPayload.payload')}
                  content={
                    <SyntaxHighlighter
                      key={`payload_${payload.identification}_${payload.aspectType}_syntax`}
                      style={googlecode}
                      language="json"
                    >
                      {JSON.stringify(JSON.parse(payload.payload), null, 2)}
                    </SyntaxHighlighter>
                  }
                />
              </Box>
            )
          })}
        </>
      )}
    </>
  )
}
