from typing import Dict
from pydantic import BaseModel, Field, model_validator

class PredictionRequest(BaseModel):
    Harga_jual: float = Field(..., description="Selling price of the SKU", gt=0)
    Jumlah_produk_terjual: float = Field(..., description="Annual units sold", ge=0)
    Kuantitas_pesanan: float = Field(..., description="Order quantity", ge=0)
    Volume_produksi_pabrik: float = Field(..., description="Factory production volume", ge=0)
    Waktu_produksi_pabrik: float = Field(..., description="Factory production time in days", ge=0)
    Biaya_produksi_pabrik: float = Field(..., description="Factory production cost", ge=0)
    Total_biaya_operasional: float = Field(..., description="Total operating cost", gt=0)
    Tingkat_cacat_produk: float = Field(..., description="Product defect rate percentage", ge=0, le=100)
    Hasil_inspeksi_kualitas: str = Field(..., pattern="^(Pass|Pending|Fail)$", description="Quality inspection status")
    Tingkat_stok_gudang: float = Field(..., description="Current warehouse stock level", ge=0)

    @model_validator(mode='after')
    def validate_business_logic(self):
        if self.Biaya_produksi_pabrik > self.Total_biaya_operasional:
            raise ValueError('Biaya produksi tidak boleh melebihi total biaya operasional')
        return self

    class Config:
        json_schema_extra = {
            "example": {
                "Harga_jual": 50000.0,
                "Jumlah_produk_terjual": 3650.0,
                "Kuantitas_pesanan": 250.0,
                "Volume_produksi_pabrik": 1000.0,
                "Waktu_produksi_pabrik": 5.0,
                "Biaya_produksi_pabrik": 12000000.0,
                "Total_biaya_operasional": 15000000.0,
                "Tingkat_cacat_produk": 1.5,
                "Hasil_inspeksi_kualitas": "Pass",
                "Tingkat_stok_gudang": 100.0,
            }
        }

class PredictionData(BaseModel):
    predicted_lead_time_days: float
    calculated_rop_units: int
    ai_agent_recommendation: str
    feature_deviations: Dict[str, float]
