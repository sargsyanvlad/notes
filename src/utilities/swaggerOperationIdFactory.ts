import * as _ from 'lodash';

const counter: { [key: string]: number } = {};

export function operationIdFactory(
  controllerKey: string,
  methodKey: string,
): string {
  controllerKey = _.lowerFirst(controllerKey);
  methodKey = methodKey ? _.capitalize(methodKey) : 'Method';

  let operationId = `${controllerKey}${methodKey}`;

  let count = counter[operationId] ?? 0;
  counter[operationId] = ++count;

  if (count > 1) {
    operationId = `${operationId}${count}`;
  }

  return operationId;
}
