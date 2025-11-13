import express from "express"
import cors from "cors"
import path from "path"
import fs from "node:fs"
import morgan from "morgan"
import mongoose from "mongoose"
import { connectDB } from "./config/mongodb"

process.loadEnvFile()

const { MONGO_URI, PORT, JWT_SECRET, NODE_ENV } = process.env

if (!MONGO_URI || !PORT || !JWT_SECRET || !NODE_ENV) {
  console.error("❌ Error: Variables de entorno faltantes")
  process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())

const logsDir = path.join(process.cwd(), "logs")
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

const logFileName = `access-${new Date().toISOString().split("T")[0]}.log`
const logFilePath = path.join(logsDir, logFileName)
const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" })

app.use(
  morgan("common", {
    skip: (req) => req.method === "OPTIONS",
    stream: accessLogStream
  })
)

app.use(
  morgan("common", {
    skip: (req) => req.method === "OPTIONS"
  })
)

app.get("status", (req, res) => {
  const dbState = mongoose.connection.readyState

  if (dbState !== 1) {
    return res.status(503).json({
      status: "DOWN",
      message: "La base de datos no esta conectada",
      dbStatus: dbState,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    })
  }

  res.status(200).json({
    status: "OK",
    message: "Sistema operativo y base de datos funcionando correctamente",
    dbStatus: dbState,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

// app.use("/produt")

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`))
  })
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB:", err)
    process.exit(1)
  })

process.on("SIGINT", async () => {
  console.log("🛑 Cerrando servidor...")
  process.exit(0)
})