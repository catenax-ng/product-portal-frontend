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
import { Nullable } from 'types/MainTypes'

export interface JobsInitialState {
  jobs: irsjobs
  job: Nullable<irsjob>
  nodeDialog: nodeDialog
  edgeDialog: edgeDialog
  loading: boolean
  error: string
}
export interface nodeDialog {
  showNodeDialog: boolean
  nodeId: string
}

export interface edgeDialog {
  showEdgeDialog: boolean
  edgeId: string
}

export interface irsjobstatus {
  jobId: string
  status: string
}
export interface irsjobs extends Array<irsjobstatus> {}

export interface irsjob {
  job: jobinfo
  relationships: Relationship[]
  shells: ShellDescriptor[]
  submodels: Submodels[]
  tombstones: Tombstones[]
}

export interface jobinfo {
  exception: IrsException
  globalAssetId: string
  jobId: string
  jobParameter: {}
  jobState: string
  createdOn: Date
  jobCompleted: string
  lastModifiedOn: string
  startedOn: string
  owner: string
  summary: Summary
}

export interface Relationship {
  catenaXId: string
  childItem: childItem
}

interface childItem {
  assembledOn: string
  childCatenaXId: string
  lastModified: string
  lifecycleContext: string
  quantity: quantity
}

interface quantity {
  quantityNumber: number
  measurementUnit: measurementUnit
}

interface measurementUnit {
  datatypeURI: string
  lexicalValue: string
}

export interface Submodels {
  aspectType: string
  identification: string
  payload: string
}
export interface Tombstones {
  catenaXId: string
  endpointURL: string
  processingError: ProcessingError
}

interface ProcessingError {
  errorDetail: string
  lastAttempt: string
  retryCounter: number
}

interface IrsException {
  errorDetail: string
  exception: string
  exceptionDate: string
}

interface Summary {
  asyncFetchedItems: {
    completed: number
    failed: number
    running: number
  }
}

export type FilterParams = {
  readonly page: number
  readonly pageSize: number
}

export interface ShellDescriptor {
  description: Description[]
  globalAssetId: {
    value: [string]
  }
  idShort: string
  identification: string
  specificAssetIds: [
    {
      key: string
      semanticId: SemanticId
      value: string
    }
  ]
  submodelDescriptors: SubmodelDescriptors[]
}

export interface SubmodelDescriptors {
  description: Description[]
  endpoints: Endpoints[]
  idShort: string
  identification: string
  semanticId: SemanticId
}

interface Description {
  language: string
  text: string
}

interface Endpoints {
  interface: string
  protocolInformation: {
    endpointAddress: string
    endpointProtocol: string
    endpointProtocolVersion: string
    subprotocol: string
    subprotocolBody: string
    subprotocolBodyEncoding: string
  }
}

interface SemanticId {
  value: string[]
}
