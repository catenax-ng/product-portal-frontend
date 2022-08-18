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
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { IRSRequestBody } from './types'

const fetchJobById = createAsyncThunk('fetch Job by id', async (id: string) => {
  try {
    return await Api.getInstance().getJobById(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('Get job by id api call error')
  }
})

const fetchJobs = createAsyncThunk('fetch Jobs', async () => {
  try {
    return await Api.getInstance().getJobs()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('Get jobs api call error')
  }
})

const postJob = createAsyncThunk(
  'post Job',
  async (reqBody: IRSRequestBody) => {
    try {
      return await Api.getInstance().setJob(reqBody)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Get jobs api call error')
    }
  }
)

export { fetchJobById, fetchJobs, postJob }
