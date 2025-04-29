import { UniqueId } from '../shared-kernel';

export type ParamLabel = string;

enum ParamTypes {
  Category,
  InStock,
}

export type Param = {
  id: UniqueId;
  label: ParamLabel;
  value: string | number;
  type: ParamTypes.InStock | ParamTypes.Category;
};

const checkParamByType = (type: ParamTypes.InStock | ParamTypes.Category) => {
  return (param: Param) => param.type === type;
};

export const checkIsCategoryParam = checkParamByType(ParamTypes.Category);

export const checkIsInStockParam = checkParamByType(ParamTypes.InStock);
