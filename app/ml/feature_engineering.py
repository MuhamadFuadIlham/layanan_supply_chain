from typing import Tuple

def calculate_efficiency_ratio(biaya_produksi: float, total_biaya: float) -> float:
    # Prevent division by zero
    total = max(total_biaya, 1.0)
    return biaya_produksi / total

def calculate_workload(volume_produksi: float, waktu_produksi: float) -> float:
    return volume_produksi * waktu_produksi

def determine_efficiency_segments(rasio_efisiensi: float, tingkat_cacat: float) -> Tuple[int, int, int]:
    seg_0, seg_1, seg_2 = 0, 0, 0
    if rasio_efisiensi < 0.75 and tingkat_cacat < 2.0:
        seg_0 = 1  # High Efficiency
    elif rasio_efisiensi >= 0.90 or tingkat_cacat > 5.0:
        seg_2 = 1  # Low Efficiency
    else:
        seg_1 = 1  # Medium Efficiency
    return seg_0, seg_1, seg_2
