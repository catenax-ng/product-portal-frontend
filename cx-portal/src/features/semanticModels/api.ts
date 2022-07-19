import qs from 'querystring'
import { HttpClient } from 'utils/HttpClient'
import {
  FilterParams,
  ModelList,
  NewSemanticModel,
  SemanticModel,
} from './types'
import { getSemanticApiBase } from 'services/EnvironmentService'
import { getHeaders, getTextHeaders } from 'services/RequestService'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(`${getSemanticApiBase()}hub/api/v1/`)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getModels = (filters: FilterParams) =>
    this.instance.get<ModelList>(
      `models?${qs.stringify(filters)}`,
      getHeaders()
    )

  public getStaticModels = () =>
    this.instance.get<ModelList>(`api/semanticModels/models.json`)

  public getModelById = (id: string) =>
    this.instance.get<SemanticModel>(`models/${id}`, getHeaders())

  public deleteModelById = (id: string) =>
    this.instance.delete<string>(`models/${id}`, getHeaders())

  public postSemanticModel = (model: NewSemanticModel) =>
    this.instance.post<SemanticModel>(
      `models?type=${model.type}&status=${model.status}`,
      model.model,
      getTextHeaders()
    )

  public getOpenAPIUrl = (id: string, url: string) =>
    this.instance.get<Blob>(`models/${id}/openapi?baseUrl=${url}`, {
      responseType: 'blob',
      ...getHeaders(),
    })
}
