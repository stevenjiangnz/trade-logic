import {IScan} from '../interface/iscan'

export class TurningScan implements IScan {
  // private criteria;

  constructor() {
  }

  get criteria() {
    return (input) => {
      return input.length;
    };
  }

  public scan(input) {
    return this.criteria(input);
  }
}