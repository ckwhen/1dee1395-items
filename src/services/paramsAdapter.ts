import { httpClient } from './api';
import { ParamsService } from '../domain/ports';

export function createParamsAdapter(): ParamsService {
  const root = '/params';

  return {
    fetchParams: () => {
      return httpClient.get(root);
    },
  };
}
