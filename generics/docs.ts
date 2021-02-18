/**
 * https://www.typescriptlang.org/docs/handbook/generics.html
 */

function identity1(args: number): number {
  return args
}

function identity2(args: any): any {
  return args
}

function identity3<T>(args: T): T {
  return args
}

let output1 = identity3<string>("Hello World")
let output2 = identity3('Hello TypeScript!')

function loggingIdentity<T>(args: T[]): T[] {
  console.log(args.length)
  return args
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity1: <T>(arg: T) => T = identity
let myIdentity2: <U>(arg: U) => U = identity
let myIdentity3: { <T>(arg: T): T } = identity

interface GenericIdentityFn {
  <T>(arg: T): T
}

let myIdentity4: GenericIdentityFn = identity

interface GenericParamsIdentityFn<T> {
  (arg: T): T
}

let myIdentity5: GenericParamsIdentityFn<number> = identity