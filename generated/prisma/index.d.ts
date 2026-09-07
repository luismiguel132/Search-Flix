
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Favorite
 * 
 */
export type Favorite = $Result.DefaultSelection<Prisma.$FavoritePayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Reply
 * 
 */
export type Reply = $Result.DefaultSelection<Prisma.$ReplyPayload>
/**
 * Model CommentLike
 * 
 */
export type CommentLike = $Result.DefaultSelection<Prisma.$CommentLikePayload>
/**
 * Model ReplyLike
 * 
 */
export type ReplyLike = $Result.DefaultSelection<Prisma.$ReplyLikePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reply`: Exposes CRUD operations for the **Reply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Replies
    * const replies = await prisma.reply.findMany()
    * ```
    */
  get reply(): Prisma.ReplyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commentLike`: Exposes CRUD operations for the **CommentLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommentLikes
    * const commentLikes = await prisma.commentLike.findMany()
    * ```
    */
  get commentLike(): Prisma.CommentLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.replyLike`: Exposes CRUD operations for the **ReplyLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReplyLikes
    * const replyLikes = await prisma.replyLike.findMany()
    * ```
    */
  get replyLike(): Prisma.ReplyLikeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Favorite: 'Favorite',
    Comment: 'Comment',
    Reply: 'Reply',
    CommentLike: 'CommentLike',
    ReplyLike: 'ReplyLike'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "favorite" | "comment" | "reply" | "commentLike" | "replyLike"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: Prisma.$FavoritePayload<ExtArgs>
        fields: Prisma.FavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Reply: {
        payload: Prisma.$ReplyPayload<ExtArgs>
        fields: Prisma.ReplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReplyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReplyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>
          }
          findFirst: {
            args: Prisma.ReplyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReplyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>
          }
          findMany: {
            args: Prisma.ReplyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>[]
          }
          create: {
            args: Prisma.ReplyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>
          }
          createMany: {
            args: Prisma.ReplyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReplyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>[]
          }
          delete: {
            args: Prisma.ReplyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>
          }
          update: {
            args: Prisma.ReplyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>
          }
          deleteMany: {
            args: Prisma.ReplyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReplyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReplyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>[]
          }
          upsert: {
            args: Prisma.ReplyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyPayload>
          }
          aggregate: {
            args: Prisma.ReplyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReply>
          }
          groupBy: {
            args: Prisma.ReplyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReplyCountArgs<ExtArgs>
            result: $Utils.Optional<ReplyCountAggregateOutputType> | number
          }
        }
      }
      CommentLike: {
        payload: Prisma.$CommentLikePayload<ExtArgs>
        fields: Prisma.CommentLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          findFirst: {
            args: Prisma.CommentLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          findMany: {
            args: Prisma.CommentLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          create: {
            args: Prisma.CommentLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          createMany: {
            args: Prisma.CommentLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          delete: {
            args: Prisma.CommentLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          update: {
            args: Prisma.CommentLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          deleteMany: {
            args: Prisma.CommentLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          upsert: {
            args: Prisma.CommentLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          aggregate: {
            args: Prisma.CommentLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentLike>
          }
          groupBy: {
            args: Prisma.CommentLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentLikeCountArgs<ExtArgs>
            result: $Utils.Optional<CommentLikeCountAggregateOutputType> | number
          }
        }
      }
      ReplyLike: {
        payload: Prisma.$ReplyLikePayload<ExtArgs>
        fields: Prisma.ReplyLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReplyLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReplyLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>
          }
          findFirst: {
            args: Prisma.ReplyLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReplyLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>
          }
          findMany: {
            args: Prisma.ReplyLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>[]
          }
          create: {
            args: Prisma.ReplyLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>
          }
          createMany: {
            args: Prisma.ReplyLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReplyLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>[]
          }
          delete: {
            args: Prisma.ReplyLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>
          }
          update: {
            args: Prisma.ReplyLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>
          }
          deleteMany: {
            args: Prisma.ReplyLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReplyLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReplyLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>[]
          }
          upsert: {
            args: Prisma.ReplyLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReplyLikePayload>
          }
          aggregate: {
            args: Prisma.ReplyLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReplyLike>
          }
          groupBy: {
            args: Prisma.ReplyLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReplyLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReplyLikeCountArgs<ExtArgs>
            result: $Utils.Optional<ReplyLikeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    favorite?: FavoriteOmit
    comment?: CommentOmit
    reply?: ReplyOmit
    commentLike?: CommentLikeOmit
    replyLike?: ReplyLikeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    favorites: number
    comments: number
    replies: number
    commentLikes: number
    replyLikes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    replies?: boolean | UserCountOutputTypeCountRepliesArgs
    commentLikes?: boolean | UserCountOutputTypeCountCommentLikesArgs
    replyLikes?: boolean | UserCountOutputTypeCountReplyLikesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReplyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReplyLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReplyLikeWhereInput
  }


  /**
   * Count Type CommentCountOutputType
   */

  export type CommentCountOutputType = {
    replies: number
    likes: number
  }

  export type CommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | CommentCountOutputTypeCountRepliesArgs
    likes?: boolean | CommentCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCountOutputType
     */
    select?: CommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReplyWhereInput
  }

  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
  }


  /**
   * Count Type ReplyCountOutputType
   */

  export type ReplyCountOutputType = {
    likes: number
  }

  export type ReplyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    likes?: boolean | ReplyCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * ReplyCountOutputType without action
   */
  export type ReplyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyCountOutputType
     */
    select?: ReplyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReplyCountOutputType without action
   */
  export type ReplyCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReplyLikeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    avatarUrl: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    avatarUrl: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    avatarUrl: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatarUrl?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatarUrl?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatarUrl?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string | null
    email: string
    password: string
    avatarUrl: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    replies?: boolean | User$repliesArgs<ExtArgs>
    commentLikes?: boolean | User$commentLikesArgs<ExtArgs>
    replyLikes?: boolean | User$replyLikesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "avatarUrl" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    replies?: boolean | User$repliesArgs<ExtArgs>
    commentLikes?: boolean | User$commentLikesArgs<ExtArgs>
    replyLikes?: boolean | User$replyLikesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      replies: Prisma.$ReplyPayload<ExtArgs>[]
      commentLikes: Prisma.$CommentLikePayload<ExtArgs>[]
      replyLikes: Prisma.$ReplyLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      email: string
      password: string
      avatarUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    replies<T extends User$repliesArgs<ExtArgs> = {}>(args?: Subset<T, User$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commentLikes<T extends User$commentLikesArgs<ExtArgs> = {}>(args?: Subset<T, User$commentLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    replyLikes<T extends User$replyLikesArgs<ExtArgs> = {}>(args?: Subset<T, User$replyLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.replies
   */
  export type User$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    where?: ReplyWhereInput
    orderBy?: ReplyOrderByWithRelationInput | ReplyOrderByWithRelationInput[]
    cursor?: ReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReplyScalarFieldEnum | ReplyScalarFieldEnum[]
  }

  /**
   * User.commentLikes
   */
  export type User$commentLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    cursor?: CommentLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * User.replyLikes
   */
  export type User$replyLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    where?: ReplyLikeWhereInput
    orderBy?: ReplyLikeOrderByWithRelationInput | ReplyLikeOrderByWithRelationInput[]
    cursor?: ReplyLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReplyLikeScalarFieldEnum | ReplyLikeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Favorite
   */

  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _avg: FavoriteAvgAggregateOutputType | null
    _sum: FavoriteSumAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteAvgAggregateOutputType = {
    id: number | null
    movieId: number | null
    userId: number | null
  }

  export type FavoriteSumAggregateOutputType = {
    id: number | null
    movieId: number | null
    userId: number | null
  }

  export type FavoriteMinAggregateOutputType = {
    id: number | null
    movieId: number | null
    ehSerie: boolean | null
    userId: number | null
  }

  export type FavoriteMaxAggregateOutputType = {
    id: number | null
    movieId: number | null
    ehSerie: boolean | null
    userId: number | null
  }

  export type FavoriteCountAggregateOutputType = {
    id: number
    movieId: number
    ehSerie: number
    userId: number
    _all: number
  }


  export type FavoriteAvgAggregateInputType = {
    id?: true
    movieId?: true
    userId?: true
  }

  export type FavoriteSumAggregateInputType = {
    id?: true
    movieId?: true
    userId?: true
  }

  export type FavoriteMinAggregateInputType = {
    id?: true
    movieId?: true
    ehSerie?: true
    userId?: true
  }

  export type FavoriteMaxAggregateInputType = {
    id?: true
    movieId?: true
    ehSerie?: true
    userId?: true
  }

  export type FavoriteCountAggregateInputType = {
    id?: true
    movieId?: true
    ehSerie?: true
    userId?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FavoriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FavoriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithAggregationInput | FavoriteOrderByWithAggregationInput[]
    by: FavoriteScalarFieldEnum[] | FavoriteScalarFieldEnum
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _avg?: FavoriteAvgAggregateInputType
    _sum?: FavoriteSumAggregateInputType
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }

  export type FavoriteGroupByOutputType = {
    id: number
    movieId: number
    ehSerie: boolean
    userId: number
    _count: FavoriteCountAggregateOutputType | null
    _avg: FavoriteAvgAggregateOutputType | null
    _sum: FavoriteSumAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectScalar = {
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    userId?: boolean
  }

  export type FavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "movieId" | "ehSerie" | "userId", ExtArgs["result"]["favorite"]>
  export type FavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      movieId: number
      ehSerie: boolean
      userId: number
    }, ExtArgs["result"]["favorite"]>
    composites: {}
  }

  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteDefaultArgs> = $Result.GetResult<Prisma.$FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFindUniqueArgs>(args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFindFirstArgs>(args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteWithIdOnly = await prisma.favorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteFindManyArgs>(args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
     */
    create<T extends FavoriteCreateArgs>(args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorites.
     * @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteCreateManyArgs>(args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorites and returns the data saved in the database.
     * @param {FavoriteCreateManyAndReturnArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
     */
    delete<T extends FavoriteDeleteArgs>(args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteUpdateArgs>(args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteDeleteManyArgs>(args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteUpdateManyArgs>(args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites and returns the data updated in the database.
     * @param {FavoriteUpdateManyAndReturnArgs} args - Arguments to update many Favorites.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FavoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, FavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteUpsertArgs>(args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorite model
   */
  readonly fields: FavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favorite model
   */
  interface FavoriteFieldRefs {
    readonly id: FieldRef<"Favorite", 'Int'>
    readonly movieId: FieldRef<"Favorite", 'Int'>
    readonly ehSerie: FieldRef<"Favorite", 'Boolean'>
    readonly userId: FieldRef<"Favorite", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Favorite findUnique
   */
  export type FavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findFirst
   */
  export type FavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }

  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favorite createManyAndReturn
   */
  export type FavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
  }

  /**
   * Favorite updateManyAndReturn
   */
  export type FavoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }

  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to delete.
     */
    limit?: number
  }

  /**
   * Favorite without action
   */
  export type FavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    movieId: number | null
    userId: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    movieId: number | null
    userId: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    movieId: number | null
    ehSerie: boolean | null
    content: string | null
    edited: boolean | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    movieId: number | null
    ehSerie: boolean | null
    content: string | null
    edited: boolean | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    movieId: number
    ehSerie: number
    content: number
    edited: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    movieId?: true
    userId?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    movieId?: true
    userId?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    movieId?: true
    ehSerie?: true
    content?: true
    edited?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    movieId?: true
    ehSerie?: true
    content?: true
    edited?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    movieId?: true
    ehSerie?: true
    content?: true
    edited?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    movieId: number
    ehSerie: boolean
    content: string
    edited: boolean
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    content?: boolean
    edited?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | Comment$repliesArgs<ExtArgs>
    likes?: boolean | Comment$likesArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    content?: boolean
    edited?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    content?: boolean
    edited?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    movieId?: boolean
    ehSerie?: boolean
    content?: boolean
    edited?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "movieId" | "ehSerie" | "content" | "edited" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | Comment$repliesArgs<ExtArgs>
    likes?: boolean | Comment$likesArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      replies: Prisma.$ReplyPayload<ExtArgs>[]
      likes: Prisma.$CommentLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      movieId: number
      ehSerie: boolean
      content: string
      edited: boolean
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    replies<T extends Comment$repliesArgs<ExtArgs> = {}>(args?: Subset<T, Comment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Comment$likesArgs<ExtArgs> = {}>(args?: Subset<T, Comment$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly movieId: FieldRef<"Comment", 'Int'>
    readonly ehSerie: FieldRef<"Comment", 'Boolean'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly edited: FieldRef<"Comment", 'Boolean'>
    readonly userId: FieldRef<"Comment", 'Int'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment.replies
   */
  export type Comment$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    where?: ReplyWhereInput
    orderBy?: ReplyOrderByWithRelationInput | ReplyOrderByWithRelationInput[]
    cursor?: ReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReplyScalarFieldEnum | ReplyScalarFieldEnum[]
  }

  /**
   * Comment.likes
   */
  export type Comment$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    cursor?: CommentLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Reply
   */

  export type AggregateReply = {
    _count: ReplyCountAggregateOutputType | null
    _avg: ReplyAvgAggregateOutputType | null
    _sum: ReplySumAggregateOutputType | null
    _min: ReplyMinAggregateOutputType | null
    _max: ReplyMaxAggregateOutputType | null
  }

  export type ReplyAvgAggregateOutputType = {
    id: number | null
    commentId: number | null
    userId: number | null
  }

  export type ReplySumAggregateOutputType = {
    id: number | null
    commentId: number | null
    userId: number | null
  }

  export type ReplyMinAggregateOutputType = {
    id: number | null
    content: string | null
    edited: boolean | null
    commentId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReplyMaxAggregateOutputType = {
    id: number | null
    content: string | null
    edited: boolean | null
    commentId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReplyCountAggregateOutputType = {
    id: number
    content: number
    edited: number
    commentId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReplyAvgAggregateInputType = {
    id?: true
    commentId?: true
    userId?: true
  }

  export type ReplySumAggregateInputType = {
    id?: true
    commentId?: true
    userId?: true
  }

  export type ReplyMinAggregateInputType = {
    id?: true
    content?: true
    edited?: true
    commentId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReplyMaxAggregateInputType = {
    id?: true
    content?: true
    edited?: true
    commentId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReplyCountAggregateInputType = {
    id?: true
    content?: true
    edited?: true
    commentId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reply to aggregate.
     */
    where?: ReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Replies to fetch.
     */
    orderBy?: ReplyOrderByWithRelationInput | ReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Replies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Replies
    **/
    _count?: true | ReplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReplyMaxAggregateInputType
  }

  export type GetReplyAggregateType<T extends ReplyAggregateArgs> = {
        [P in keyof T & keyof AggregateReply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReply[P]>
      : GetScalarType<T[P], AggregateReply[P]>
  }




  export type ReplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReplyWhereInput
    orderBy?: ReplyOrderByWithAggregationInput | ReplyOrderByWithAggregationInput[]
    by: ReplyScalarFieldEnum[] | ReplyScalarFieldEnum
    having?: ReplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReplyCountAggregateInputType | true
    _avg?: ReplyAvgAggregateInputType
    _sum?: ReplySumAggregateInputType
    _min?: ReplyMinAggregateInputType
    _max?: ReplyMaxAggregateInputType
  }

  export type ReplyGroupByOutputType = {
    id: number
    content: string
    edited: boolean
    commentId: number
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: ReplyCountAggregateOutputType | null
    _avg: ReplyAvgAggregateOutputType | null
    _sum: ReplySumAggregateOutputType | null
    _min: ReplyMinAggregateOutputType | null
    _max: ReplyMaxAggregateOutputType | null
  }

  type GetReplyGroupByPayload<T extends ReplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReplyGroupByOutputType[P]>
            : GetScalarType<T[P], ReplyGroupByOutputType[P]>
        }
      >
    >


  export type ReplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    edited?: boolean
    commentId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | Reply$likesArgs<ExtArgs>
    _count?: boolean | ReplyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reply"]>

  export type ReplySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    edited?: boolean
    commentId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reply"]>

  export type ReplySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    edited?: boolean
    commentId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reply"]>

  export type ReplySelectScalar = {
    id?: boolean
    content?: boolean
    edited?: boolean
    commentId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReplyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "edited" | "commentId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["reply"]>
  export type ReplyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    likes?: boolean | Reply$likesArgs<ExtArgs>
    _count?: boolean | ReplyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReplyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReplyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reply"
    objects: {
      comment: Prisma.$CommentPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      likes: Prisma.$ReplyLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      edited: boolean
      commentId: number
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reply"]>
    composites: {}
  }

  type ReplyGetPayload<S extends boolean | null | undefined | ReplyDefaultArgs> = $Result.GetResult<Prisma.$ReplyPayload, S>

  type ReplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReplyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReplyCountAggregateInputType | true
    }

  export interface ReplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reply'], meta: { name: 'Reply' } }
    /**
     * Find zero or one Reply that matches the filter.
     * @param {ReplyFindUniqueArgs} args - Arguments to find a Reply
     * @example
     * // Get one Reply
     * const reply = await prisma.reply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReplyFindUniqueArgs>(args: SelectSubset<T, ReplyFindUniqueArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reply that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReplyFindUniqueOrThrowArgs} args - Arguments to find a Reply
     * @example
     * // Get one Reply
     * const reply = await prisma.reply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReplyFindUniqueOrThrowArgs>(args: SelectSubset<T, ReplyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyFindFirstArgs} args - Arguments to find a Reply
     * @example
     * // Get one Reply
     * const reply = await prisma.reply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReplyFindFirstArgs>(args?: SelectSubset<T, ReplyFindFirstArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyFindFirstOrThrowArgs} args - Arguments to find a Reply
     * @example
     * // Get one Reply
     * const reply = await prisma.reply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReplyFindFirstOrThrowArgs>(args?: SelectSubset<T, ReplyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Replies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Replies
     * const replies = await prisma.reply.findMany()
     * 
     * // Get first 10 Replies
     * const replies = await prisma.reply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const replyWithIdOnly = await prisma.reply.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReplyFindManyArgs>(args?: SelectSubset<T, ReplyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reply.
     * @param {ReplyCreateArgs} args - Arguments to create a Reply.
     * @example
     * // Create one Reply
     * const Reply = await prisma.reply.create({
     *   data: {
     *     // ... data to create a Reply
     *   }
     * })
     * 
     */
    create<T extends ReplyCreateArgs>(args: SelectSubset<T, ReplyCreateArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Replies.
     * @param {ReplyCreateManyArgs} args - Arguments to create many Replies.
     * @example
     * // Create many Replies
     * const reply = await prisma.reply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReplyCreateManyArgs>(args?: SelectSubset<T, ReplyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Replies and returns the data saved in the database.
     * @param {ReplyCreateManyAndReturnArgs} args - Arguments to create many Replies.
     * @example
     * // Create many Replies
     * const reply = await prisma.reply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Replies and only return the `id`
     * const replyWithIdOnly = await prisma.reply.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReplyCreateManyAndReturnArgs>(args?: SelectSubset<T, ReplyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reply.
     * @param {ReplyDeleteArgs} args - Arguments to delete one Reply.
     * @example
     * // Delete one Reply
     * const Reply = await prisma.reply.delete({
     *   where: {
     *     // ... filter to delete one Reply
     *   }
     * })
     * 
     */
    delete<T extends ReplyDeleteArgs>(args: SelectSubset<T, ReplyDeleteArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reply.
     * @param {ReplyUpdateArgs} args - Arguments to update one Reply.
     * @example
     * // Update one Reply
     * const reply = await prisma.reply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReplyUpdateArgs>(args: SelectSubset<T, ReplyUpdateArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Replies.
     * @param {ReplyDeleteManyArgs} args - Arguments to filter Replies to delete.
     * @example
     * // Delete a few Replies
     * const { count } = await prisma.reply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReplyDeleteManyArgs>(args?: SelectSubset<T, ReplyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Replies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Replies
     * const reply = await prisma.reply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReplyUpdateManyArgs>(args: SelectSubset<T, ReplyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Replies and returns the data updated in the database.
     * @param {ReplyUpdateManyAndReturnArgs} args - Arguments to update many Replies.
     * @example
     * // Update many Replies
     * const reply = await prisma.reply.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Replies and only return the `id`
     * const replyWithIdOnly = await prisma.reply.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReplyUpdateManyAndReturnArgs>(args: SelectSubset<T, ReplyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reply.
     * @param {ReplyUpsertArgs} args - Arguments to update or create a Reply.
     * @example
     * // Update or create a Reply
     * const reply = await prisma.reply.upsert({
     *   create: {
     *     // ... data to create a Reply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reply we want to update
     *   }
     * })
     */
    upsert<T extends ReplyUpsertArgs>(args: SelectSubset<T, ReplyUpsertArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Replies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyCountArgs} args - Arguments to filter Replies to count.
     * @example
     * // Count the number of Replies
     * const count = await prisma.reply.count({
     *   where: {
     *     // ... the filter for the Replies we want to count
     *   }
     * })
    **/
    count<T extends ReplyCountArgs>(
      args?: Subset<T, ReplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReplyAggregateArgs>(args: Subset<T, ReplyAggregateArgs>): Prisma.PrismaPromise<GetReplyAggregateType<T>>

    /**
     * Group by Reply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReplyGroupByArgs['orderBy'] }
        : { orderBy?: ReplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reply model
   */
  readonly fields: ReplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comment<T extends CommentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommentDefaultArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    likes<T extends Reply$likesArgs<ExtArgs> = {}>(args?: Subset<T, Reply$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reply model
   */
  interface ReplyFieldRefs {
    readonly id: FieldRef<"Reply", 'Int'>
    readonly content: FieldRef<"Reply", 'String'>
    readonly edited: FieldRef<"Reply", 'Boolean'>
    readonly commentId: FieldRef<"Reply", 'Int'>
    readonly userId: FieldRef<"Reply", 'Int'>
    readonly createdAt: FieldRef<"Reply", 'DateTime'>
    readonly updatedAt: FieldRef<"Reply", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reply findUnique
   */
  export type ReplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * Filter, which Reply to fetch.
     */
    where: ReplyWhereUniqueInput
  }

  /**
   * Reply findUniqueOrThrow
   */
  export type ReplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * Filter, which Reply to fetch.
     */
    where: ReplyWhereUniqueInput
  }

  /**
   * Reply findFirst
   */
  export type ReplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * Filter, which Reply to fetch.
     */
    where?: ReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Replies to fetch.
     */
    orderBy?: ReplyOrderByWithRelationInput | ReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Replies.
     */
    cursor?: ReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Replies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Replies.
     */
    distinct?: ReplyScalarFieldEnum | ReplyScalarFieldEnum[]
  }

  /**
   * Reply findFirstOrThrow
   */
  export type ReplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * Filter, which Reply to fetch.
     */
    where?: ReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Replies to fetch.
     */
    orderBy?: ReplyOrderByWithRelationInput | ReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Replies.
     */
    cursor?: ReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Replies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Replies.
     */
    distinct?: ReplyScalarFieldEnum | ReplyScalarFieldEnum[]
  }

  /**
   * Reply findMany
   */
  export type ReplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * Filter, which Replies to fetch.
     */
    where?: ReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Replies to fetch.
     */
    orderBy?: ReplyOrderByWithRelationInput | ReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Replies.
     */
    cursor?: ReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Replies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Replies.
     */
    distinct?: ReplyScalarFieldEnum | ReplyScalarFieldEnum[]
  }

  /**
   * Reply create
   */
  export type ReplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * The data needed to create a Reply.
     */
    data: XOR<ReplyCreateInput, ReplyUncheckedCreateInput>
  }

  /**
   * Reply createMany
   */
  export type ReplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Replies.
     */
    data: ReplyCreateManyInput | ReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reply createManyAndReturn
   */
  export type ReplyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * The data used to create many Replies.
     */
    data: ReplyCreateManyInput | ReplyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reply update
   */
  export type ReplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * The data needed to update a Reply.
     */
    data: XOR<ReplyUpdateInput, ReplyUncheckedUpdateInput>
    /**
     * Choose, which Reply to update.
     */
    where: ReplyWhereUniqueInput
  }

  /**
   * Reply updateMany
   */
  export type ReplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Replies.
     */
    data: XOR<ReplyUpdateManyMutationInput, ReplyUncheckedUpdateManyInput>
    /**
     * Filter which Replies to update
     */
    where?: ReplyWhereInput
    /**
     * Limit how many Replies to update.
     */
    limit?: number
  }

  /**
   * Reply updateManyAndReturn
   */
  export type ReplyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * The data used to update Replies.
     */
    data: XOR<ReplyUpdateManyMutationInput, ReplyUncheckedUpdateManyInput>
    /**
     * Filter which Replies to update
     */
    where?: ReplyWhereInput
    /**
     * Limit how many Replies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reply upsert
   */
  export type ReplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * The filter to search for the Reply to update in case it exists.
     */
    where: ReplyWhereUniqueInput
    /**
     * In case the Reply found by the `where` argument doesn't exist, create a new Reply with this data.
     */
    create: XOR<ReplyCreateInput, ReplyUncheckedCreateInput>
    /**
     * In case the Reply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReplyUpdateInput, ReplyUncheckedUpdateInput>
  }

  /**
   * Reply delete
   */
  export type ReplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
    /**
     * Filter which Reply to delete.
     */
    where: ReplyWhereUniqueInput
  }

  /**
   * Reply deleteMany
   */
  export type ReplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Replies to delete
     */
    where?: ReplyWhereInput
    /**
     * Limit how many Replies to delete.
     */
    limit?: number
  }

  /**
   * Reply.likes
   */
  export type Reply$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    where?: ReplyLikeWhereInput
    orderBy?: ReplyLikeOrderByWithRelationInput | ReplyLikeOrderByWithRelationInput[]
    cursor?: ReplyLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReplyLikeScalarFieldEnum | ReplyLikeScalarFieldEnum[]
  }

  /**
   * Reply without action
   */
  export type ReplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: ReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reply
     */
    omit?: ReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyInclude<ExtArgs> | null
  }


  /**
   * Model CommentLike
   */

  export type AggregateCommentLike = {
    _count: CommentLikeCountAggregateOutputType | null
    _avg: CommentLikeAvgAggregateOutputType | null
    _sum: CommentLikeSumAggregateOutputType | null
    _min: CommentLikeMinAggregateOutputType | null
    _max: CommentLikeMaxAggregateOutputType | null
  }

  export type CommentLikeAvgAggregateOutputType = {
    id: number | null
    commentId: number | null
    userId: number | null
  }

  export type CommentLikeSumAggregateOutputType = {
    id: number | null
    commentId: number | null
    userId: number | null
  }

  export type CommentLikeMinAggregateOutputType = {
    id: number | null
    commentId: number | null
    userId: number | null
  }

  export type CommentLikeMaxAggregateOutputType = {
    id: number | null
    commentId: number | null
    userId: number | null
  }

  export type CommentLikeCountAggregateOutputType = {
    id: number
    commentId: number
    userId: number
    _all: number
  }


  export type CommentLikeAvgAggregateInputType = {
    id?: true
    commentId?: true
    userId?: true
  }

  export type CommentLikeSumAggregateInputType = {
    id?: true
    commentId?: true
    userId?: true
  }

  export type CommentLikeMinAggregateInputType = {
    id?: true
    commentId?: true
    userId?: true
  }

  export type CommentLikeMaxAggregateInputType = {
    id?: true
    commentId?: true
    userId?: true
  }

  export type CommentLikeCountAggregateInputType = {
    id?: true
    commentId?: true
    userId?: true
    _all?: true
  }

  export type CommentLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentLike to aggregate.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommentLikes
    **/
    _count?: true | CommentLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentLikeMaxAggregateInputType
  }

  export type GetCommentLikeAggregateType<T extends CommentLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentLike[P]>
      : GetScalarType<T[P], AggregateCommentLike[P]>
  }




  export type CommentLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithAggregationInput | CommentLikeOrderByWithAggregationInput[]
    by: CommentLikeScalarFieldEnum[] | CommentLikeScalarFieldEnum
    having?: CommentLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentLikeCountAggregateInputType | true
    _avg?: CommentLikeAvgAggregateInputType
    _sum?: CommentLikeSumAggregateInputType
    _min?: CommentLikeMinAggregateInputType
    _max?: CommentLikeMaxAggregateInputType
  }

  export type CommentLikeGroupByOutputType = {
    id: number
    commentId: number
    userId: number
    _count: CommentLikeCountAggregateOutputType | null
    _avg: CommentLikeAvgAggregateOutputType | null
    _sum: CommentLikeSumAggregateOutputType | null
    _min: CommentLikeMinAggregateOutputType | null
    _max: CommentLikeMaxAggregateOutputType | null
  }

  type GetCommentLikeGroupByPayload<T extends CommentLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentLikeGroupByOutputType[P]>
            : GetScalarType<T[P], CommentLikeGroupByOutputType[P]>
        }
      >
    >


  export type CommentLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    userId?: boolean
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    userId?: boolean
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    userId?: boolean
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectScalar = {
    id?: boolean
    commentId?: boolean
    userId?: boolean
  }

  export type CommentLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "commentId" | "userId", ExtArgs["result"]["commentLike"]>
  export type CommentLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | CommentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommentLike"
    objects: {
      comment: Prisma.$CommentPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      commentId: number
      userId: number
    }, ExtArgs["result"]["commentLike"]>
    composites: {}
  }

  type CommentLikeGetPayload<S extends boolean | null | undefined | CommentLikeDefaultArgs> = $Result.GetResult<Prisma.$CommentLikePayload, S>

  type CommentLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentLikeCountAggregateInputType | true
    }

  export interface CommentLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommentLike'], meta: { name: 'CommentLike' } }
    /**
     * Find zero or one CommentLike that matches the filter.
     * @param {CommentLikeFindUniqueArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentLikeFindUniqueArgs>(args: SelectSubset<T, CommentLikeFindUniqueArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommentLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentLikeFindUniqueOrThrowArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindFirstArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentLikeFindFirstArgs>(args?: SelectSubset<T, CommentLikeFindFirstArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindFirstOrThrowArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommentLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommentLikes
     * const commentLikes = await prisma.commentLike.findMany()
     * 
     * // Get first 10 CommentLikes
     * const commentLikes = await prisma.commentLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentLikeWithIdOnly = await prisma.commentLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentLikeFindManyArgs>(args?: SelectSubset<T, CommentLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommentLike.
     * @param {CommentLikeCreateArgs} args - Arguments to create a CommentLike.
     * @example
     * // Create one CommentLike
     * const CommentLike = await prisma.commentLike.create({
     *   data: {
     *     // ... data to create a CommentLike
     *   }
     * })
     * 
     */
    create<T extends CommentLikeCreateArgs>(args: SelectSubset<T, CommentLikeCreateArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommentLikes.
     * @param {CommentLikeCreateManyArgs} args - Arguments to create many CommentLikes.
     * @example
     * // Create many CommentLikes
     * const commentLike = await prisma.commentLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentLikeCreateManyArgs>(args?: SelectSubset<T, CommentLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommentLikes and returns the data saved in the database.
     * @param {CommentLikeCreateManyAndReturnArgs} args - Arguments to create many CommentLikes.
     * @example
     * // Create many CommentLikes
     * const commentLike = await prisma.commentLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommentLikes and only return the `id`
     * const commentLikeWithIdOnly = await prisma.commentLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CommentLike.
     * @param {CommentLikeDeleteArgs} args - Arguments to delete one CommentLike.
     * @example
     * // Delete one CommentLike
     * const CommentLike = await prisma.commentLike.delete({
     *   where: {
     *     // ... filter to delete one CommentLike
     *   }
     * })
     * 
     */
    delete<T extends CommentLikeDeleteArgs>(args: SelectSubset<T, CommentLikeDeleteArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommentLike.
     * @param {CommentLikeUpdateArgs} args - Arguments to update one CommentLike.
     * @example
     * // Update one CommentLike
     * const commentLike = await prisma.commentLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentLikeUpdateArgs>(args: SelectSubset<T, CommentLikeUpdateArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommentLikes.
     * @param {CommentLikeDeleteManyArgs} args - Arguments to filter CommentLikes to delete.
     * @example
     * // Delete a few CommentLikes
     * const { count } = await prisma.commentLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentLikeDeleteManyArgs>(args?: SelectSubset<T, CommentLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommentLikes
     * const commentLike = await prisma.commentLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentLikeUpdateManyArgs>(args: SelectSubset<T, CommentLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentLikes and returns the data updated in the database.
     * @param {CommentLikeUpdateManyAndReturnArgs} args - Arguments to update many CommentLikes.
     * @example
     * // Update many CommentLikes
     * const commentLike = await prisma.commentLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommentLikes and only return the `id`
     * const commentLikeWithIdOnly = await prisma.commentLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CommentLike.
     * @param {CommentLikeUpsertArgs} args - Arguments to update or create a CommentLike.
     * @example
     * // Update or create a CommentLike
     * const commentLike = await prisma.commentLike.upsert({
     *   create: {
     *     // ... data to create a CommentLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommentLike we want to update
     *   }
     * })
     */
    upsert<T extends CommentLikeUpsertArgs>(args: SelectSubset<T, CommentLikeUpsertArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommentLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeCountArgs} args - Arguments to filter CommentLikes to count.
     * @example
     * // Count the number of CommentLikes
     * const count = await prisma.commentLike.count({
     *   where: {
     *     // ... the filter for the CommentLikes we want to count
     *   }
     * })
    **/
    count<T extends CommentLikeCountArgs>(
      args?: Subset<T, CommentLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommentLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentLikeAggregateArgs>(args: Subset<T, CommentLikeAggregateArgs>): Prisma.PrismaPromise<GetCommentLikeAggregateType<T>>

    /**
     * Group by CommentLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentLikeGroupByArgs['orderBy'] }
        : { orderBy?: CommentLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommentLike model
   */
  readonly fields: CommentLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommentLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comment<T extends CommentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommentDefaultArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommentLike model
   */
  interface CommentLikeFieldRefs {
    readonly id: FieldRef<"CommentLike", 'Int'>
    readonly commentId: FieldRef<"CommentLike", 'Int'>
    readonly userId: FieldRef<"CommentLike", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CommentLike findUnique
   */
  export type CommentLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike findUniqueOrThrow
   */
  export type CommentLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike findFirst
   */
  export type CommentLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentLikes.
     */
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike findFirstOrThrow
   */
  export type CommentLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentLikes.
     */
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike findMany
   */
  export type CommentLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLikes to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentLikes.
     */
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike create
   */
  export type CommentLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a CommentLike.
     */
    data: XOR<CommentLikeCreateInput, CommentLikeUncheckedCreateInput>
  }

  /**
   * CommentLike createMany
   */
  export type CommentLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommentLikes.
     */
    data: CommentLikeCreateManyInput | CommentLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommentLike createManyAndReturn
   */
  export type CommentLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * The data used to create many CommentLikes.
     */
    data: CommentLikeCreateManyInput | CommentLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommentLike update
   */
  export type CommentLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a CommentLike.
     */
    data: XOR<CommentLikeUpdateInput, CommentLikeUncheckedUpdateInput>
    /**
     * Choose, which CommentLike to update.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike updateMany
   */
  export type CommentLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommentLikes.
     */
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyInput>
    /**
     * Filter which CommentLikes to update
     */
    where?: CommentLikeWhereInput
    /**
     * Limit how many CommentLikes to update.
     */
    limit?: number
  }

  /**
   * CommentLike updateManyAndReturn
   */
  export type CommentLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * The data used to update CommentLikes.
     */
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyInput>
    /**
     * Filter which CommentLikes to update
     */
    where?: CommentLikeWhereInput
    /**
     * Limit how many CommentLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommentLike upsert
   */
  export type CommentLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the CommentLike to update in case it exists.
     */
    where: CommentLikeWhereUniqueInput
    /**
     * In case the CommentLike found by the `where` argument doesn't exist, create a new CommentLike with this data.
     */
    create: XOR<CommentLikeCreateInput, CommentLikeUncheckedCreateInput>
    /**
     * In case the CommentLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentLikeUpdateInput, CommentLikeUncheckedUpdateInput>
  }

  /**
   * CommentLike delete
   */
  export type CommentLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter which CommentLike to delete.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike deleteMany
   */
  export type CommentLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentLikes to delete
     */
    where?: CommentLikeWhereInput
    /**
     * Limit how many CommentLikes to delete.
     */
    limit?: number
  }

  /**
   * CommentLike without action
   */
  export type CommentLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
  }


  /**
   * Model ReplyLike
   */

  export type AggregateReplyLike = {
    _count: ReplyLikeCountAggregateOutputType | null
    _avg: ReplyLikeAvgAggregateOutputType | null
    _sum: ReplyLikeSumAggregateOutputType | null
    _min: ReplyLikeMinAggregateOutputType | null
    _max: ReplyLikeMaxAggregateOutputType | null
  }

  export type ReplyLikeAvgAggregateOutputType = {
    id: number | null
    replyId: number | null
    userId: number | null
  }

  export type ReplyLikeSumAggregateOutputType = {
    id: number | null
    replyId: number | null
    userId: number | null
  }

  export type ReplyLikeMinAggregateOutputType = {
    id: number | null
    replyId: number | null
    userId: number | null
  }

  export type ReplyLikeMaxAggregateOutputType = {
    id: number | null
    replyId: number | null
    userId: number | null
  }

  export type ReplyLikeCountAggregateOutputType = {
    id: number
    replyId: number
    userId: number
    _all: number
  }


  export type ReplyLikeAvgAggregateInputType = {
    id?: true
    replyId?: true
    userId?: true
  }

  export type ReplyLikeSumAggregateInputType = {
    id?: true
    replyId?: true
    userId?: true
  }

  export type ReplyLikeMinAggregateInputType = {
    id?: true
    replyId?: true
    userId?: true
  }

  export type ReplyLikeMaxAggregateInputType = {
    id?: true
    replyId?: true
    userId?: true
  }

  export type ReplyLikeCountAggregateInputType = {
    id?: true
    replyId?: true
    userId?: true
    _all?: true
  }

  export type ReplyLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReplyLike to aggregate.
     */
    where?: ReplyLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReplyLikes to fetch.
     */
    orderBy?: ReplyLikeOrderByWithRelationInput | ReplyLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReplyLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReplyLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReplyLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReplyLikes
    **/
    _count?: true | ReplyLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReplyLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReplyLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReplyLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReplyLikeMaxAggregateInputType
  }

  export type GetReplyLikeAggregateType<T extends ReplyLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateReplyLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReplyLike[P]>
      : GetScalarType<T[P], AggregateReplyLike[P]>
  }




  export type ReplyLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReplyLikeWhereInput
    orderBy?: ReplyLikeOrderByWithAggregationInput | ReplyLikeOrderByWithAggregationInput[]
    by: ReplyLikeScalarFieldEnum[] | ReplyLikeScalarFieldEnum
    having?: ReplyLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReplyLikeCountAggregateInputType | true
    _avg?: ReplyLikeAvgAggregateInputType
    _sum?: ReplyLikeSumAggregateInputType
    _min?: ReplyLikeMinAggregateInputType
    _max?: ReplyLikeMaxAggregateInputType
  }

  export type ReplyLikeGroupByOutputType = {
    id: number
    replyId: number
    userId: number
    _count: ReplyLikeCountAggregateOutputType | null
    _avg: ReplyLikeAvgAggregateOutputType | null
    _sum: ReplyLikeSumAggregateOutputType | null
    _min: ReplyLikeMinAggregateOutputType | null
    _max: ReplyLikeMaxAggregateOutputType | null
  }

  type GetReplyLikeGroupByPayload<T extends ReplyLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReplyLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReplyLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReplyLikeGroupByOutputType[P]>
            : GetScalarType<T[P], ReplyLikeGroupByOutputType[P]>
        }
      >
    >


  export type ReplyLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    replyId?: boolean
    userId?: boolean
    reply?: boolean | ReplyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["replyLike"]>

  export type ReplyLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    replyId?: boolean
    userId?: boolean
    reply?: boolean | ReplyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["replyLike"]>

  export type ReplyLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    replyId?: boolean
    userId?: boolean
    reply?: boolean | ReplyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["replyLike"]>

  export type ReplyLikeSelectScalar = {
    id?: boolean
    replyId?: boolean
    userId?: boolean
  }

  export type ReplyLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "replyId" | "userId", ExtArgs["result"]["replyLike"]>
  export type ReplyLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reply?: boolean | ReplyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReplyLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reply?: boolean | ReplyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReplyLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reply?: boolean | ReplyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReplyLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReplyLike"
    objects: {
      reply: Prisma.$ReplyPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      replyId: number
      userId: number
    }, ExtArgs["result"]["replyLike"]>
    composites: {}
  }

  type ReplyLikeGetPayload<S extends boolean | null | undefined | ReplyLikeDefaultArgs> = $Result.GetResult<Prisma.$ReplyLikePayload, S>

  type ReplyLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReplyLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReplyLikeCountAggregateInputType | true
    }

  export interface ReplyLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReplyLike'], meta: { name: 'ReplyLike' } }
    /**
     * Find zero or one ReplyLike that matches the filter.
     * @param {ReplyLikeFindUniqueArgs} args - Arguments to find a ReplyLike
     * @example
     * // Get one ReplyLike
     * const replyLike = await prisma.replyLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReplyLikeFindUniqueArgs>(args: SelectSubset<T, ReplyLikeFindUniqueArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReplyLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReplyLikeFindUniqueOrThrowArgs} args - Arguments to find a ReplyLike
     * @example
     * // Get one ReplyLike
     * const replyLike = await prisma.replyLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReplyLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, ReplyLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReplyLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyLikeFindFirstArgs} args - Arguments to find a ReplyLike
     * @example
     * // Get one ReplyLike
     * const replyLike = await prisma.replyLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReplyLikeFindFirstArgs>(args?: SelectSubset<T, ReplyLikeFindFirstArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReplyLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyLikeFindFirstOrThrowArgs} args - Arguments to find a ReplyLike
     * @example
     * // Get one ReplyLike
     * const replyLike = await prisma.replyLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReplyLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, ReplyLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReplyLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReplyLikes
     * const replyLikes = await prisma.replyLike.findMany()
     * 
     * // Get first 10 ReplyLikes
     * const replyLikes = await prisma.replyLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const replyLikeWithIdOnly = await prisma.replyLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReplyLikeFindManyArgs>(args?: SelectSubset<T, ReplyLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReplyLike.
     * @param {ReplyLikeCreateArgs} args - Arguments to create a ReplyLike.
     * @example
     * // Create one ReplyLike
     * const ReplyLike = await prisma.replyLike.create({
     *   data: {
     *     // ... data to create a ReplyLike
     *   }
     * })
     * 
     */
    create<T extends ReplyLikeCreateArgs>(args: SelectSubset<T, ReplyLikeCreateArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReplyLikes.
     * @param {ReplyLikeCreateManyArgs} args - Arguments to create many ReplyLikes.
     * @example
     * // Create many ReplyLikes
     * const replyLike = await prisma.replyLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReplyLikeCreateManyArgs>(args?: SelectSubset<T, ReplyLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReplyLikes and returns the data saved in the database.
     * @param {ReplyLikeCreateManyAndReturnArgs} args - Arguments to create many ReplyLikes.
     * @example
     * // Create many ReplyLikes
     * const replyLike = await prisma.replyLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReplyLikes and only return the `id`
     * const replyLikeWithIdOnly = await prisma.replyLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReplyLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, ReplyLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReplyLike.
     * @param {ReplyLikeDeleteArgs} args - Arguments to delete one ReplyLike.
     * @example
     * // Delete one ReplyLike
     * const ReplyLike = await prisma.replyLike.delete({
     *   where: {
     *     // ... filter to delete one ReplyLike
     *   }
     * })
     * 
     */
    delete<T extends ReplyLikeDeleteArgs>(args: SelectSubset<T, ReplyLikeDeleteArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReplyLike.
     * @param {ReplyLikeUpdateArgs} args - Arguments to update one ReplyLike.
     * @example
     * // Update one ReplyLike
     * const replyLike = await prisma.replyLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReplyLikeUpdateArgs>(args: SelectSubset<T, ReplyLikeUpdateArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReplyLikes.
     * @param {ReplyLikeDeleteManyArgs} args - Arguments to filter ReplyLikes to delete.
     * @example
     * // Delete a few ReplyLikes
     * const { count } = await prisma.replyLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReplyLikeDeleteManyArgs>(args?: SelectSubset<T, ReplyLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReplyLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReplyLikes
     * const replyLike = await prisma.replyLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReplyLikeUpdateManyArgs>(args: SelectSubset<T, ReplyLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReplyLikes and returns the data updated in the database.
     * @param {ReplyLikeUpdateManyAndReturnArgs} args - Arguments to update many ReplyLikes.
     * @example
     * // Update many ReplyLikes
     * const replyLike = await prisma.replyLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReplyLikes and only return the `id`
     * const replyLikeWithIdOnly = await prisma.replyLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReplyLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, ReplyLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReplyLike.
     * @param {ReplyLikeUpsertArgs} args - Arguments to update or create a ReplyLike.
     * @example
     * // Update or create a ReplyLike
     * const replyLike = await prisma.replyLike.upsert({
     *   create: {
     *     // ... data to create a ReplyLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReplyLike we want to update
     *   }
     * })
     */
    upsert<T extends ReplyLikeUpsertArgs>(args: SelectSubset<T, ReplyLikeUpsertArgs<ExtArgs>>): Prisma__ReplyLikeClient<$Result.GetResult<Prisma.$ReplyLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReplyLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyLikeCountArgs} args - Arguments to filter ReplyLikes to count.
     * @example
     * // Count the number of ReplyLikes
     * const count = await prisma.replyLike.count({
     *   where: {
     *     // ... the filter for the ReplyLikes we want to count
     *   }
     * })
    **/
    count<T extends ReplyLikeCountArgs>(
      args?: Subset<T, ReplyLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReplyLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReplyLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReplyLikeAggregateArgs>(args: Subset<T, ReplyLikeAggregateArgs>): Prisma.PrismaPromise<GetReplyLikeAggregateType<T>>

    /**
     * Group by ReplyLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReplyLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReplyLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReplyLikeGroupByArgs['orderBy'] }
        : { orderBy?: ReplyLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReplyLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReplyLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReplyLike model
   */
  readonly fields: ReplyLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReplyLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReplyLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reply<T extends ReplyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReplyDefaultArgs<ExtArgs>>): Prisma__ReplyClient<$Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReplyLike model
   */
  interface ReplyLikeFieldRefs {
    readonly id: FieldRef<"ReplyLike", 'Int'>
    readonly replyId: FieldRef<"ReplyLike", 'Int'>
    readonly userId: FieldRef<"ReplyLike", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ReplyLike findUnique
   */
  export type ReplyLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * Filter, which ReplyLike to fetch.
     */
    where: ReplyLikeWhereUniqueInput
  }

  /**
   * ReplyLike findUniqueOrThrow
   */
  export type ReplyLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * Filter, which ReplyLike to fetch.
     */
    where: ReplyLikeWhereUniqueInput
  }

  /**
   * ReplyLike findFirst
   */
  export type ReplyLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * Filter, which ReplyLike to fetch.
     */
    where?: ReplyLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReplyLikes to fetch.
     */
    orderBy?: ReplyLikeOrderByWithRelationInput | ReplyLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReplyLikes.
     */
    cursor?: ReplyLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReplyLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReplyLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReplyLikes.
     */
    distinct?: ReplyLikeScalarFieldEnum | ReplyLikeScalarFieldEnum[]
  }

  /**
   * ReplyLike findFirstOrThrow
   */
  export type ReplyLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * Filter, which ReplyLike to fetch.
     */
    where?: ReplyLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReplyLikes to fetch.
     */
    orderBy?: ReplyLikeOrderByWithRelationInput | ReplyLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReplyLikes.
     */
    cursor?: ReplyLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReplyLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReplyLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReplyLikes.
     */
    distinct?: ReplyLikeScalarFieldEnum | ReplyLikeScalarFieldEnum[]
  }

  /**
   * ReplyLike findMany
   */
  export type ReplyLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * Filter, which ReplyLikes to fetch.
     */
    where?: ReplyLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReplyLikes to fetch.
     */
    orderBy?: ReplyLikeOrderByWithRelationInput | ReplyLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReplyLikes.
     */
    cursor?: ReplyLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReplyLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReplyLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReplyLikes.
     */
    distinct?: ReplyLikeScalarFieldEnum | ReplyLikeScalarFieldEnum[]
  }

  /**
   * ReplyLike create
   */
  export type ReplyLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a ReplyLike.
     */
    data: XOR<ReplyLikeCreateInput, ReplyLikeUncheckedCreateInput>
  }

  /**
   * ReplyLike createMany
   */
  export type ReplyLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReplyLikes.
     */
    data: ReplyLikeCreateManyInput | ReplyLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReplyLike createManyAndReturn
   */
  export type ReplyLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * The data used to create many ReplyLikes.
     */
    data: ReplyLikeCreateManyInput | ReplyLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReplyLike update
   */
  export type ReplyLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a ReplyLike.
     */
    data: XOR<ReplyLikeUpdateInput, ReplyLikeUncheckedUpdateInput>
    /**
     * Choose, which ReplyLike to update.
     */
    where: ReplyLikeWhereUniqueInput
  }

  /**
   * ReplyLike updateMany
   */
  export type ReplyLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReplyLikes.
     */
    data: XOR<ReplyLikeUpdateManyMutationInput, ReplyLikeUncheckedUpdateManyInput>
    /**
     * Filter which ReplyLikes to update
     */
    where?: ReplyLikeWhereInput
    /**
     * Limit how many ReplyLikes to update.
     */
    limit?: number
  }

  /**
   * ReplyLike updateManyAndReturn
   */
  export type ReplyLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * The data used to update ReplyLikes.
     */
    data: XOR<ReplyLikeUpdateManyMutationInput, ReplyLikeUncheckedUpdateManyInput>
    /**
     * Filter which ReplyLikes to update
     */
    where?: ReplyLikeWhereInput
    /**
     * Limit how many ReplyLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReplyLike upsert
   */
  export type ReplyLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the ReplyLike to update in case it exists.
     */
    where: ReplyLikeWhereUniqueInput
    /**
     * In case the ReplyLike found by the `where` argument doesn't exist, create a new ReplyLike with this data.
     */
    create: XOR<ReplyLikeCreateInput, ReplyLikeUncheckedCreateInput>
    /**
     * In case the ReplyLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReplyLikeUpdateInput, ReplyLikeUncheckedUpdateInput>
  }

  /**
   * ReplyLike delete
   */
  export type ReplyLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
    /**
     * Filter which ReplyLike to delete.
     */
    where: ReplyLikeWhereUniqueInput
  }

  /**
   * ReplyLike deleteMany
   */
  export type ReplyLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReplyLikes to delete
     */
    where?: ReplyLikeWhereInput
    /**
     * Limit how many ReplyLikes to delete.
     */
    limit?: number
  }

  /**
   * ReplyLike without action
   */
  export type ReplyLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReplyLike
     */
    select?: ReplyLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReplyLike
     */
    omit?: ReplyLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReplyLikeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    id: 'id',
    movieId: 'movieId',
    ehSerie: 'ehSerie',
    userId: 'userId'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    movieId: 'movieId',
    ehSerie: 'ehSerie',
    content: 'content',
    edited: 'edited',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ReplyScalarFieldEnum: {
    id: 'id',
    content: 'content',
    edited: 'edited',
    commentId: 'commentId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReplyScalarFieldEnum = (typeof ReplyScalarFieldEnum)[keyof typeof ReplyScalarFieldEnum]


  export const CommentLikeScalarFieldEnum: {
    id: 'id',
    commentId: 'commentId',
    userId: 'userId'
  };

  export type CommentLikeScalarFieldEnum = (typeof CommentLikeScalarFieldEnum)[keyof typeof CommentLikeScalarFieldEnum]


  export const ReplyLikeScalarFieldEnum: {
    id: 'id',
    replyId: 'replyId',
    userId: 'userId'
  };

  export type ReplyLikeScalarFieldEnum = (typeof ReplyLikeScalarFieldEnum)[keyof typeof ReplyLikeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    favorites?: FavoriteListRelationFilter
    comments?: CommentListRelationFilter
    replies?: ReplyListRelationFilter
    commentLikes?: CommentLikeListRelationFilter
    replyLikes?: ReplyLikeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    favorites?: FavoriteOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    replies?: ReplyOrderByRelationAggregateInput
    commentLikes?: CommentLikeOrderByRelationAggregateInput
    replyLikes?: ReplyLikeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    favorites?: FavoriteListRelationFilter
    comments?: CommentListRelationFilter
    replies?: ReplyListRelationFilter
    commentLikes?: CommentLikeListRelationFilter
    replyLikes?: ReplyLikeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FavoriteWhereInput = {
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    id?: IntFilter<"Favorite"> | number
    movieId?: IntFilter<"Favorite"> | number
    ehSerie?: BoolFilter<"Favorite"> | boolean
    userId?: IntFilter<"Favorite"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FavoriteOrderByWithRelationInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_movieId?: FavoriteUserIdMovieIdCompoundUniqueInput
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    movieId?: IntFilter<"Favorite"> | number
    ehSerie?: BoolFilter<"Favorite"> | boolean
    userId?: IntFilter<"Favorite"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_movieId">

  export type FavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    userId?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _avg?: FavoriteAvgOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
    _sum?: FavoriteSumOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    OR?: FavoriteScalarWhereWithAggregatesInput[]
    NOT?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Favorite"> | number
    movieId?: IntWithAggregatesFilter<"Favorite"> | number
    ehSerie?: BoolWithAggregatesFilter<"Favorite"> | boolean
    userId?: IntWithAggregatesFilter<"Favorite"> | number
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    movieId?: IntFilter<"Comment"> | number
    ehSerie?: BoolFilter<"Comment"> | boolean
    content?: StringFilter<"Comment"> | string
    edited?: BoolFilter<"Comment"> | boolean
    userId?: IntFilter<"Comment"> | number
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    replies?: ReplyListRelationFilter
    likes?: CommentLikeListRelationFilter
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    replies?: ReplyOrderByRelationAggregateInput
    likes?: CommentLikeOrderByRelationAggregateInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    movieId?: IntFilter<"Comment"> | number
    ehSerie?: BoolFilter<"Comment"> | boolean
    content?: StringFilter<"Comment"> | string
    edited?: BoolFilter<"Comment"> | boolean
    userId?: IntFilter<"Comment"> | number
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    replies?: ReplyListRelationFilter
    likes?: CommentLikeListRelationFilter
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    movieId?: IntWithAggregatesFilter<"Comment"> | number
    ehSerie?: BoolWithAggregatesFilter<"Comment"> | boolean
    content?: StringWithAggregatesFilter<"Comment"> | string
    edited?: BoolWithAggregatesFilter<"Comment"> | boolean
    userId?: IntWithAggregatesFilter<"Comment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type ReplyWhereInput = {
    AND?: ReplyWhereInput | ReplyWhereInput[]
    OR?: ReplyWhereInput[]
    NOT?: ReplyWhereInput | ReplyWhereInput[]
    id?: IntFilter<"Reply"> | number
    content?: StringFilter<"Reply"> | string
    edited?: BoolFilter<"Reply"> | boolean
    commentId?: IntFilter<"Reply"> | number
    userId?: IntFilter<"Reply"> | number
    createdAt?: DateTimeFilter<"Reply"> | Date | string
    updatedAt?: DateTimeFilter<"Reply"> | Date | string
    comment?: XOR<CommentScalarRelationFilter, CommentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: ReplyLikeListRelationFilter
  }

  export type ReplyOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    comment?: CommentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    likes?: ReplyLikeOrderByRelationAggregateInput
  }

  export type ReplyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReplyWhereInput | ReplyWhereInput[]
    OR?: ReplyWhereInput[]
    NOT?: ReplyWhereInput | ReplyWhereInput[]
    content?: StringFilter<"Reply"> | string
    edited?: BoolFilter<"Reply"> | boolean
    commentId?: IntFilter<"Reply"> | number
    userId?: IntFilter<"Reply"> | number
    createdAt?: DateTimeFilter<"Reply"> | Date | string
    updatedAt?: DateTimeFilter<"Reply"> | Date | string
    comment?: XOR<CommentScalarRelationFilter, CommentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    likes?: ReplyLikeListRelationFilter
  }, "id">

  export type ReplyOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReplyCountOrderByAggregateInput
    _avg?: ReplyAvgOrderByAggregateInput
    _max?: ReplyMaxOrderByAggregateInput
    _min?: ReplyMinOrderByAggregateInput
    _sum?: ReplySumOrderByAggregateInput
  }

  export type ReplyScalarWhereWithAggregatesInput = {
    AND?: ReplyScalarWhereWithAggregatesInput | ReplyScalarWhereWithAggregatesInput[]
    OR?: ReplyScalarWhereWithAggregatesInput[]
    NOT?: ReplyScalarWhereWithAggregatesInput | ReplyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Reply"> | number
    content?: StringWithAggregatesFilter<"Reply"> | string
    edited?: BoolWithAggregatesFilter<"Reply"> | boolean
    commentId?: IntWithAggregatesFilter<"Reply"> | number
    userId?: IntWithAggregatesFilter<"Reply"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Reply"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reply"> | Date | string
  }

  export type CommentLikeWhereInput = {
    AND?: CommentLikeWhereInput | CommentLikeWhereInput[]
    OR?: CommentLikeWhereInput[]
    NOT?: CommentLikeWhereInput | CommentLikeWhereInput[]
    id?: IntFilter<"CommentLike"> | number
    commentId?: IntFilter<"CommentLike"> | number
    userId?: IntFilter<"CommentLike"> | number
    comment?: XOR<CommentScalarRelationFilter, CommentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentLikeOrderByWithRelationInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
    comment?: CommentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CommentLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    commentId_userId?: CommentLikeCommentIdUserIdCompoundUniqueInput
    AND?: CommentLikeWhereInput | CommentLikeWhereInput[]
    OR?: CommentLikeWhereInput[]
    NOT?: CommentLikeWhereInput | CommentLikeWhereInput[]
    commentId?: IntFilter<"CommentLike"> | number
    userId?: IntFilter<"CommentLike"> | number
    comment?: XOR<CommentScalarRelationFilter, CommentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "commentId_userId">

  export type CommentLikeOrderByWithAggregationInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
    _count?: CommentLikeCountOrderByAggregateInput
    _avg?: CommentLikeAvgOrderByAggregateInput
    _max?: CommentLikeMaxOrderByAggregateInput
    _min?: CommentLikeMinOrderByAggregateInput
    _sum?: CommentLikeSumOrderByAggregateInput
  }

  export type CommentLikeScalarWhereWithAggregatesInput = {
    AND?: CommentLikeScalarWhereWithAggregatesInput | CommentLikeScalarWhereWithAggregatesInput[]
    OR?: CommentLikeScalarWhereWithAggregatesInput[]
    NOT?: CommentLikeScalarWhereWithAggregatesInput | CommentLikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CommentLike"> | number
    commentId?: IntWithAggregatesFilter<"CommentLike"> | number
    userId?: IntWithAggregatesFilter<"CommentLike"> | number
  }

  export type ReplyLikeWhereInput = {
    AND?: ReplyLikeWhereInput | ReplyLikeWhereInput[]
    OR?: ReplyLikeWhereInput[]
    NOT?: ReplyLikeWhereInput | ReplyLikeWhereInput[]
    id?: IntFilter<"ReplyLike"> | number
    replyId?: IntFilter<"ReplyLike"> | number
    userId?: IntFilter<"ReplyLike"> | number
    reply?: XOR<ReplyScalarRelationFilter, ReplyWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReplyLikeOrderByWithRelationInput = {
    id?: SortOrder
    replyId?: SortOrder
    userId?: SortOrder
    reply?: ReplyOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReplyLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    replyId_userId?: ReplyLikeReplyIdUserIdCompoundUniqueInput
    AND?: ReplyLikeWhereInput | ReplyLikeWhereInput[]
    OR?: ReplyLikeWhereInput[]
    NOT?: ReplyLikeWhereInput | ReplyLikeWhereInput[]
    replyId?: IntFilter<"ReplyLike"> | number
    userId?: IntFilter<"ReplyLike"> | number
    reply?: XOR<ReplyScalarRelationFilter, ReplyWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "replyId_userId">

  export type ReplyLikeOrderByWithAggregationInput = {
    id?: SortOrder
    replyId?: SortOrder
    userId?: SortOrder
    _count?: ReplyLikeCountOrderByAggregateInput
    _avg?: ReplyLikeAvgOrderByAggregateInput
    _max?: ReplyLikeMaxOrderByAggregateInput
    _min?: ReplyLikeMinOrderByAggregateInput
    _sum?: ReplyLikeSumOrderByAggregateInput
  }

  export type ReplyLikeScalarWhereWithAggregatesInput = {
    AND?: ReplyLikeScalarWhereWithAggregatesInput | ReplyLikeScalarWhereWithAggregatesInput[]
    OR?: ReplyLikeScalarWhereWithAggregatesInput[]
    NOT?: ReplyLikeScalarWhereWithAggregatesInput | ReplyLikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ReplyLike"> | number
    replyId?: IntWithAggregatesFilter<"ReplyLike"> | number
    userId?: IntWithAggregatesFilter<"ReplyLike"> | number
  }

  export type UserCreateInput = {
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    replies?: ReplyCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    replies?: ReplyUncheckedCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    replies?: ReplyUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    replies?: ReplyUncheckedUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateInput = {
    movieId: number
    ehSerie?: boolean
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    userId: number
  }

  export type FavoriteUpdateInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type FavoriteCreateManyInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    userId: number
  }

  export type FavoriteUpdateManyMutationInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FavoriteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateInput = {
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
    replies?: ReplyCreateNestedManyWithoutCommentInput
    likes?: CommentLikeCreateNestedManyWithoutCommentInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ReplyUncheckedCreateNestedManyWithoutCommentInput
    likes?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
  }

  export type CommentUpdateInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    replies?: ReplyUpdateManyWithoutCommentNestedInput
    likes?: CommentLikeUpdateManyWithoutCommentNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ReplyUncheckedUpdateManyWithoutCommentNestedInput
    likes?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type CommentCreateManyInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReplyCreateInput = {
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    comment: CommentCreateNestedOneWithoutRepliesInput
    user: UserCreateNestedOneWithoutRepliesInput
    likes?: ReplyLikeCreateNestedManyWithoutReplyInput
  }

  export type ReplyUncheckedCreateInput = {
    id?: number
    content: string
    edited?: boolean
    commentId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: ReplyLikeUncheckedCreateNestedManyWithoutReplyInput
  }

  export type ReplyUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: CommentUpdateOneRequiredWithoutRepliesNestedInput
    user?: UserUpdateOneRequiredWithoutRepliesNestedInput
    likes?: ReplyLikeUpdateManyWithoutReplyNestedInput
  }

  export type ReplyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    commentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: ReplyLikeUncheckedUpdateManyWithoutReplyNestedInput
  }

  export type ReplyCreateManyInput = {
    id?: number
    content: string
    edited?: boolean
    commentId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReplyUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReplyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    commentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeCreateInput = {
    comment: CommentCreateNestedOneWithoutLikesInput
    user: UserCreateNestedOneWithoutCommentLikesInput
  }

  export type CommentLikeUncheckedCreateInput = {
    id?: number
    commentId: number
    userId: number
  }

  export type CommentLikeUpdateInput = {
    comment?: CommentUpdateOneRequiredWithoutLikesNestedInput
    user?: UserUpdateOneRequiredWithoutCommentLikesNestedInput
  }

  export type CommentLikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentLikeCreateManyInput = {
    id?: number
    commentId: number
    userId: number
  }

  export type CommentLikeUpdateManyMutationInput = {

  }

  export type CommentLikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReplyLikeCreateInput = {
    reply: ReplyCreateNestedOneWithoutLikesInput
    user: UserCreateNestedOneWithoutReplyLikesInput
  }

  export type ReplyLikeUncheckedCreateInput = {
    id?: number
    replyId: number
    userId: number
  }

  export type ReplyLikeUpdateInput = {
    reply?: ReplyUpdateOneRequiredWithoutLikesNestedInput
    user?: UserUpdateOneRequiredWithoutReplyLikesNestedInput
  }

  export type ReplyLikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    replyId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReplyLikeCreateManyInput = {
    id?: number
    replyId: number
    userId: number
  }

  export type ReplyLikeUpdateManyMutationInput = {

  }

  export type ReplyLikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    replyId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type ReplyListRelationFilter = {
    every?: ReplyWhereInput
    some?: ReplyWhereInput
    none?: ReplyWhereInput
  }

  export type CommentLikeListRelationFilter = {
    every?: CommentLikeWhereInput
    some?: CommentLikeWhereInput
    none?: CommentLikeWhereInput
  }

  export type ReplyLikeListRelationFilter = {
    every?: ReplyLikeWhereInput
    some?: ReplyLikeWhereInput
    none?: ReplyLikeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReplyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReplyLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FavoriteUserIdMovieIdCompoundUniqueInput = {
    userId: number
    movieId: number
  }

  export type FavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    userId?: SortOrder
  }

  export type FavoriteAvgOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    userId?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    userId?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    userId?: SortOrder
  }

  export type FavoriteSumOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    userId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    ehSerie?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
    userId?: SortOrder
  }

  export type CommentScalarRelationFilter = {
    is?: CommentWhereInput
    isNot?: CommentWhereInput
  }

  export type ReplyCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReplyAvgOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
  }

  export type ReplyMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReplyMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    edited?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReplySumOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
  }

  export type CommentLikeCommentIdUserIdCompoundUniqueInput = {
    commentId: number
    userId: number
  }

  export type CommentLikeCountOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
  }

  export type CommentLikeAvgOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
  }

  export type CommentLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
  }

  export type CommentLikeMinOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
  }

  export type CommentLikeSumOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    userId?: SortOrder
  }

  export type ReplyScalarRelationFilter = {
    is?: ReplyWhereInput
    isNot?: ReplyWhereInput
  }

  export type ReplyLikeReplyIdUserIdCompoundUniqueInput = {
    replyId: number
    userId: number
  }

  export type ReplyLikeCountOrderByAggregateInput = {
    id?: SortOrder
    replyId?: SortOrder
    userId?: SortOrder
  }

  export type ReplyLikeAvgOrderByAggregateInput = {
    id?: SortOrder
    replyId?: SortOrder
    userId?: SortOrder
  }

  export type ReplyLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    replyId?: SortOrder
    userId?: SortOrder
  }

  export type ReplyLikeMinOrderByAggregateInput = {
    id?: SortOrder
    replyId?: SortOrder
    userId?: SortOrder
  }

  export type ReplyLikeSumOrderByAggregateInput = {
    id?: SortOrder
    replyId?: SortOrder
    userId?: SortOrder
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ReplyCreateNestedManyWithoutUserInput = {
    create?: XOR<ReplyCreateWithoutUserInput, ReplyUncheckedCreateWithoutUserInput> | ReplyCreateWithoutUserInput[] | ReplyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutUserInput | ReplyCreateOrConnectWithoutUserInput[]
    createMany?: ReplyCreateManyUserInputEnvelope
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
  }

  export type CommentLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type ReplyLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<ReplyLikeCreateWithoutUserInput, ReplyLikeUncheckedCreateWithoutUserInput> | ReplyLikeCreateWithoutUserInput[] | ReplyLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutUserInput | ReplyLikeCreateOrConnectWithoutUserInput[]
    createMany?: ReplyLikeCreateManyUserInputEnvelope
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ReplyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReplyCreateWithoutUserInput, ReplyUncheckedCreateWithoutUserInput> | ReplyCreateWithoutUserInput[] | ReplyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutUserInput | ReplyCreateOrConnectWithoutUserInput[]
    createMany?: ReplyCreateManyUserInputEnvelope
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
  }

  export type CommentLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type ReplyLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReplyLikeCreateWithoutUserInput, ReplyLikeUncheckedCreateWithoutUserInput> | ReplyLikeCreateWithoutUserInput[] | ReplyLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutUserInput | ReplyLikeCreateOrConnectWithoutUserInput[]
    createMany?: ReplyLikeCreateManyUserInputEnvelope
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ReplyUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReplyCreateWithoutUserInput, ReplyUncheckedCreateWithoutUserInput> | ReplyCreateWithoutUserInput[] | ReplyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutUserInput | ReplyCreateOrConnectWithoutUserInput[]
    upsert?: ReplyUpsertWithWhereUniqueWithoutUserInput | ReplyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReplyCreateManyUserInputEnvelope
    set?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    disconnect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    delete?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    update?: ReplyUpdateWithWhereUniqueWithoutUserInput | ReplyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReplyUpdateManyWithWhereWithoutUserInput | ReplyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReplyScalarWhereInput | ReplyScalarWhereInput[]
  }

  export type CommentLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutUserInput | CommentLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutUserInput | CommentLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutUserInput | CommentLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type ReplyLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReplyLikeCreateWithoutUserInput, ReplyLikeUncheckedCreateWithoutUserInput> | ReplyLikeCreateWithoutUserInput[] | ReplyLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutUserInput | ReplyLikeCreateOrConnectWithoutUserInput[]
    upsert?: ReplyLikeUpsertWithWhereUniqueWithoutUserInput | ReplyLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReplyLikeCreateManyUserInputEnvelope
    set?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    disconnect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    delete?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    update?: ReplyLikeUpdateWithWhereUniqueWithoutUserInput | ReplyLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReplyLikeUpdateManyWithWhereWithoutUserInput | ReplyLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReplyLikeScalarWhereInput | ReplyLikeScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ReplyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReplyCreateWithoutUserInput, ReplyUncheckedCreateWithoutUserInput> | ReplyCreateWithoutUserInput[] | ReplyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutUserInput | ReplyCreateOrConnectWithoutUserInput[]
    upsert?: ReplyUpsertWithWhereUniqueWithoutUserInput | ReplyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReplyCreateManyUserInputEnvelope
    set?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    disconnect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    delete?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    update?: ReplyUpdateWithWhereUniqueWithoutUserInput | ReplyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReplyUpdateManyWithWhereWithoutUserInput | ReplyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReplyScalarWhereInput | ReplyScalarWhereInput[]
  }

  export type CommentLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutUserInput | CommentLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutUserInput | CommentLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutUserInput | CommentLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type ReplyLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReplyLikeCreateWithoutUserInput, ReplyLikeUncheckedCreateWithoutUserInput> | ReplyLikeCreateWithoutUserInput[] | ReplyLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutUserInput | ReplyLikeCreateOrConnectWithoutUserInput[]
    upsert?: ReplyLikeUpsertWithWhereUniqueWithoutUserInput | ReplyLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReplyLikeCreateManyUserInputEnvelope
    set?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    disconnect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    delete?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    update?: ReplyLikeUpdateWithWhereUniqueWithoutUserInput | ReplyLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReplyLikeUpdateManyWithWhereWithoutUserInput | ReplyLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReplyLikeScalarWhereInput | ReplyLikeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type ReplyCreateNestedManyWithoutCommentInput = {
    create?: XOR<ReplyCreateWithoutCommentInput, ReplyUncheckedCreateWithoutCommentInput> | ReplyCreateWithoutCommentInput[] | ReplyUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutCommentInput | ReplyCreateOrConnectWithoutCommentInput[]
    createMany?: ReplyCreateManyCommentInputEnvelope
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
  }

  export type CommentLikeCreateNestedManyWithoutCommentInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type ReplyUncheckedCreateNestedManyWithoutCommentInput = {
    create?: XOR<ReplyCreateWithoutCommentInput, ReplyUncheckedCreateWithoutCommentInput> | ReplyCreateWithoutCommentInput[] | ReplyUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutCommentInput | ReplyCreateOrConnectWithoutCommentInput[]
    createMany?: ReplyCreateManyCommentInputEnvelope
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
  }

  export type CommentLikeUncheckedCreateNestedManyWithoutCommentInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type ReplyUpdateManyWithoutCommentNestedInput = {
    create?: XOR<ReplyCreateWithoutCommentInput, ReplyUncheckedCreateWithoutCommentInput> | ReplyCreateWithoutCommentInput[] | ReplyUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutCommentInput | ReplyCreateOrConnectWithoutCommentInput[]
    upsert?: ReplyUpsertWithWhereUniqueWithoutCommentInput | ReplyUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: ReplyCreateManyCommentInputEnvelope
    set?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    disconnect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    delete?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    update?: ReplyUpdateWithWhereUniqueWithoutCommentInput | ReplyUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: ReplyUpdateManyWithWhereWithoutCommentInput | ReplyUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: ReplyScalarWhereInput | ReplyScalarWhereInput[]
  }

  export type CommentLikeUpdateManyWithoutCommentNestedInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutCommentInput | CommentLikeUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutCommentInput | CommentLikeUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutCommentInput | CommentLikeUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type ReplyUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: XOR<ReplyCreateWithoutCommentInput, ReplyUncheckedCreateWithoutCommentInput> | ReplyCreateWithoutCommentInput[] | ReplyUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: ReplyCreateOrConnectWithoutCommentInput | ReplyCreateOrConnectWithoutCommentInput[]
    upsert?: ReplyUpsertWithWhereUniqueWithoutCommentInput | ReplyUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: ReplyCreateManyCommentInputEnvelope
    set?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    disconnect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    delete?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    connect?: ReplyWhereUniqueInput | ReplyWhereUniqueInput[]
    update?: ReplyUpdateWithWhereUniqueWithoutCommentInput | ReplyUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: ReplyUpdateManyWithWhereWithoutCommentInput | ReplyUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: ReplyScalarWhereInput | ReplyScalarWhereInput[]
  }

  export type CommentLikeUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutCommentInput | CommentLikeUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutCommentInput | CommentLikeUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutCommentInput | CommentLikeUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type CommentCreateNestedOneWithoutRepliesInput = {
    create?: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: CommentCreateOrConnectWithoutRepliesInput
    connect?: CommentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRepliesInput = {
    create?: XOR<UserCreateWithoutRepliesInput, UserUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRepliesInput
    connect?: UserWhereUniqueInput
  }

  export type ReplyLikeCreateNestedManyWithoutReplyInput = {
    create?: XOR<ReplyLikeCreateWithoutReplyInput, ReplyLikeUncheckedCreateWithoutReplyInput> | ReplyLikeCreateWithoutReplyInput[] | ReplyLikeUncheckedCreateWithoutReplyInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutReplyInput | ReplyLikeCreateOrConnectWithoutReplyInput[]
    createMany?: ReplyLikeCreateManyReplyInputEnvelope
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
  }

  export type ReplyLikeUncheckedCreateNestedManyWithoutReplyInput = {
    create?: XOR<ReplyLikeCreateWithoutReplyInput, ReplyLikeUncheckedCreateWithoutReplyInput> | ReplyLikeCreateWithoutReplyInput[] | ReplyLikeUncheckedCreateWithoutReplyInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutReplyInput | ReplyLikeCreateOrConnectWithoutReplyInput[]
    createMany?: ReplyLikeCreateManyReplyInputEnvelope
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
  }

  export type CommentUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: CommentCreateOrConnectWithoutRepliesInput
    upsert?: CommentUpsertWithoutRepliesInput
    connect?: CommentWhereUniqueInput
    update?: XOR<XOR<CommentUpdateToOneWithWhereWithoutRepliesInput, CommentUpdateWithoutRepliesInput>, CommentUncheckedUpdateWithoutRepliesInput>
  }

  export type UserUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: XOR<UserCreateWithoutRepliesInput, UserUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRepliesInput
    upsert?: UserUpsertWithoutRepliesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRepliesInput, UserUpdateWithoutRepliesInput>, UserUncheckedUpdateWithoutRepliesInput>
  }

  export type ReplyLikeUpdateManyWithoutReplyNestedInput = {
    create?: XOR<ReplyLikeCreateWithoutReplyInput, ReplyLikeUncheckedCreateWithoutReplyInput> | ReplyLikeCreateWithoutReplyInput[] | ReplyLikeUncheckedCreateWithoutReplyInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutReplyInput | ReplyLikeCreateOrConnectWithoutReplyInput[]
    upsert?: ReplyLikeUpsertWithWhereUniqueWithoutReplyInput | ReplyLikeUpsertWithWhereUniqueWithoutReplyInput[]
    createMany?: ReplyLikeCreateManyReplyInputEnvelope
    set?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    disconnect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    delete?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    update?: ReplyLikeUpdateWithWhereUniqueWithoutReplyInput | ReplyLikeUpdateWithWhereUniqueWithoutReplyInput[]
    updateMany?: ReplyLikeUpdateManyWithWhereWithoutReplyInput | ReplyLikeUpdateManyWithWhereWithoutReplyInput[]
    deleteMany?: ReplyLikeScalarWhereInput | ReplyLikeScalarWhereInput[]
  }

  export type ReplyLikeUncheckedUpdateManyWithoutReplyNestedInput = {
    create?: XOR<ReplyLikeCreateWithoutReplyInput, ReplyLikeUncheckedCreateWithoutReplyInput> | ReplyLikeCreateWithoutReplyInput[] | ReplyLikeUncheckedCreateWithoutReplyInput[]
    connectOrCreate?: ReplyLikeCreateOrConnectWithoutReplyInput | ReplyLikeCreateOrConnectWithoutReplyInput[]
    upsert?: ReplyLikeUpsertWithWhereUniqueWithoutReplyInput | ReplyLikeUpsertWithWhereUniqueWithoutReplyInput[]
    createMany?: ReplyLikeCreateManyReplyInputEnvelope
    set?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    disconnect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    delete?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    connect?: ReplyLikeWhereUniqueInput | ReplyLikeWhereUniqueInput[]
    update?: ReplyLikeUpdateWithWhereUniqueWithoutReplyInput | ReplyLikeUpdateWithWhereUniqueWithoutReplyInput[]
    updateMany?: ReplyLikeUpdateManyWithWhereWithoutReplyInput | ReplyLikeUpdateManyWithWhereWithoutReplyInput[]
    deleteMany?: ReplyLikeScalarWhereInput | ReplyLikeScalarWhereInput[]
  }

  export type CommentCreateNestedOneWithoutLikesInput = {
    create?: XOR<CommentCreateWithoutLikesInput, CommentUncheckedCreateWithoutLikesInput>
    connectOrCreate?: CommentCreateOrConnectWithoutLikesInput
    connect?: CommentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentLikesInput = {
    create?: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentLikesInput
    connect?: UserWhereUniqueInput
  }

  export type CommentUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<CommentCreateWithoutLikesInput, CommentUncheckedCreateWithoutLikesInput>
    connectOrCreate?: CommentCreateOrConnectWithoutLikesInput
    upsert?: CommentUpsertWithoutLikesInput
    connect?: CommentWhereUniqueInput
    update?: XOR<XOR<CommentUpdateToOneWithWhereWithoutLikesInput, CommentUpdateWithoutLikesInput>, CommentUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateOneRequiredWithoutCommentLikesNestedInput = {
    create?: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentLikesInput
    upsert?: UserUpsertWithoutCommentLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentLikesInput, UserUpdateWithoutCommentLikesInput>, UserUncheckedUpdateWithoutCommentLikesInput>
  }

  export type ReplyCreateNestedOneWithoutLikesInput = {
    create?: XOR<ReplyCreateWithoutLikesInput, ReplyUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ReplyCreateOrConnectWithoutLikesInput
    connect?: ReplyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReplyLikesInput = {
    create?: XOR<UserCreateWithoutReplyLikesInput, UserUncheckedCreateWithoutReplyLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReplyLikesInput
    connect?: UserWhereUniqueInput
  }

  export type ReplyUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<ReplyCreateWithoutLikesInput, ReplyUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ReplyCreateOrConnectWithoutLikesInput
    upsert?: ReplyUpsertWithoutLikesInput
    connect?: ReplyWhereUniqueInput
    update?: XOR<XOR<ReplyUpdateToOneWithWhereWithoutLikesInput, ReplyUpdateWithoutLikesInput>, ReplyUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateOneRequiredWithoutReplyLikesNestedInput = {
    create?: XOR<UserCreateWithoutReplyLikesInput, UserUncheckedCreateWithoutReplyLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReplyLikesInput
    upsert?: UserUpsertWithoutReplyLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReplyLikesInput, UserUpdateWithoutReplyLikesInput>, UserUncheckedUpdateWithoutReplyLikesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FavoriteCreateWithoutUserInput = {
    movieId: number
    ehSerie?: boolean
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: FavoriteCreateManyUserInput | FavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ReplyCreateNestedManyWithoutCommentInput
    likes?: CommentLikeCreateNestedManyWithoutCommentInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ReplyUncheckedCreateNestedManyWithoutCommentInput
    likes?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReplyCreateWithoutUserInput = {
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    comment: CommentCreateNestedOneWithoutRepliesInput
    likes?: ReplyLikeCreateNestedManyWithoutReplyInput
  }

  export type ReplyUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    edited?: boolean
    commentId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: ReplyLikeUncheckedCreateNestedManyWithoutReplyInput
  }

  export type ReplyCreateOrConnectWithoutUserInput = {
    where: ReplyWhereUniqueInput
    create: XOR<ReplyCreateWithoutUserInput, ReplyUncheckedCreateWithoutUserInput>
  }

  export type ReplyCreateManyUserInputEnvelope = {
    data: ReplyCreateManyUserInput | ReplyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentLikeCreateWithoutUserInput = {
    comment: CommentCreateNestedOneWithoutLikesInput
  }

  export type CommentLikeUncheckedCreateWithoutUserInput = {
    id?: number
    commentId: number
  }

  export type CommentLikeCreateOrConnectWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    create: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput>
  }

  export type CommentLikeCreateManyUserInputEnvelope = {
    data: CommentLikeCreateManyUserInput | CommentLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReplyLikeCreateWithoutUserInput = {
    reply: ReplyCreateNestedOneWithoutLikesInput
  }

  export type ReplyLikeUncheckedCreateWithoutUserInput = {
    id?: number
    replyId: number
  }

  export type ReplyLikeCreateOrConnectWithoutUserInput = {
    where: ReplyLikeWhereUniqueInput
    create: XOR<ReplyLikeCreateWithoutUserInput, ReplyLikeUncheckedCreateWithoutUserInput>
  }

  export type ReplyLikeCreateManyUserInputEnvelope = {
    data: ReplyLikeCreateManyUserInput | ReplyLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    OR?: FavoriteScalarWhereInput[]
    NOT?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    id?: IntFilter<"Favorite"> | number
    movieId?: IntFilter<"Favorite"> | number
    ehSerie?: BoolFilter<"Favorite"> | boolean
    userId?: IntFilter<"Favorite"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    movieId?: IntFilter<"Comment"> | number
    ehSerie?: BoolFilter<"Comment"> | boolean
    content?: StringFilter<"Comment"> | string
    edited?: BoolFilter<"Comment"> | boolean
    userId?: IntFilter<"Comment"> | number
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type ReplyUpsertWithWhereUniqueWithoutUserInput = {
    where: ReplyWhereUniqueInput
    update: XOR<ReplyUpdateWithoutUserInput, ReplyUncheckedUpdateWithoutUserInput>
    create: XOR<ReplyCreateWithoutUserInput, ReplyUncheckedCreateWithoutUserInput>
  }

  export type ReplyUpdateWithWhereUniqueWithoutUserInput = {
    where: ReplyWhereUniqueInput
    data: XOR<ReplyUpdateWithoutUserInput, ReplyUncheckedUpdateWithoutUserInput>
  }

  export type ReplyUpdateManyWithWhereWithoutUserInput = {
    where: ReplyScalarWhereInput
    data: XOR<ReplyUpdateManyMutationInput, ReplyUncheckedUpdateManyWithoutUserInput>
  }

  export type ReplyScalarWhereInput = {
    AND?: ReplyScalarWhereInput | ReplyScalarWhereInput[]
    OR?: ReplyScalarWhereInput[]
    NOT?: ReplyScalarWhereInput | ReplyScalarWhereInput[]
    id?: IntFilter<"Reply"> | number
    content?: StringFilter<"Reply"> | string
    edited?: BoolFilter<"Reply"> | boolean
    commentId?: IntFilter<"Reply"> | number
    userId?: IntFilter<"Reply"> | number
    createdAt?: DateTimeFilter<"Reply"> | Date | string
    updatedAt?: DateTimeFilter<"Reply"> | Date | string
  }

  export type CommentLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    update: XOR<CommentLikeUpdateWithoutUserInput, CommentLikeUncheckedUpdateWithoutUserInput>
    create: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput>
  }

  export type CommentLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    data: XOR<CommentLikeUpdateWithoutUserInput, CommentLikeUncheckedUpdateWithoutUserInput>
  }

  export type CommentLikeUpdateManyWithWhereWithoutUserInput = {
    where: CommentLikeScalarWhereInput
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentLikeScalarWhereInput = {
    AND?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
    OR?: CommentLikeScalarWhereInput[]
    NOT?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
    id?: IntFilter<"CommentLike"> | number
    commentId?: IntFilter<"CommentLike"> | number
    userId?: IntFilter<"CommentLike"> | number
  }

  export type ReplyLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: ReplyLikeWhereUniqueInput
    update: XOR<ReplyLikeUpdateWithoutUserInput, ReplyLikeUncheckedUpdateWithoutUserInput>
    create: XOR<ReplyLikeCreateWithoutUserInput, ReplyLikeUncheckedCreateWithoutUserInput>
  }

  export type ReplyLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: ReplyLikeWhereUniqueInput
    data: XOR<ReplyLikeUpdateWithoutUserInput, ReplyLikeUncheckedUpdateWithoutUserInput>
  }

  export type ReplyLikeUpdateManyWithWhereWithoutUserInput = {
    where: ReplyLikeScalarWhereInput
    data: XOR<ReplyLikeUpdateManyMutationInput, ReplyLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type ReplyLikeScalarWhereInput = {
    AND?: ReplyLikeScalarWhereInput | ReplyLikeScalarWhereInput[]
    OR?: ReplyLikeScalarWhereInput[]
    NOT?: ReplyLikeScalarWhereInput | ReplyLikeScalarWhereInput[]
    id?: IntFilter<"ReplyLike"> | number
    replyId?: IntFilter<"ReplyLike"> | number
    userId?: IntFilter<"ReplyLike"> | number
  }

  export type UserCreateWithoutFavoritesInput = {
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutUserInput
    replies?: ReplyCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    replies?: ReplyUncheckedCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutUserNestedInput
    replies?: ReplyUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    replies?: ReplyUncheckedUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCommentsInput = {
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    replies?: ReplyCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    replies?: ReplyUncheckedCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type ReplyCreateWithoutCommentInput = {
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRepliesInput
    likes?: ReplyLikeCreateNestedManyWithoutReplyInput
  }

  export type ReplyUncheckedCreateWithoutCommentInput = {
    id?: number
    content: string
    edited?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: ReplyLikeUncheckedCreateNestedManyWithoutReplyInput
  }

  export type ReplyCreateOrConnectWithoutCommentInput = {
    where: ReplyWhereUniqueInput
    create: XOR<ReplyCreateWithoutCommentInput, ReplyUncheckedCreateWithoutCommentInput>
  }

  export type ReplyCreateManyCommentInputEnvelope = {
    data: ReplyCreateManyCommentInput | ReplyCreateManyCommentInput[]
    skipDuplicates?: boolean
  }

  export type CommentLikeCreateWithoutCommentInput = {
    user: UserCreateNestedOneWithoutCommentLikesInput
  }

  export type CommentLikeUncheckedCreateWithoutCommentInput = {
    id?: number
    userId: number
  }

  export type CommentLikeCreateOrConnectWithoutCommentInput = {
    where: CommentLikeWhereUniqueInput
    create: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput>
  }

  export type CommentLikeCreateManyCommentInputEnvelope = {
    data: CommentLikeCreateManyCommentInput | CommentLikeCreateManyCommentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    replies?: ReplyUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    replies?: ReplyUncheckedUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReplyUpsertWithWhereUniqueWithoutCommentInput = {
    where: ReplyWhereUniqueInput
    update: XOR<ReplyUpdateWithoutCommentInput, ReplyUncheckedUpdateWithoutCommentInput>
    create: XOR<ReplyCreateWithoutCommentInput, ReplyUncheckedCreateWithoutCommentInput>
  }

  export type ReplyUpdateWithWhereUniqueWithoutCommentInput = {
    where: ReplyWhereUniqueInput
    data: XOR<ReplyUpdateWithoutCommentInput, ReplyUncheckedUpdateWithoutCommentInput>
  }

  export type ReplyUpdateManyWithWhereWithoutCommentInput = {
    where: ReplyScalarWhereInput
    data: XOR<ReplyUpdateManyMutationInput, ReplyUncheckedUpdateManyWithoutCommentInput>
  }

  export type CommentLikeUpsertWithWhereUniqueWithoutCommentInput = {
    where: CommentLikeWhereUniqueInput
    update: XOR<CommentLikeUpdateWithoutCommentInput, CommentLikeUncheckedUpdateWithoutCommentInput>
    create: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput>
  }

  export type CommentLikeUpdateWithWhereUniqueWithoutCommentInput = {
    where: CommentLikeWhereUniqueInput
    data: XOR<CommentLikeUpdateWithoutCommentInput, CommentLikeUncheckedUpdateWithoutCommentInput>
  }

  export type CommentLikeUpdateManyWithWhereWithoutCommentInput = {
    where: CommentLikeScalarWhereInput
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyWithoutCommentInput>
  }

  export type CommentCreateWithoutRepliesInput = {
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
    likes?: CommentLikeCreateNestedManyWithoutCommentInput
  }

  export type CommentUncheckedCreateWithoutRepliesInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
  }

  export type CommentCreateOrConnectWithoutRepliesInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
  }

  export type UserCreateWithoutRepliesInput = {
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRepliesInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRepliesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRepliesInput, UserUncheckedCreateWithoutRepliesInput>
  }

  export type ReplyLikeCreateWithoutReplyInput = {
    user: UserCreateNestedOneWithoutReplyLikesInput
  }

  export type ReplyLikeUncheckedCreateWithoutReplyInput = {
    id?: number
    userId: number
  }

  export type ReplyLikeCreateOrConnectWithoutReplyInput = {
    where: ReplyLikeWhereUniqueInput
    create: XOR<ReplyLikeCreateWithoutReplyInput, ReplyLikeUncheckedCreateWithoutReplyInput>
  }

  export type ReplyLikeCreateManyReplyInputEnvelope = {
    data: ReplyLikeCreateManyReplyInput | ReplyLikeCreateManyReplyInput[]
    skipDuplicates?: boolean
  }

  export type CommentUpsertWithoutRepliesInput = {
    update: XOR<CommentUpdateWithoutRepliesInput, CommentUncheckedUpdateWithoutRepliesInput>
    create: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
    where?: CommentWhereInput
  }

  export type CommentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: CommentWhereInput
    data: XOR<CommentUpdateWithoutRepliesInput, CommentUncheckedUpdateWithoutRepliesInput>
  }

  export type CommentUpdateWithoutRepliesInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    likes?: CommentLikeUpdateManyWithoutCommentNestedInput
  }

  export type CommentUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type UserUpsertWithoutRepliesInput = {
    update: XOR<UserUpdateWithoutRepliesInput, UserUncheckedUpdateWithoutRepliesInput>
    create: XOR<UserCreateWithoutRepliesInput, UserUncheckedCreateWithoutRepliesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRepliesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRepliesInput, UserUncheckedUpdateWithoutRepliesInput>
  }

  export type UserUpdateWithoutRepliesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReplyLikeUpsertWithWhereUniqueWithoutReplyInput = {
    where: ReplyLikeWhereUniqueInput
    update: XOR<ReplyLikeUpdateWithoutReplyInput, ReplyLikeUncheckedUpdateWithoutReplyInput>
    create: XOR<ReplyLikeCreateWithoutReplyInput, ReplyLikeUncheckedCreateWithoutReplyInput>
  }

  export type ReplyLikeUpdateWithWhereUniqueWithoutReplyInput = {
    where: ReplyLikeWhereUniqueInput
    data: XOR<ReplyLikeUpdateWithoutReplyInput, ReplyLikeUncheckedUpdateWithoutReplyInput>
  }

  export type ReplyLikeUpdateManyWithWhereWithoutReplyInput = {
    where: ReplyLikeScalarWhereInput
    data: XOR<ReplyLikeUpdateManyMutationInput, ReplyLikeUncheckedUpdateManyWithoutReplyInput>
  }

  export type CommentCreateWithoutLikesInput = {
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
    replies?: ReplyCreateNestedManyWithoutCommentInput
  }

  export type CommentUncheckedCreateWithoutLikesInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ReplyUncheckedCreateNestedManyWithoutCommentInput
  }

  export type CommentCreateOrConnectWithoutLikesInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutLikesInput, CommentUncheckedCreateWithoutLikesInput>
  }

  export type UserCreateWithoutCommentLikesInput = {
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    replies?: ReplyCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentLikesInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    replies?: ReplyUncheckedCreateNestedManyWithoutUserInput
    replyLikes?: ReplyLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
  }

  export type CommentUpsertWithoutLikesInput = {
    update: XOR<CommentUpdateWithoutLikesInput, CommentUncheckedUpdateWithoutLikesInput>
    create: XOR<CommentCreateWithoutLikesInput, CommentUncheckedCreateWithoutLikesInput>
    where?: CommentWhereInput
  }

  export type CommentUpdateToOneWithWhereWithoutLikesInput = {
    where?: CommentWhereInput
    data: XOR<CommentUpdateWithoutLikesInput, CommentUncheckedUpdateWithoutLikesInput>
  }

  export type CommentUpdateWithoutLikesInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    replies?: ReplyUpdateManyWithoutCommentNestedInput
  }

  export type CommentUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ReplyUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type UserUpsertWithoutCommentLikesInput = {
    update: XOR<UserUpdateWithoutCommentLikesInput, UserUncheckedUpdateWithoutCommentLikesInput>
    create: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentLikesInput, UserUncheckedUpdateWithoutCommentLikesInput>
  }

  export type UserUpdateWithoutCommentLikesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    replies?: ReplyUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    replies?: ReplyUncheckedUpdateManyWithoutUserNestedInput
    replyLikes?: ReplyLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReplyCreateWithoutLikesInput = {
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    comment: CommentCreateNestedOneWithoutRepliesInput
    user: UserCreateNestedOneWithoutRepliesInput
  }

  export type ReplyUncheckedCreateWithoutLikesInput = {
    id?: number
    content: string
    edited?: boolean
    commentId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReplyCreateOrConnectWithoutLikesInput = {
    where: ReplyWhereUniqueInput
    create: XOR<ReplyCreateWithoutLikesInput, ReplyUncheckedCreateWithoutLikesInput>
  }

  export type UserCreateWithoutReplyLikesInput = {
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    replies?: ReplyCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReplyLikesInput = {
    id?: number
    name?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    createdAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    replies?: ReplyUncheckedCreateNestedManyWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReplyLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReplyLikesInput, UserUncheckedCreateWithoutReplyLikesInput>
  }

  export type ReplyUpsertWithoutLikesInput = {
    update: XOR<ReplyUpdateWithoutLikesInput, ReplyUncheckedUpdateWithoutLikesInput>
    create: XOR<ReplyCreateWithoutLikesInput, ReplyUncheckedCreateWithoutLikesInput>
    where?: ReplyWhereInput
  }

  export type ReplyUpdateToOneWithWhereWithoutLikesInput = {
    where?: ReplyWhereInput
    data: XOR<ReplyUpdateWithoutLikesInput, ReplyUncheckedUpdateWithoutLikesInput>
  }

  export type ReplyUpdateWithoutLikesInput = {
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: CommentUpdateOneRequiredWithoutRepliesNestedInput
    user?: UserUpdateOneRequiredWithoutRepliesNestedInput
  }

  export type ReplyUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    commentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutReplyLikesInput = {
    update: XOR<UserUpdateWithoutReplyLikesInput, UserUncheckedUpdateWithoutReplyLikesInput>
    create: XOR<UserCreateWithoutReplyLikesInput, UserUncheckedCreateWithoutReplyLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReplyLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReplyLikesInput, UserUncheckedUpdateWithoutReplyLikesInput>
  }

  export type UserUpdateWithoutReplyLikesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    replies?: ReplyUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReplyLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    replies?: ReplyUncheckedUpdateManyWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FavoriteCreateManyUserInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
  }

  export type CommentCreateManyUserInput = {
    id?: number
    movieId: number
    ehSerie?: boolean
    content: string
    edited?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReplyCreateManyUserInput = {
    id?: number
    content: string
    edited?: boolean
    commentId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentLikeCreateManyUserInput = {
    id?: number
    commentId: number
  }

  export type ReplyLikeCreateManyUserInput = {
    id?: number
    replyId: number
  }

  export type FavoriteUpdateWithoutUserInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CommentUpdateWithoutUserInput = {
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ReplyUpdateManyWithoutCommentNestedInput
    likes?: CommentLikeUpdateManyWithoutCommentNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ReplyUncheckedUpdateManyWithoutCommentNestedInput
    likes?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    movieId?: IntFieldUpdateOperationsInput | number
    ehSerie?: BoolFieldUpdateOperationsInput | boolean
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReplyUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: CommentUpdateOneRequiredWithoutRepliesNestedInput
    likes?: ReplyLikeUpdateManyWithoutReplyNestedInput
  }

  export type ReplyUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    commentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: ReplyLikeUncheckedUpdateManyWithoutReplyNestedInput
  }

  export type ReplyUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    commentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUpdateWithoutUserInput = {
    comment?: CommentUpdateOneRequiredWithoutLikesNestedInput
  }

  export type CommentLikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentLikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
  }

  export type ReplyLikeUpdateWithoutUserInput = {
    reply?: ReplyUpdateOneRequiredWithoutLikesNestedInput
  }

  export type ReplyLikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    replyId?: IntFieldUpdateOperationsInput | number
  }

  export type ReplyLikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    replyId?: IntFieldUpdateOperationsInput | number
  }

  export type ReplyCreateManyCommentInput = {
    id?: number
    content: string
    edited?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentLikeCreateManyCommentInput = {
    id?: number
    userId: number
  }

  export type ReplyUpdateWithoutCommentInput = {
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRepliesNestedInput
    likes?: ReplyLikeUpdateManyWithoutReplyNestedInput
  }

  export type ReplyUncheckedUpdateWithoutCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: ReplyLikeUncheckedUpdateManyWithoutReplyNestedInput
  }

  export type ReplyUncheckedUpdateManyWithoutCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    edited?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUpdateWithoutCommentInput = {
    user?: UserUpdateOneRequiredWithoutCommentLikesNestedInput
  }

  export type CommentLikeUncheckedUpdateWithoutCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentLikeUncheckedUpdateManyWithoutCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReplyLikeCreateManyReplyInput = {
    id?: number
    userId: number
  }

  export type ReplyLikeUpdateWithoutReplyInput = {
    user?: UserUpdateOneRequiredWithoutReplyLikesNestedInput
  }

  export type ReplyLikeUncheckedUpdateWithoutReplyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReplyLikeUncheckedUpdateManyWithoutReplyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}