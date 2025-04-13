import { Client } from './client';
import { Card } from './card';
import { Set } from './set';
import { IQuery } from '../interfaces/query';

export class QueryBuilder {
    static async all<T>(resource: string): Promise<T[]> {
        const params: IQuery[] = [{ name: 'pageSize', value: 250 }];
        // const response = await Client.get(resource, params);
        const response = await Client.get(resource);
        return this.mapResponse<T>(response);
    }

    static async find<T>(resource: string, id: string): Promise<T> {
        const response = await Client.get(resource, id);
        return this.mapSingleResponse<T>(response);
    }

    static async where<T>(resource: string, params: IQuery[]): Promise<T[]> {
        const response = await Client.get(resource, params);
        return this.mapResponse<T>(response);
    }

    static async group(resource: string, groupBy: string): Promise<Record<string, Set[]>> {
        const params: IQuery[] = [{ name: 'pageSize', value: 250 }];
        const resourceGroupBy = resource + '/' + groupBy;
        // const response = await Client.get(resourceGroupBy, params);
        const response = await Client.get(resourceGroupBy);
        return this.mapGroupedResponse(response);
    }

    private static mapResponse<T>(response: any): T[] {
        if (Array.isArray(response)) {
            return response as T[];
        }
        return [];
    }

    private static mapSingleResponse<T>(response: any): T {
        return response as T;
    }

    private static mapGroupedResponse<T>(response: any): Record<string, T[]> {
        if (typeof response === 'object' && response !== null) {
            return Object.entries(response).reduce(
                (acc, [series, sets]) => {
                    acc[series] = Array.isArray(sets) ? sets : [];
                    return acc;
                },
                {} as Record<string, T[]>
            );
        }
        return {};
    }
}
