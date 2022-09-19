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

import {
  Button,
  IconButton,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Divider, Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment } from 'features/appManagement/slice'

export default function TechnicalIntegration() {
  const { t } = useTranslation()
  const [
    technicalIntegrationNotification,
    setTechnicalIntegrationNotification,
  ] = useState(false)
  const dispatch = useDispatch()

  const defaultValues = {}

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const onIntegrationSubmit = async (data: any) => {
    setTechnicalIntegrationNotification(true)
  }

  return (
    <div className="technical-integration">
      <Typography variant="h3" mt={10} mb={4} align="center">
        {'Technical Integration'}
      </Typography>
      <Typography variant="body2" className="header-description" align="center">
        {'In progress'}
      </Typography>
      <Box mb={2}>
        <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
        <Button
          variant="outlined"
          startIcon={<HelpOutlineIcon />}
          sx={{ mr: 1 }}
        >
          {t('content.apprelease.footerButtons.help')}
        </Button>
        <IconButton color="secondary" onClick={() => dispatch(decrement())}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button
          onClick={() => dispatch(increment())}
          variant="contained"
          disabled={!isValid}
          sx={{ float: 'right' }}
        >
          {t('content.apprelease.footerButtons.saveAndProceed')}
        </Button>
        <Button
          variant="outlined"
          name="send"
          sx={{ float: 'right', mr: 1 }}
          onClick={handleSubmit(onIntegrationSubmit)}
        >
          {t('content.apprelease.footerButtons.save')}
        </Button>
      </Box>
      {technicalIntegrationNotification && (
        <div className="errorMsg">
          <PageNotifications
            title={t('content.apprelease.appReleaseForm.error.title')}
            description={t('content.apprelease.appReleaseForm.error.message')}
            open
            severity="error"
            onCloseNotification={() =>
              setTechnicalIntegrationNotification(false)
            }
          />
        </div>
      )}
    </div>
  )
}