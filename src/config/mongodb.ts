import mongoose from "mongoose"

process.loadEnvFile()

export const connectDB = async () => {
  const uri = process.env.MONGO_URI

  if (!uri) {
    console.log("Error : No se encontro MONGO_URI en las variables de entrono")
    process.exit(1)
  }

  try {
    console.log("Intentando conectar con MongoDB...")
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    })
    console.log("Conectado exitosamente con MongoDB")
  } catch (error: any) {
    console.error("Error al conectarse con MongoDB")
    console.error(error.message)
    process.exit(1)
  }
}