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
import { Box } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import SourceIcon from '@mui/icons-material/Source'
import { SubmodelDescriptors } from 'features/irs/types'
import { Tombstones } from 'features/irs/types'
import { useSelector, useDispatch } from 'react-redux'
import {
  getTombstonesByEndpointAdress,
  getSubmodelPaloadBySubmodelId,
} from 'features/irs/slice'
import uniqueId from 'lodash/uniqueId'
import { Button } from 'cx-portal-shared-components'
import jobSlice from 'features/irs/slice'

interface props {
  submodel: SubmodelDescriptors
  aasId: string
}

export const SubmodelDetailCard = ({ submodel, aasId }: props) => {
  const dispatch = useDispatch()

  const endpointAddress =
    submodel.endpoints[0].protocolInformation.endpointAddress
  // var tombstones:Tombstones[] | null = null

  const tombstones: Tombstones[] | [] = useSelector((state) => {
    if (endpointAddress != null) {
      return getTombstonesByEndpointAdress(state, endpointAddress)
    } else {
      return []
    }
  })

  const submodelId = submodel.identification
  const submodelPayload = useSelector((state) =>
    submodelId ? getSubmodelPaloadBySubmodelId(state, submodelId) : []
  )

  if (!tombstones || !submodelPayload) {
    return null
  }
  return (
    <>
      <Box>
        <Button
          key={uniqueId(submodel.idShort)}
          sx={{ width: '100%' }}
          size="small"
          color={tombstones.length < 1 ? 'success' : 'error'}
          variant="contained"
          onClick={(event: any) => {
            event.preventDefault()
            // console.log('CLICK', aasId)
            dispatch(jobSlice.actions.openNodeDialog(aasId))
          }}
        >
          {submodel.idShort}
          <div>
            <div style={{ float: 'right', marginLeft: 10 }}>
              {tombstones.map((error) => {
                return (
                  <ErrorOutlineIcon
                    key={uniqueId(error.endpointURL)}
                  ></ErrorOutlineIcon>
                )
              })}

              {submodelPayload.map((x) => {
                return <SourceIcon key={x.identification}></SourceIcon>
              })}
            </div>
          </div>
        </Button>
      </Box>
    </>
  )
}
