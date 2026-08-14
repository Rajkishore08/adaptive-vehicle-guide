import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import unittest
from app.config import settings
from app.adaptive.classifier import classifier
from app.adaptive.router import router

class TestAdaptiveRAG(unittest.TestCase):
    def test_config(self):
        self.assertNotEqual(settings.PROJECT_NAME, "")
        self.assertNotEqual(settings.NVIDIA_LLM_MODEL, "")

    def test_classifier_import(self):
        self.assertIsNotNone(classifier)

    def test_router_import(self):
        self.assertIsNotNone(router)

if __name__ == "__main__":
    unittest.main()

