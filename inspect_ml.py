import pickle

print("=== SCALER INSPECTION ===")
with open('app/models/scaler_efisiensi.pkl', 'rb') as f:
    scaler = pickle.load(f)
    print("Type:", type(scaler))
    if hasattr(scaler, 'n_features_in_'):
        print("Features in:", scaler.n_features_in_)
    if hasattr(scaler, 'feature_names_in_'):
        print("Feature names:", scaler.feature_names_in_)
    else:
        print("Feature names not found in scaler.")

print("\n=== MODEL INSPECTION ===")
with open('app/models/xgb_logistics_model.pkl', 'rb') as f:
    model = pickle.load(f)
    print("Type:", type(model))
    if hasattr(model, 'n_features_in_'):
        print("Features in:", model.n_features_in_)
    if hasattr(model, 'feature_names_in_'):
        print("Feature names:", model.feature_names_in_)
    else:
        print("Feature names not found in model.")
    if hasattr(model, 'feature_importances_'):
        print("Feature importances:", model.feature_importances_)
    if hasattr(model, 'get_params'):
        print("Model params:", model.get_params())
