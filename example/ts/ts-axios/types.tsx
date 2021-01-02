export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE';
export interface AxiosRequestConfig {
    url: string,
    method: Methods,
    params: any
}
// Promise 的泛型代表这个promsie变成成功态之后resolve的值
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>
}

// 泛型T代表响应体的类型
export interface AxiosResponse<T = any>{
    data: T,
    status: number,
    statusText: string,
    headers?: Record<string, any>
}