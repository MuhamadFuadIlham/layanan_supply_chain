import math
from typing import Tuple

def compute_rop(daily_demand: float, predicted_lead_time: float, safety_stock: float = 5.0) -> int:
    # ROP = ((Demand/365) * LeadTime) + Safety Stock
    calculated_rop = (daily_demand * predicted_lead_time) + safety_stock
    return math.ceil(calculated_rop)

def generate_recommendation(predicted_lead_time: float, rop_units: int, safety_stock: float = 5.0) -> str:
    return (
        f"Berdasarkan prediksi AI (Lead Time: {predicted_lead_time:.1f} hari, "
        f"Safety Stock: {int(safety_stock)} unit), ROP optimum adalah {rop_units} unit."
    )

def run_decision_engine(jumlah_produk_terjual: float, predicted_lead_time: float) -> Tuple[int, str]:
    daily_demand = jumlah_produk_terjual / 365.0
    rop_units = compute_rop(daily_demand, predicted_lead_time)
    recommendation = generate_recommendation(predicted_lead_time, rop_units)
    return rop_units, recommendation
