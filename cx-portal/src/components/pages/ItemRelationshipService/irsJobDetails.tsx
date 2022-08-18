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
import { jobinfo } from 'features/irs/types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { DetailGrid } from './helper/DetailGrid'
import { Grid, Box, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

interface props {
  job: jobinfo | undefined
}

export const IrsJobDetails = ({ job }: props) => {
  const { t } = useTranslation()
  const beautifulJson = (json: any) => {
    return (
      <SyntaxHighlighter style={googlecode}>
        {JSON.stringify(json, null, 2)}
      </SyntaxHighlighter>
    )
  }
  return (
    <>
      <section
        style={{
          padding: '34px 20px',
        }}
      >
        <Box className="irs-job-details">
          <Box className="irs-job-details-header">
            <h5>{t('content.irs.jobDetails.title')}</h5>
          </Box>
          <Box className="irs-job-details-content">
            {job && (
              <Grid>
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid topic={'Job ID:'} content={job?.jobId} />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.globalAssetId')}
                  content={job.globalAssetId}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid topic={'Job State:'} content={job.jobState} />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.exception')}
                  content={beautifulJson(job.exception)}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.createdOn')}
                  content={dayjs(job.createdOn).format('YYYY-MM-DD HH:mm:ss')}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.startedOn')}
                  content={dayjs(job.startedOn).format('YYYY-MM-DD HH:mm:ss')}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.lastModifiedOn')}
                  content={dayjs(job.lastModifiedOn).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.jobCompleted')}
                  content={dayjs(job?.jobCompleted).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.owner')}
                  content={job.owner}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.summary')}
                  content={beautifulJson(job.summary)}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={t('content.irs.jobDetails.jobParameter')}
                  content={beautifulJson(job.jobParameter)}
                />
              </Grid>
            )}

            {/* <Highlight className="irs-job-details-content-code">
              {JSON.stringify(job, null, 2)}
            </Highlight> */}
          </Box>
        </Box>
      </section>
    </>
  )
}
