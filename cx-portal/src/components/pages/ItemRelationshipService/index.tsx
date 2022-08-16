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

import { Table } from 'cx-portal-shared-components'
import './irs.scss'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobById, fetchJobs } from 'features/irs/actions'
import { Canvas, CanvasPosition, Node, Edge } from 'reaflow'
import { IrsJobsTableColumns } from './IrsJobsTableColumns'
import jobSlice, {
  nodeSelector,
  edgeSelector,
  nodeDialogSelector,
  jobsSelector,
  edgeDialogSelector,
} from 'features/irs/slice'
import { NodeTemplate } from './visualization/nodeTemplate'
import { IrsJobDetails } from './irsJobDetails'
import { NodeDetailDialog } from './dialog/NodeDetailDialog'
import { store } from '../../../features/store'
import { useTranslation } from 'react-i18next'
import { EdgeDetailDialog } from './dialog/EdgeDetailDialog'

// What to do for integration in this project
// 1. install dependencies
//      cd cx-portal
//      yarn add reaflow
//      yarn add react-syntax-highlighter
// 2. add feature folder for communication
// 3. add all ressources in the ItemRelationshipService Folder
// 4. copy DetailGrid from shared components and add the type any to content
// 5. configure Config.tsx
//      add to ALL_PAGES -> { name: PAGES.IRS, element: <ItemRelationshipService />},
//      add to mainMenuFullTree -> { name: PAGES.IRS },
// 6. add to Constants.ts to PAGES
//      IRS = 'itemrelationshipservice'
// 7. Add translations to locals en and de
//      "itemrelationshipservice": "Item Relationship Service"
// 8. Add reducer to store   isr: jobSlice.reducer,
// 9. Change return 'https://centralidp.demo.catena-x.net/auth' in EnvironmentService for Authentication with the correct Keycloak
// 10. Start a Job on dev
// {
//   "aspects": [
//       "AssemblyPartRelationship",
//       "SerialPartTypization"
//   ],
//   "bomlLifecycle":"asBuilt",
//   "collectAspects": true,
//   "direction":"downward",
//   "depth":10,
//   "globalAssetId": "urn:uuid:d387fa8e-603c-42bd-98c3-4d87fef8d2bb"
// }

// LOP
// ✅ Graph chart, when nodes are missing
// ✅ Job Details View on Table element selection
// ✅ Dialog for nodes for extending information
//          - Submodel
//          - SubmodelPayload
//          - Tombstones
// ✅ Styling the Visualization
// ✅ Clean up Code
// ✅ Check into Github Branch
// ✅ Remove helper console.log()
// ✅ Linting
// ✅ Add translations
// ✅ Add Copyright Header
// ✅ Add Success state to aspect button
// ✅ Clean up irs.scss
// ✅ Date
// ✅ Clean up types
// ✅ Change highlighter to https://github.com/react-syntax-highlighter/react-syntax-highlighter
// ✅  Refactor Dialog
// ✅ SyntaxHiglighter does not work properly lower Nodes
// ✅  Style Dialog NodeDetailsTwo
// ✅ Add Click event on Node
// ✅ Add additional Information for Edge
// MAYBE: change visualization to D3 https://codesandbox.io/examples/package/react-d3-tree
// TODO: Refactor to new API Logic
// TODO: Automatic Refresh Toggle
// TODO: Change functionality to show Items, where Registry Call has not been done yet (Links which have been filtered out!)
// TODO: Choose button environment int dev
// TODO: Add Area to start a Job
// TODO: Decople FE from Portal
// TODO: Refactor Visualization on scroll
// TODO: Style and cleanup Edge Details: CSS, Slice, Types

export default function ItemRelationshipService() {
  const { t } = useTranslation()
  const { jobs, loading } = useSelector(jobsSelector)
  const { job } = useSelector(jobsSelector)
  const { showNodeDialog } = useSelector(nodeDialogSelector)
  const { showEdgeDialog } = useSelector(edgeDialogSelector)
  const nodes = useSelector(nodeSelector)
  const edges = useSelector(edgeSelector)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  // Automatic Refresh
  // const s = true
  // useEffect(() => {
  //   if(s){
  //     setInterval(() =>{
  //       // console.log('timer', dispatch(fetchJobs()))
  //       // Update jobs
  //     }, 30*1000)
  //   }
  // })

  const closeNodeDialog = () => {
    dispatch(jobSlice.actions.closeNodeDialog())
  }

  const closeEdgeDialog = () => {
    dispatch(jobSlice.actions.closeEdgeDialog())
  }

  const visualize = (id: string) => {
    const encodedId = encodeURIComponent(id)
    dispatch(fetchJobById(encodedId))
  }

  const columns = IrsJobsTableColumns(visualize)

  const nodeStyle = {
    fill: 'white',
    // fontColor: 'rgba(0, 0, 0, 0.1)',
    // stroke: '1px solid #dcdcdc',
    // borderStyle: 'solid',
    // borderColor: '#dcdcdc',
    // borderRadius: '24px',
    // strokeRadius: 24
  }

  const edgeStyle = {
    stroke: 'rgba(218, 48, 40, 0.425)',
    strokeDasharray: 5,
  }

  return (
    <main className="main">
      <section style={{ paddingBottom: 20 }}>
        <Table
          // title="IRS Jobs"
          title={t('content.irs.jobsTable.title')}
          className="irs-table"
          columns={columns}
          rows={jobs}
          getRowId={(row: any) => `${row.jobId}`}
          loading={loading}
          disableColumnSelector={true}
          disableDensitySelector={true}
          hideFooter={true}
          disableColumnMenu={true}
          onSelectionModelChange={(item: any) => {
            visualize(item.toString())
          }}
        />
      </section>
      {job && <IrsJobDetails job={job?.job}></IrsJobDetails>}
      {job && nodes.length > 0 && edges.length > 0 && (
        <section>
          <Box className="irs-visualization" sx={{ textAlign: 'center' }}>
            <Box className="irs-visualization-header">
              <h5>{t('content.irs.visualization.title')}</h5>
            </Box>
            <Canvas
              className="canvas"
              zoom={0.4}
              height={800}
              nodes={nodes}
              edges={edges}
              defaultPosition={CanvasPosition.TOP}
              node={
                <Node
                  removable={false}
                  style={nodeStyle}
                  onClick={(event: any, node) => {
                    event.preventDefault()
                    console.log('CLICK', node)
                    dispatch(jobSlice.actions.openNodeDialog(node.id))
                  }}
                >
                  {(nodeChild) => (
                    <foreignObject
                      height={290}
                      width={290}
                      x={0}
                      y={0}
                      // onClick={(event, node) => {
                      //     console.log('Selecting Node', event, node)
                      //     if (onClick) onClick(event, node)
                      // }}
                    >
                      <Box>
                        <NodeTemplate shell={nodeChild.node}></NodeTemplate>
                      </Box>
                    </foreignObject>
                  )}
                </Node>
              }
              edge={
                <Edge
                  removable={false}
                  className="edge"
                  style={edgeStyle}
                  onClick={(event, edge) => {
                    console.log('Selecting Edge', event, edge)
                    dispatch(jobSlice.actions.openEdgeDialog(edge))
                  }}
                />
              }
            />
          </Box>
        </section>
      )}

      <NodeDetailDialog
        show={showNodeDialog}
        onClose={() => closeNodeDialog()}
      ></NodeDetailDialog>
      <EdgeDetailDialog
        show={showEdgeDialog}
        onClose={() => closeEdgeDialog()}
      ></EdgeDetailDialog>
    </main>
  )
}
