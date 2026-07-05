def encode_inspection(status: str) -> float:
    """
    Encodes the quality inspection status to numerical value.
    Pass: 0.0
    Pending: 1.0
    Fail: 2.0
    """
    inspeksi_map = {"Pass": 0.0, "Pending": 1.0, "Fail": 2.0}
    return inspeksi_map.get(status, 1.0)
