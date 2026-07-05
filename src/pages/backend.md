# ROLE

Mulai saat ini ubah peran Anda menjadi gabungan dari:

- Principal MLOps Engineer
- Principal Enterprise Backend Architect
- Senior FastAPI Architect
- Senior Python Software Engineer
- Enterprise Solution Architect
- Senior DevOps Engineer
- AI Infrastructure Engineer
- ML Platform Engineer
- Enterprise API Architect

=========================================================

PROJECT

Saya sedang membangun produk SaaS Enterprise bernama

"The Supply Chain Oracle"

yang merupakan AI Decision Support System untuk Supply Chain Management.

Frontend menggunakan:

- React
- TypeScript
- Vite
- TailwindCSS

Backend menggunakan:

- FastAPI
- Uvicorn
- Pydantic V2
- Supabase
- Joblib
- XGBoost
- StandardScaler

Model Machine Learning (.pkl) sudah selesai dilatih.

Backend harus menjadi REST API Engine yang stabil, modular, scalable, dan siap untuk deployment MLOps.

=========================================================

SEBELUM MENULIS KODE

JANGAN langsung membuat app.py.

Saya ingin Anda melakukan Root Cause Analysis terhadap seluruh error yang sedang terjadi.

Analisis satu per satu.

=========================================================

ERROR YANG TERJADI

React Error

Cannot update a component (BrowserRouter)
while rendering LandingPage

---------------------------------------------------------

Backend Error

ERR_CONNECTION_REFUSED

---------------------------------------------------------

FastAPI

500 Internal Server Error

---------------------------------------------------------

Fetch

Failed to fetch

---------------------------------------------------------

Vite

Server Connection Lost

---------------------------------------------------------

React

Download React DevTools

---------------------------------------------------------

Content Script

Cannot redefine property

=========================================================

TUGAS PERTAMA

Saya ingin Anda mengelompokkan error tersebut.

Pisahkan menjadi:

Frontend Problem

Backend Problem

API Problem

Database Problem

ML Problem

Deployment Problem

Browser Extension Problem

Jangan mencampur semuanya.

=========================================================

ROOT CAUSE ANALYSIS

Untuk setiap error jelaskan:

Apa penyebab paling mungkin.

Mengapa bisa terjadi.

Layer mana yang terkena.

Dampaknya terhadap sistem.

Cara memverifikasi.

Cara memperbaiki.

Cara mencegah.

=========================================================

SETELAH ITU

Audit seluruh backend.

Saya ingin Anda membaca seluruh project backend.

Jangan hanya app.py.

Audit seluruh folder backend.

Cari:

Import Error

Circular Import

Missing Dependency

Missing Environment Variable

Missing Model

Missing Scaler

Missing Endpoint

Invalid Shape

Feature Mismatch

Scaler Mismatch

Prediction Error

Supabase Error

JSON Serialization

Pydantic Error

Async Error

Memory Leak

Blocking Operation

=========================================================

SETELAH AUDIT

Bangun ulang backend menggunakan arsitektur Enterprise.

Jangan membuat satu file app.py besar.

Pisahkan menjadi beberapa layer.

Gunakan Clean Architecture.

=========================================================

Saya ingin struktur seperti berikut.

app/

│

├── main.py

│

├── core/

│

│ config.py

│ logger.py

│ lifespan.py

│ settings.py

│ exceptions.py

│ middleware.py

│

├── api/

│

│ routes/

│

│ prediction.py

│ health.py

│ monitoring.py

│ system.py

│

├── schemas/

│

│ prediction.py

│ response.py

│

├── ml/

│

│ loader.py

│ preprocessing.py

│ feature_engineering.py

│ clustering.py

│ scaler.py

│ predictor.py

│ decision_engine.py

│ explainability.py

│

├── database/

│

│ supabase.py

│ repository.py

│

├── services/

│

│ prediction_service.py

│ logging_service.py

│ monitoring_service.py

│

├── utils/

│

│ helpers.py

│ validators.py

│

└── models/

xgb_logistics_model.pkl

scaler_efisiensi.pkl

=========================================================

LIFESPAN

Gunakan FastAPI Lifespan modern.

Gunakan

@asynccontextmanager

Bukan

startup_event

Model

Scaler

Supabase Client

harus dimuat SATU KALI.

Simpan pada

app.state

Jangan pernah load model setiap request.

=========================================================

MODEL LOADER

Pastikan backend melakukan pengecekan:

Apakah file model ada.

Apakah scaler ada.

Apakah bisa dibaca.

Apakah versi Joblib sesuai.

Apakah shape model valid.

Jika gagal.

Server tidak boleh crash.

Gunakan graceful error.

=========================================================

HEALTH CHECK

Tambahkan endpoint

GET /api/health

Response

Backend

Model

Scaler

Supabase

Memory

Uptime

Version

Prediction Count

=========================================================

SYSTEM STATUS

Tambahkan

GET /api/system/status

Response

Server

Database

Model

Scaler

API

Ready

=========================================================

SUPABASE

Jangan jadikan Supabase dependency utama.

Prediction harus tetap berjalan walaupun database mati.

Flow yang benar

Prediction

↓

Return JSON

↓

Background Task

↓

Insert Prediction ke Supabase

Jika insert gagal.

Prediction tetap sukses.

Hanya log warning.

=========================================================

PYDANTIC

Gunakan Pydantic V2.

Gunakan

Field

Annotated

Model Validator

Field Validator

Validasi seluruh feature.

Jangan hanya tipe data.

Validasi juga rentang bisnis.

=========================================================

FEATURE ENGINEERING

Backend harus menghitung otomatis.

Rasio Efisiensi

Beban Kerja

Inspeksi Encoded

Segmen Efisiensi

Jangan meminta frontend menghitung.

=========================================================

PIPELINE

Pipeline harus tetap

Validation

↓

Feature Engineering

↓

Context Layer

↓

Scaler

↓

Prediction

↓

Decision Engine

↓

Response

=========================================================

SCALER

Pastikan jumlah feature sama.

Pastikan urutan feature sama.

Pastikan dtype sama.

Jika shape berbeda.

Kembalikan HTTPException.

Jangan crash.

=========================================================

XGBOOST

Pastikan model hanya menerima

14 feature.

Tambahkan validasi.

=========================================================

DECISION ENGINE

Pisahkan menjadi module sendiri.

Jangan gabungkan dengan endpoint.

=========================================================

BACKGROUND TASK

Gunakan FastAPI BackgroundTasks.

Untuk

Insert Database

Audit Log

Prediction History

Jangan blocking inference.

=========================================================

LOGGING

Gunakan logging.

Log

Startup

Prediction

Warning

Database

Exception

Inference

=========================================================

EXCEPTION

Gunakan Global Exception Handler.

Jangan tampilkan traceback ke frontend.

=========================================================

API RESPONSE

Gunakan format konsisten.

{
    "success": true,
    "message": "...",
    "data": {...},
    "metadata": {
        "model_version":"",
        "latency_ms":"",
        "prediction_time":""
    }
}

=========================================================

CORS

Konfigurasi penuh.

React localhost.

Swagger.

Production.

=========================================================

SWAGGER

Seluruh endpoint harus memiliki

Summary

Description

Response Model

Example

=========================================================

PENGUJIAN

Tambahkan endpoint

/api/test/model

/api/test/database

/api/test/scaler

/api/test/pipeline

=========================================================

OUTPUT YANG SAYA INGINKAN

Jangan langsung coding.

Lakukan dalam urutan berikut.

STEP 1

Audit seluruh backend.

STEP 2

Root Cause Analysis terhadap seluruh error.

STEP 3

Identifikasi kelemahan arsitektur backend.

STEP 4

Desain ulang arsitektur backend Enterprise MLOps.

STEP 5

Pemetaan modul.

STEP 6

Pemetaan dependency.

STEP 7

Pemetaan request lifecycle.

STEP 8

Flow inference lengkap.

STEP 9

Flow penyimpanan Supabase.

STEP 10

Flow monitoring.

STEP 11

Flow logging.

STEP 12

Barulah implementasikan seluruh backend secara bertahap.

=========================================================

TARGET AKHIR

Saya ingin backend yang:

- Production Ready
- Enterprise Ready
- MLOps Ready
- Mudah di-maintain
- Tidak crash ketika model gagal dimuat
- Tidak crash ketika database mati
- Tidak crash ketika frontend mengirim request salah
- Memiliki observability
- Memiliki health monitoring
- Memiliki modular architecture
- Siap diintegrasikan dengan React Dashboard dan deployment Docker/Kubernetes di masa depan.