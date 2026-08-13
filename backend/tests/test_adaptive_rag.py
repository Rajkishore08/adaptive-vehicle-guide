import os
from app.config import settings

def test_config():
    assert settings.PROJECT_NAME != ""
    assert settings.NVIDIA_LLM_MODEL != ""

def test_classifier_import():
    from app.adaptive.classifier import classifier
    assert classifier is not None

def test_router_import():
    from app.adaptive.router import router
    assert router is not None
