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
  Dialog,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { nodeDialogSelector, getShells } from 'features/irs/slice'
import { ShellDescriptor } from 'features/digitalTwins/types'
import { useTranslation } from 'react-i18next'
import { NodeDetailsTwo } from './NodeDetailsTwo'

interface NodeDialogProps {
  show: boolean
  onClose: () => void
}

export const NodeDetailDialog = ({ show, onClose }: NodeDialogProps) => {
  const { t } = useTranslation()
  const nodeDialoge = useSelector(nodeDialogSelector)
  const shellList = useSelector(getShells)
  // console.log('shellList', shellList)
  // console.log('nodeDialoge', nodeDialoge)
  const twin = shellList.find(
    (x: ShellDescriptor) => x.globalAssetId.value[0] === nodeDialoge.nodeId
  )
  return (
    <Dialog open={show}>
      <DialogHeader
        title={t('content.irs.dialog.title')}
        closeWithIcon
        onCloseWithIcon={onClose}
      />
      <DialogContent>{twin && <NodeDetailsTwo twin={twin} />}</DialogContent>
    </Dialog>
  )
}
