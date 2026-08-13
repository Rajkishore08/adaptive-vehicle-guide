from fastapi import APIRouter

router_vehicles = APIRouter(prefix="/api/vehicles", tags=["Vehicles"])

DEMO_VEHICLE = {
    "id": "veh-santro-2011",
    "manufacturer": "Hyundai",
    "model": "Santro Xing",
    "year": "2011",
    "fuel": "Petrol",
    "engine": "1.1L",
    "odometer": "34,000 km"
}

MAINTENANCE_HISTORY = [
    {"date": "2026-07", "service": "General Service", "mileage": "34,000 km"},
    {"date": "2026-02", "service": "Spark Plug Replacement", "mileage": "33,000 km"},
    {"date": "2025-09", "service": "Air Filter Replacement", "mileage": "31,000 km"},
    {"date": "2025-03", "service": "Engine Oil Service", "mileage": "28,500 km"}
]

@router_vehicles.get("/")
@router_vehicles.get("/{vehicle_id}")
async def get_vehicle_endpoint(vehicle_id: str = "veh-santro-2011"):
    return DEMO_VEHICLE

@router_vehicles.get("/{vehicle_id}/maintenance")
async def get_maintenance_endpoint(vehicle_id: str = "veh-santro-2011"):
    return MAINTENANCE_HISTORY
