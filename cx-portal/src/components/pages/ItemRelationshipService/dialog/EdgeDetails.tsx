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

import { Typography, CustomAccordion } from 'cx-portal-shared-components'
import { ShellDescriptor, SubmodelDescriptors } from 'features/irs/types'
import { DetailGrid } from '../../../shared/basic/DetailGrid'
import { Grid, Box, Divider, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useSelector } from 'react-redux'
import { getEdgebyEdgeIdSelector } from 'features/irs/slice'

export const EdgeDetails = ({ edge }: { edge: any }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const edgeInfo = useSelector((state) => {
    return getEdgebyEdgeIdSelector(state, edge)
  })

  return (
    <>
      <SyntaxHighlighter
        key={`payload_${edge.id}_2`}
        style={googlecode}
        language="json"
      >
        {JSON.stringify(edgeInfo, null, 2)}
      </SyntaxHighlighter>
    </>
  )
}
