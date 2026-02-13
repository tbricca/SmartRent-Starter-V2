import {
  YupTimeType,
  YupDateType,
  PhoneMethodType,
  YupColorType,
} from "@smartrent/utils";

// this needs to be declared to extend the string methods to allow for our custom phone/date/time methods
declare module "yup" {
  export interface StringSchema extends Yup.StringSchema {
    phone: PhoneMethodType;
    date: YupDateType;
    time: YupTimeType;
    color: YupColorType;
  }
}
