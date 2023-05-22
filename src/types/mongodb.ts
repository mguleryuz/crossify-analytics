import {
  InferSchemaType,
  Model,
  Mongoose,
  ObtainSchemaGeneric,
  Schema,
} from 'mongoose'

declare global {
  /**
   * Global variable to store Mongoose connections.
   * The keys represent the database names.
   */
  var mongoose: Record<string, Mongoose | null>
}

export type MongoGenericModel<TSchema extends Schema = any> = Model<
  InferSchemaType<TSchema>,
  ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>,
  ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
  ObtainSchemaGeneric<TSchema, 'TVirtuals'>,
  TSchema
> &
  ObtainSchemaGeneric<TSchema, 'TStaticMethods'>
