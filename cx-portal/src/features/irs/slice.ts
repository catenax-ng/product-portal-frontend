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
import { createSlice, createSelector } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { fetchJobById, fetchJobs } from './actions'
import {
  edgeDialog,
  irsjob,
  irsjobs,
  JobsInitialState,
  nodeDialog,
  ShellDescriptor,
  Submodels,
  Tombstones,
  Relationship,
} from './types'
import { EdgeData, NodeData } from 'reaflow'
import { uniqueId } from 'lodash'

const initialState: JobsInitialState = {
  jobs: [],
  job: null,
  nodeDialog: { showNodeDialog: false, nodeId: '' },
  edgeDialog: { showEdgeDialog: false, edgeId: '' },
  loading: false,
  error: '',
}

const jobSlice = createSlice({
  name: 'irs',
  initialState,
  reducers: {
    openNodeDialog: (state, action) => {
      state.nodeDialog.showNodeDialog = true
      state.nodeDialog.nodeId = action.payload
    },
    closeNodeDialog: (state) => {
      state.nodeDialog.showNodeDialog = false
      state.nodeDialog.nodeId = ''
    },
    openEdgeDialog: (state, action) => {
      state.edgeDialog.showEdgeDialog = true
      state.edgeDialog.edgeId = action.payload
    },
    closeEdgeDialog: (state) => {
      state.edgeDialog.showEdgeDialog = false
      state.edgeDialog.edgeId = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.jobs = []
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchJobs.fulfilled, (state, { payload }) => {
      state.jobs = payload as irsjobs
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.jobs = []
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchJobById.pending, (state, action) => {
      state.job = null
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchJobById.fulfilled, (state, { payload }) => {
      state.job = payload as irsjob
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchJobById.rejected, (state, action) => {
      state.job = null
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const nodeDialogSelector = (state: RootState): nodeDialog =>
  state.irs.nodeDialog

export const edgeDialogSelector = (state: RootState): edgeDialog =>
  state.irs.edgeDialog

export const jobsSelector = (state: RootState): JobsInitialState => state.irs

export const nodeSelector = (state: RootState): NodeData<any>[] | [] => {
  if (state.irs.job) {
    const ret: NodeData<any>[] | [] = state.irs.job?.shells.map(
      (el: ShellDescriptor): NodeData<any> => {
        return {
          id: el.globalAssetId.value[0],
          // text: el.globalAssetId.value[0],
          height: 300,
          width: 300,
          ...el,
        }
      }
    )
    return ret
  } else {
    return []
  }
}

export const edgeSelector = (state: RootState): EdgeData<any>[] | [] => {
  if (state.irs.job?.relationships) {
    const ret: EdgeData<any>[] = state.irs.job.relationships.map(
      (rel: any): EdgeData<any> => {
        console.log(rel)
        return {
          id: uniqueId(rel.catenaXId),
          from: rel.catenaXId,
          to: rel.linkedItem.childCatenaXId,
        }
      }
    )
    const listOfNodeIds = state.irs.job?.shells.map((x: any) => {
      // console.log('globalAssetIds', x.globalAssetId.value[0])
      return x.globalAssetId.value[0]
    })
    // filter out all edges, where a node does not exist yet
    const filtret = ret.filter((x) => {
      if (x.to) {
        return listOfNodeIds.includes(x.to)
      } else {
        return false
      }
    })

    return filtret
  } else {
    return []
  }
}

const getEdges = (state: RootState): Relationship[] | [] => {
  if (state.irs.job?.relationships) {
    return state.irs.job.relationships
  } else {
    return []
  }
}

const getEdge = (_: any, edge: { from: string; to: string; id: string }) => edge
export const getEdgebyEdgeIdSelector = createSelector(
  getEdges,
  getEdge,
  (edges, edge) => {
    if (edges) {
      // return edges
      // console.log('edge:', edge)
      return edges.filter(
        (x) =>
          x.catenaXId === edge.from && x.linkedItem.childCatenaXId === edge.to
      )
    } else {
      return []
    }
  }
)

// https://flufd.github.io/reselect-with-multiple-parameters/
const getTombstones = (state: any): Tombstones[] | [] => {
  if (state.irs.job?.tombstones) {
    return state.irs.job.tombstones
  } else {
    return []
  }
}
const getEndpointAddress = (_: any, EndpointAdress: string): string =>
  EndpointAdress
export const getTombstonesByEndpointAdress = createSelector(
  getTombstones,
  getEndpointAddress,
  (tombstones, EndpointAdress) => {
    if (tombstones) {
      return tombstones.filter((x) => x.endpointURL === EndpointAdress)
    } else {
      return []
    }
  }
)

const getSubmodelPayloads = (state: any): Submodels[] | [] => {
  if (state.irs.job?.submodels) {
    return state.irs.job?.submodels
  } else {
    return []
  }
}
const getSubmodelId = (_: any, submodelId: string): string => submodelId
export const getSubmodelPaloadBySubmodelId = createSelector(
  getSubmodelPayloads,
  getSubmodelId,
  (submodelPayloads, submodelId) => {
    if (submodelPayloads) {
      return submodelPayloads.filter((x) => x.identification === submodelId)
    } else {
      return []
    }
  }
)

export const getShells = (state: RootState): ShellDescriptor[] => {
  if (state.irs.job?.shells) {
    return state.irs.job?.shells
  } else {
    return []
  }
}

export default jobSlice
