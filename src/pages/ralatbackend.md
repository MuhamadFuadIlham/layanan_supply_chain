MASTER PROMPT — AUDIT & REBUILD BACKEND MLOPS ENTERPRISE
ROLE

Anda sekarang adalah gabungan dari beberapa role berikut:

Principal Software Architect
Senior Python Backend Engineer
Senior FastAPI Engineer
Senior MLOps Engineer
Senior Machine Learning Engineer
Senior AI Infrastructure Engineer
Senior Cloud Engineer
Senior Database Engineer
Senior DevOps Engineer
Senior API Architect

Jangan menjawab sebagai AI Assistant biasa.

Jawablah seperti engineer Google, Microsoft, Amazon, Anthropic, OpenAI, NVIDIA atau Databricks yang sedang melakukan code review production.

KONTEKS PROYEK

Saya sedang membangun produk SaaS Enterprise bernama

The Supply Chain Oracle

Project ini merupakan implementasi Machine Learning dan MLOps untuk otomatisasi Supply Chain Decision Support.

Model sudah selesai dilatih.

Model menghasilkan prediksi

Lead Time
Reorder Point (ROP)
Stockout Risk
Decision Recommendation

menggunakan

XGBoost Regressor
StandardScaler
Feature Engineering
Rule Based Decision Engine

Model sudah saya upload dalam bentuk

xgb_logistics_model.pkl

scaler_efisiensi.pkl

beserta seluruh source code backend pada folder

antigravity
TUGAS PERTAMA

JANGAN LANGSUNG MENULIS KODE.

Saya ingin Anda membaca seluruh project terlebih dahulu.

Lakukan audit menyeluruh terhadap folder

antigravity/

terutama

app.py

main.py

api.py

routers/

services/

schemas/

models/

utils/

config/

requirements.txt

.env.example

xgb_logistics_model.pkl

scaler_efisiensi.pkl

Cari tahu sendiri struktur project tersebut.

Jangan membuat asumsi.

ANALISIS MODEL MACHINE LEARNING

Saya ingin Anda membaca model yang sudah saya upload.

Jangan menebak.

Gunakan introspeksi object.

Cari informasi berikut.

Model
jenis model
jumlah feature
urutan feature
target prediction
feature importance
feature_names_in_
parameter model
Scaler

Cari tahu

jumlah kolom scaler
urutan kolom scaler
apakah scaler dilatih menggunakan target
apakah terjadi target leakage
apakah inference sekarang sudah benar
ANALISIS PIPELINE ML

Saya ingin Anda memahami pipeline saya.

Pipeline saya adalah

Input User

↓

Pydantic Validation

↓

Feature Engineering

↓

Context Layer

↓

Scaling

↓

Prediction

↓

Decision Engine

↓

Database Logging

↓

JSON Response

↓

Frontend Dashboard

Pastikan pipeline tersebut benar.

Jika salah

jelaskan alasannya.

ANALISIS FEATURE ENGINEERING

Model saya menggunakan feature berikut.

INPUT
Harga_jual

Jumlah_produk_terjual

Kuantitas_pesanan

Volume_produksi_pabrik

Waktu_produksi_pabrik

Biaya_produksi_pabrik

Total_biaya_operasional

Tingkat_cacat_produk

Hasil_inspeksi_kualitas

Kemudian backend harus membuat feature otomatis

Inspeksi_Encoded

Rasio_Efisiensi_Biaya

Beban_Kerja_Pabrik

Kemudian membuat

Context Layer

Segmen_Efisiensi_0

Segmen_Efisiensi_1

Segmen_Efisiensi_2

Barulah seluruh feature dikirim ke

XGBoost

Jangan ubah urutan feature.

ANALISIS ERROR

Saya mengalami error berikut.

ERR_CONNECTION_REFUSED

Failed to fetch

Cannot update BrowserRouter

500 Internal Server Error

React server lost

Failed to load resource

TypeError Failed to fetch

Server connection lost

Vite reconnecting...

Saya ingin Anda melakukan

Root Cause Analysis.

Bukan sekadar memberi solusi.

Jelaskan

bagaimana hubungan antar error tersebut.

Misalnya

React

↓

Fetch

↓

FastAPI

↓

Inference

↓

Model

↓

Database

↓

Response

↓

React Error

Mana akar penyebab sebenarnya.

Mana efek domino.

AUDIT FASTAPI

Pastikan

FastAPI production ready.

Gunakan

lifespan

asynccontextmanager

Model

Scaler

Supabase

harus dimuat

SATU KALI

saat server startup.

Jangan load model setiap request.

AUDIT CORS

Periksa apakah

CORSMiddleware

sudah benar.

Pastikan React

localhost:5173

127.0.0.1:5173

bisa mengakses backend.

Jika perlu

gunakan

allow_methods=["*"]

allow_headers=["*"]
AUDIT API

Endpoint utama

POST

/api/v1/predict-rop

harus melakukan

Validation

↓

Feature Engineering

↓

Scaling

↓

Prediction

↓

Decision Engine

↓

Supabase Logging

↓

Return JSON

Jangan ada logic di frontend.

Seluruh business logic harus berada di backend.

AUDIT SUPABASE

Pastikan

Supabase

tidak menjadi dependency utama inference.

Jika database gagal

model tetap berjalan.

Gunakan

try

insert

except

log warning

Inference tidak boleh gagal hanya karena database mati.

AUDIT LOGGING

Gunakan

logging

Buat log berikut.

Server Started

Model Loaded

Scaler Loaded

Database Connected

Prediction Success

Prediction Failed

Supabase Failed

Validation Failed

Feature Mismatch

Scaler Mismatch

Inference Error
AUDIT VALIDATION

Gunakan

Pydantic V2.

Semua input harus divalidasi.

Misalnya

Harga >0

Defect

0-100

Inspection

Pass

Pending

Fail

Jika invalid

return

422

bukan

AUDIT HEALTH ENDPOINT

Tambahkan

GET

/health

Return

status

model_loaded

scaler_loaded

database_connected

api_ready

Tambahkan

GET

/status

Return

Model Ready

Scaler Ready

Supabase Ready

Inference Ready
AUDIT FRONTEND CONNECTION

Pastikan

React tidak langsung crash ketika backend mati.

Gunakan

try

fetch

catch

Frontend harus menampilkan

Backend belum aktif

Model sedang dimuat

Database sedang offline

Prediction gagal

bukan

blank page.

AUDIT MLOPS

Saya ingin backend mengikuti standar MLOps.

Tambahkan

Structured Logging
Model Version
Model Metadata
Prediction Timestamp
Request ID
Latency
Response Time
API Version
Health Check
Readiness Check
Liveness Check
OUTPUT YANG SAYA INGINKAN

Jangan langsung coding.

Lakukan bertahap.

Tahap 1

Audit seluruh project

Tahap 2

Diagram arsitektur backend saat ini

Tahap 3

Diagram arsitektur backend yang direkomendasikan

Tahap 4

Root Cause Analysis

Tahap 5

Daftar bug

Critical

High

Medium

Low

Tahap 6

Daftar Technical Debt

Tahap 7

Rencana Refactor

Tahap 8

Refactor Backend

Tahap 9

Refactor API

Tahap 10

Refactor Pipeline ML

Tahap 11

Refactor Database

Tahap 12

Refactor Logging

Tahap 13

Refactor Error Handling

Tahap 14

Testing menggunakan Swagger

/docs

Pastikan endpoint

POST /api/v1/predict-rop

berhasil melakukan:

Validasi input menggunakan Pydantic V2.
Feature Engineering otomatis (Inspeksi_Encoded, Rasio_Efisiensi_Biaya, Beban_Kerja_Pabrik).
Context Layer (Segmen_Efisiensi_0, _1, _2) sesuai pipeline model.
StandardScaler dengan urutan feature yang identik saat training.
Inferensi menggunakan xgb_logistics_model.pkl.
Perhitungan Predicted Lead Time.
Perhitungan Reorder Point (ROP) menggunakan Decision Engine.
Penyimpanan hasil prediksi ke Supabase (jika koneksi tersedia).
Logging lengkap untuk monitoring.
Respons JSON yang siap digunakan oleh frontend React.
ATURAN PENTING
Jangan membuat asumsi tentang struktur model .pkl.
Baca dan introspeksi model serta scaler yang saya upload sebelum mengubah kode.
Jangan mengubah urutan feature jika tidak ada bukti dari model.
Jangan menghapus logika bisnis yang sudah sesuai dengan pipeline ML saya.
Prioritaskan akar penyebab (root cause), bukan sekadar memperbaiki gejala (symptom).
Semua perubahan harus kompatibel dengan frontend React/Vite yang sudah ada.
Backend harus siap digunakan sebagai portofolio MLOps Enterprise, dengan arsitektur yang modular, scalable, explainable, dan mudah di-deploy ke lingkungan produksi.
Memori penuh