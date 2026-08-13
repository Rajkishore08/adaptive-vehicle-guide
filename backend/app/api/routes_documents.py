from fastapi import APIRouter

router_docs = APIRouter(prefix="/api/documents", tags=["Documents"])

DOCUMENTS = [
    {"id": "doc-1", "name": "Owner's Manual", "type": "PDF", "pages": 142, "chunks": 624, "status": "Indexed"},
    {"id": "doc-2", "name": "Maintenance Schedule", "type": "PDF", "pages": 48, "chunks": 213, "status": "Indexed"},
    {"id": "doc-3", "name": "Service Manual", "type": "PDF", "pages": 328, "chunks": 1104, "status": "Indexed"},
    {"id": "doc-4", "name": "Troubleshooting Guide", "type": "PDF", "pages": 186, "chunks": 687, "status": "Indexed"},
    {"id": "doc-5", "name": "Engine System Guide", "type": "PDF", "pages": 94, "chunks": 318, "status": "Indexed"},
    {"id": "doc-6", "name": "Transmission & Clutch Guide", "type": "PDF", "pages": 112, "chunks": 391, "status": "Indexed"},
    {"id": "doc-7", "name": "Fuel System Guide", "type": "PDF", "pages": 88, "chunks": 302, "status": "Indexed"},
    {"id": "doc-8", "name": "Electrical System Guide", "type": "PDF", "pages": 76, "chunks": 251, "status": "Indexed"},
    {"id": "doc-9", "name": "Brake & Suspension Guide", "type": "PDF", "pages": 103, "chunks": 277, "status": "Indexed"},
    {"id": "doc-10", "name": "Service Invoices", "type": "PDF", "pages": 20, "chunks": 218, "status": "Indexed"}
]

@router_docs.get("/")
async def list_documents_endpoint():
    return DOCUMENTS
