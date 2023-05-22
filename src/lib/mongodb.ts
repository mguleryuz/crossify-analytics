import mongoose from 'mongoose'

const { MONGO_URI } = process.env

export async function connectDB(dbName: string | null) {
  if (!dbName) return null
  if (!global.mongoose?.[dbName]) {
    global.mongoose = {
      ...global.mongoose,
      [dbName]: null,
    }
  }
  if (!!global.mongoose?.[dbName]) return global.mongoose[dbName]
  else {
    mongoose.set('strictQuery', false)
    mongoose
      .connect(`${MONGO_URI}/${dbName}?retryWrites=true&w=majority`)
      .then((mongoose) => {
        console.log(`Connected to Crossify successfully!`)
        global.mongoose[dbName] = mongoose
      })
      .catch(() => {
        console.log(`Failed to connect to Crossify!`)
        global.mongoose[dbName] = null
      })
  }
  return global.mongoose[dbName]
}
