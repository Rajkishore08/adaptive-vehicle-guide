# Adaptive Vehicle Guide

{

  "project": {

    "name": "AutoRAG",

    "full_name": "Adaptive Vehicle Service & Troubleshooting Assistant",

    "version": "1.0 Frontend Demo",

    "type": "AI Research Product / Interactive RAG Demonstration",

    "platform": "Responsive Web Application",

    "primary_goal": "Create a visually impressive and technically convincing frontend demonstration of Adaptive RAG for vehicle service and troubleshooting.",

    "secondary_goal": "Make the difference between Direct LLM, Single-Step RAG and Agentic Multi-Hop RAG immediately understandable to a professor, evaluator, developer or client.",

    "research_concept": "Adaptive RAG routes user queries to different retrieval strategies according to query complexity.",

    "reference_concept": "Adaptive-RAG: Learning to Adapt Retrieval-Augmented Large Language Models through Question Complexity, NAACL 2024.",

    "demo_scope": "Frontend only with deterministic mock services. No real backend or external API."

  },

  "non_negotiable_requirements": {

    "build_frontend_only": true,

    "do_not_build_backend": true,

    "do_not_use_real_llm": true,

    "do_not_use_real_nvidia_api": true,

    "do_not_use_real_vector_database": true,

    "do_not_use_real_embeddings": true,

    "do_not_use_real_pdf_processing": true,

    "do_not_use_authentication": true,

    "do_not_use_database": true,

    "do_not_require_environment_variables": true,

    "use_deterministic_mock_data": true,

    "make_ui_backend_ready": true,

    "preserve_clean_api_boundaries": true,

    "important": "The frontend will later be connected to a Python FastAPI backend implementing the real Adaptive RAG system. Therefore mock services must be separated from UI components and easy to replace with REST API calls."

  },

  "technology": {

    "framework": "React",

    "language": "TypeScript",

    "bundler": "Vite",

    "styling": "Tailwind CSS",

    "component_library": "shadcn/ui",

    "icons": "Lucide React",

    "charts": "Recharts",

    "state": "React state/hooks with clean modular services",

    "routing": "React Router",

    "avoid_unnecessary_dependencies": true

  },

  "product_positioning": {

    "description": "AutoRAG is a documentation-grounded vehicle service assistant that demonstrates how an AI system can dynamically select the amount of retrieval and reasoning required for a question.",

    "not_a_diagnostic_tool": true,

    "safety_positioning": "The application provides informational, documentation-grounded troubleshooting guidance and does not replace a qualified mechanic.",

    "primary_message": "One query does not always need the same amount of retrieval.",

    "hero_message": "Ask anything about your vehicle. AutoRAG decides how deeply it needs to search.",

    "core_flow": "User Query → Complexity Classifier → Appropriate RAG Strategy → Evidence → Answer"

  },

  "vehicle_demo_context": {

    "manufacturer": "Hyundai",

    "model": "Santro Xing",

    "year": "2011",

    "fuel": "Petrol",

    "engine": "1.1L",

    "odometer": "34,000 km",

    "status": "Demo Vehicle",

    "note": "Use this vehicle consistently throughout the demo so the application feels like a real vehicle-specific assistant."

  },

  "design_system": {

    "overall_style": "Premium automotive technology + AI research dashboard",

    "visual_feeling": [

      "professional",

      "technical",

      "premium",

      "clean",

      "research-oriented",

      "automotive",

      "modern AI"

    ],

    "theme": "dark",

    "background": {

      "primary": "#080B10",

      "secondary": "#0E131A",

      "surface": "#121820",

      "surface_elevated": "#171F29"

    },

    "semantic_colors": {

      "system": "#38BDF8",

      "simple": "#22C55E",

      "medium": "#F59E0B",

      "complex": "#EF4444",

      "success": "#22C55E",

      "warning": "#F59E0B",

      "error": "#EF4444"

    },

    "text": {

      "primary": "#F8FAFC",

      "secondary": "#94A3B8",

      "muted": "#64748B"

    },

    "borders": "rgba(148,163,184,0.12)",

    "radius": {

      "small": "8px",

      "medium": "12px",

      "large": "16px"

    },

    "typography": {

      "font": "Inter",

      "heading_weight": "700",

      "body_weight": "400",

      "label_weight": "500"

    },

    "animation": {

      "style": "subtle and professional",

      "duration": "200-500ms",

      "avoid_excessive_animation": true,

      "avoid_gaming_style": true

    },

    "visual_rules": [

      "Use semantic colors only for complexity states.",

      "Do not use red, amber or green decoratively.",

      "Blue/cyan represents AI/system activity.",

      "Keep charts and diagrams clean.",

      "Use thin borders instead of heavy shadows.",

      "Maintain strong visual hierarchy.",

      "Avoid huge empty hero sections.",

      "Avoid generic SaaS illustrations.",

      "Avoid stock photographs.",

      "Avoid excessive glassmorphism."

    ]

  },

  "application_layout": {

    "desktop": {

      "sidebar": "fixed left navigation",

      "topbar": "persistent",

      "content": "centered responsive content area",

      "max_width": "1440px"

    },

    "tablet": {

      "sidebar": "collapsible",

      "content": "responsive"

    },

    "mobile": {

      "sidebar": "drawer",

      "pipeline": "vertical timeline",

      "cards": "single column",

      "tables": "horizontal scroll or responsive cards"

    }

  },

  "global_navigation": {

    "items": [

      {

        "label": "Dashboard",

        "route": "/"

      },

      {

        "label": "Vehicle",

        "route": "/vehicle"

      },

      {

        "label": "Ask AutoRAG",

        "route": "/ask"

      },

      {

        "label": "Investigation",

        "route": "/investigation"

      },

      {

        "label": "Knowledge Base",

        "route": "/knowledge-base"

      },

      {

        "label": "Evaluation",

        "route": "/evaluation"

      },

      {

        "label": "About Adaptive RAG",

        "route": "/about"

      }

    ],

    "sidebar_footer": [

      "System Status",

      "Demo Mode"

    ]

  },

  "global_header": {

    "logo": {

      "name": "AutoRAG",

      "subtitle": "Adaptive Vehicle Intelligence",

      "icon": "car + AI/network visual"

    },

    "right_side": [

      "Adaptive RAG badge",

      "Demo Mode badge",

      "Vehicle selector",

      "System status"

    ],

    "system_status": {

      "label": "Demo System Online",

      "indicator": "green"

    }

  },

  "core_adaptive_rag_visual": {

    "importance": "highest",

    "purpose": "This visualization is the central visual explanation of the entire application.",

    "title": "Adaptive Retrieval Pipeline",

    "subtitle": "AutoRAG selects the retrieval strategy based on query complexity.",

    "flow": [

      {

        "step": 1,

        "label": "User Query",

        "icon": "message-square"

      },

      {

        "step": 2,

        "label": "Complexity Classifier",

        "icon": "brain"

      },

      {

        "step": 3,

        "branch": true,

        "paths": [

          {

            "type": "SIMPLE",

            "color": "green",

            "label": "Direct LLM",

            "description": "General knowledge is sufficient.",

            "retrieval": "0",

            "reasoning": "Direct response"

          },

          {

            "type": "MEDIUM",

            "color": "amber",

            "label": "Single-Step RAG",

            "description": "One relevant document retrieval is required.",

            "retrieval": "1",

            "reasoning": "Retrieve → Answer"

          },

          {

            "type": "COMPLEX",

            "color": "red",

            "label": "Agentic Multi-Hop RAG",

            "description": "Multiple sources and iterative reasoning are required.",

            "retrieval": "Multiple",

            "reasoning": "Decompose → Retrieve → Evaluate → Retrieve → Synthesize"

          }

        ]

      },

      {

        "step": 4,

        "label": "Evidence Synthesis",

        "icon": "layers"

      },

      {

        "step": 5,

        "label": "Final Answer",

        "icon": "check-circle"

      }

    ],

    "interaction": {

      "hover": "Show strategy explanation tooltip.",

      "click": "Show detailed strategy information in a side panel.",

      "active_state": "Highlight the selected route.",

      "animation": "Animate the path from query to classifier and then through the selected strategy."

    }

  },

  "pages": {

    "dashboard": {

      "route": "/",

      "title": "AutoRAG",

      "subtitle": "Adaptive Vehicle Service Intelligence",

      "hero": {

        "headline": "Ask a vehicle question. AutoRAG decides how deeply it needs to search.",

        "description": "An adaptive RAG system that dynamically selects Direct LLM, Single-Step RAG or Agentic Multi-Hop RAG according to query complexity.",

        "primary_button": "Ask AutoRAG",

        "secondary_button": "How It Works"

      },

      "metrics": [

        {

          "label": "Queries Evaluated",

          "value": "21",

          "caption": "Demo evaluation set"

        },

        {

          "label": "Routing Accuracy",

          "value": "94.7%",

          "caption": "Sample evaluation"

        },

        {

          "label": "Answer Accuracy",

          "value": "91.8%",

          "caption": "Sample evaluation"

        },

        {

          "label": "Average Latency",

          "value": "1.63s",

          "caption": "Across demo queries"

        }

      ],

      "sections": [

        "Adaptive Retrieval Pipeline",

        "How AutoRAG Routes Queries",

        "Live Demo Scenarios",

        "Always RAG vs Adaptive RAG",

        "Recent Investigations"

      ],

      "live_demo_cards": [

        {

          "complexity": "SIMPLE",

          "query": "What does an engine air filter do?",

          "strategy": "Direct LLM",

          "latency": "0.62s",

          "retrievals": 0

        },

        {

          "complexity": "MEDIUM",

          "query": "When should the air filter be replaced according to the manufacturer's maintenance schedule?",

          "strategy": "Single-Step RAG",

          "latency": "1.31s",

          "retrievals": 1

        },

        {

          "complexity": "COMPLEX",

          "query": "My car has poor mileage, hard clutch operation and sometimes moves forward without pressing the accelerator. Based on my maintenance history and the manufacturer's troubleshooting documentation, what should I inspect first?",

          "strategy": "Agentic Multi-Hop RAG",

          "latency": "2.84s",

          "retrievals": 3

        }

      ]

    },

    "vehicle": {

      "route": "/vehicle",

      "title": "Vehicle Profile",

      "subtitle": "Context used by AutoRAG when answering vehicle-specific questions.",

      "profile": {

        "manufacturer": "Hyundai",

        "model": "Santro Xing",

        "year": "2011",

        "fuel": "Petrol",

        "engine": "1.1L",

        "odometer": "34,000 km"

      },

      "actions": [

        "Edit Vehicle",

        "Add Service Record"

      ],

      "maintenance_history": [

        {

          "date": "2026-07",

          "service": "General Service",

          "mileage": "34,000 km"

        },

        {

          "date": "2026-02",

          "service": "Spark Plug Replacement",

          "mileage": "33,000 km"

        },

        {

          "date": "2025-09",

          "service": "Air Filter Replacement",

          "mileage": "31,000 km"

        },

        {

          "date": "2025-03",

          "service": "Engine Oil Service",

          "mileage": "28,500 km"

        }

      ],

      "components": [

        "Vehicle summary card",

        "Maintenance timeline",

        "Service history table",

        "Vehicle health overview"

      ]

    },

    "ask": {

      "route": "/ask",

      "title": "Ask AutoRAG",

      "subtitle": "Describe your vehicle question or symptom.",

      "vehicle_context": true,

      "query_composer": {

        "placeholder": "Example: My car has poor mileage and rough idle. What should I inspect first?",

        "max_length": 1000,

        "primary_action": "Analyze with AutoRAG",

        "secondary_action": "Clear"

      },

      "example_queries": [

        "What does an engine air filter do?",

        "When should the air filter be replaced according to the manufacturer's maintenance schedule?",

        "My car has poor mileage. What should I check first?",

        "My clutch feels hard and the engine idles roughly. What could be causing this?"

      ],

      "query_analysis": {

        "stages": [

          "Reading vehicle context",

          "Analyzing query complexity",

          "Selecting retrieval strategy",

          "Executing selected pipeline",

          "Synthesizing response"

        ],

        "animation": "Show stages sequentially with active/completed states."

      }

    },

    "investigation": {

      "route": "/investigation",

      "title": "Investigation",

      "subtitle": "Trace how AutoRAG reached an answer.",

      "purpose": "Make multi-hop reasoning and retrieval visible instead of hiding it.",

      "sections": [

        "Original Query",

        "Complexity Classification",

        "Selected Strategy",

        "Query Decomposition",

        "Retrieval Timeline",

        "Evidence",

        "Reasoning Summary",

        "Final Answer"

      ],

      "timeline_components": [

        "Complexity classification",

        "Query decomposition",

        "Retrieval #1",

        "Evidence evaluation",

        "Retrieval #2",

        "Evidence evaluation",

        "Retrieval #3",

        "Cross-document synthesis",

        "Final answer"

      ]

    },

    "knowledge_base": {

      "route": "/knowledge-base",

      "title": "Knowledge Base",

      "subtitle": "Vehicle documentation available to AutoRAG.",

      "stats": {

        "documents": "10",

        "chunks": "2,846",

        "indexed": "100%",

        "last_updated": "Today"

      },

      "documents": [

        {

          "name": "Owner's Manual",

          "type": "PDF",

          "pages": 142,

          "chunks": 624,

          "status": "Indexed"

        },

        {

          "name": "Maintenance Schedule",

          "type": "PDF",

          "pages": 48,

          "chunks": 213,

          "status": "Indexed"

        },

        {

          "name": "Service Manual",

          "type": "PDF",

          "pages": 328,

          "chunks": 1104,

          "status": "Indexed"

        },

        {

          "name": "Troubleshooting Guide",

          "type": "PDF",

          "pages": 186,

          "chunks": 687,

          "status": "Indexed"

        },

        {

          "name": "Engine System Guide",

          "type": "PDF",

          "pages": 94,

          "chunks": 318,

          "status": "Indexed"

        },

        {

          "name": "Transmission & Clutch Guide",

          "type": "PDF",

          "pages": 112,

          "chunks": 391,

          "status": "Indexed"

        },

        {

          "name": "Fuel System Guide",

          "type": "PDF",

          "pages": 88,

          "chunks": 302,

          "status": "Indexed"

        },

        {

          "name": "Electrical System Guide",

          "type": "PDF",

          "pages": 76,

          "chunks": 251,

          "status": "Indexed"

        },

        {

          "name": "Brake & Suspension Guide",

          "type": "PDF",

          "pages": 103,

          "chunks": 277,

          "status": "Indexed"

        },

        {

          "name": "Service Invoices",

          "type": "PDF",

          "pages": 20,

          "chunks": 218,

          "status": "Indexed"

        }

      ],

      "features": [

        "Search documents",

        "Filter by document type",

        "View document",

        "View metadata",

        "Upload document mock",

        "Re-index mock",

        "Delete mock"

      ]

    },

    "evaluation": {

      "route": "/evaluation",

      "title": "Adaptive RAG Evaluation",

      "subtitle": "Measure routing accuracy, answer quality and efficiency.",

      "metrics": [

        {

          "name": "Routing Accuracy",

          "value": "94.7%"

        },

        {

          "name": "Answer Accuracy",

          "value": "91.8%"

        },

        {

          "name": "Average Latency",

          "value": "1.63s"

        },

        {

          "name": "Queries Evaluated",

          "value": "21"

        }

      ],

      "strategy_performance": [

        {

          "strategy": "Direct LLM",

          "queries": 7,

          "accuracy": "92.3%",

          "latency": "0.68s",

          "retrievals": 0

        },

        {

          "strategy": "Single-Step RAG",

          "queries": 7,

          "accuracy": "94.1%",

          "latency": "1.37s",

          "retrievals": 1

        },

        {

          "strategy": "Agentic Multi-Hop RAG",

          "queries": 7,

          "accuracy": "89.7%",

          "latency": "2.84s",

          "retrievals": 3.4

        }

      ],

      "comparison": {

        "title": "Always RAG vs Adaptive RAG",

        "always_rag": {

          "latency": "2.14s",

          "description": "Every query performs retrieval regardless of complexity."

        },

        "adaptive_rag": {

          "latency": "1.63s",

          "description": "Retrieval depth is selected according to query complexity."

        }

      },

      "confusion_matrix": {

        "labels": [

          "SIMPLE",

          "MEDIUM",

          "COMPLEX"

        ],

        "values": [

          [7, 0, 0],

          [1, 6, 0],

          [0, 1, 6]

        ]

      },

      "evaluation_queries": {

        "total": 21,

        "simple": 7,

        "medium": 7,

        "complex": 7

      }

    },

    "about": {

      "route": "/about",

      "title": "How Adaptive RAG Works",

      "sections": [

        {

          "title": "Traditional RAG",

          "description": "Every query follows the same retrieval pipeline."

        },

        {

          "title": "Adaptive RAG",

          "description": "The system first estimates query complexity and selects an appropriate retrieval strategy."

        },

        {

          "title": "Simple Queries",

          "description": "Direct LLM response when external retrieval is unnecessary."

        },

        {

          "title": "Medium Queries",

          "description": "Single-step retrieval when one relevant source is enough."

        },

        {

          "title": "Complex Queries",

          "description": "Iterative multi-hop retrieval when multiple pieces of evidence must be connected."

        }

      ],

      "research_objective": "Determine whether complexity-based routing can reduce unnecessary retrieval and latency while maintaining answer quality for complex troubleshooting queries."

    }

  },

  "demo_scenarios": [

    {

      "id": "simple-demo",

      "label": "Simple Query",

      "query": "What does an engine air filter do?",

      "complexity": "SIMPLE",

      "confidence": 0.98,

      "strategy": "DIRECT_LLM",

      "retrieval_count": 0,

      "iterations": 0,

      "latency_ms": 620,

      "reason": "General automotive knowledge is sufficient; vehicle-specific documentation is unnecessary.",

      "answer": "An engine air filter removes dust and debris from the air entering the engine so the engine receives cleaner air for combustion.",

      "sources": []

    },

    {

      "id": "medium-demo",

      "label": "Medium Query",

      "query": "When should the air filter be replaced according to the manufacturer's maintenance schedule?",

      "complexity": "MEDIUM",

      "confidence": 0.96,

      "strategy": "SINGLE_STEP_RAG",

      "retrieval_count": 1,

      "iterations": 0,

      "latency_ms": 1310,

      "reason": "The answer depends on vehicle-specific maintenance documentation.",

      "answer": "According to the vehicle maintenance documentation, the air filter should be inspected and replaced according to the specified service interval and operating conditions.",

      "sources": [

        {

          "document": "Maintenance Schedule",

          "page": 18,

          "section": "Engine Maintenance",

          "relevance": 0.94,

          "excerpt": "Air filter inspection and replacement should be performed according to the specified service interval."

        }

      ]

    },

    {

      "id": "complex-demo",

      "label": "Complex Troubleshooting",

      "query": "My car has poor mileage, hard clutch operation and sometimes moves forward without pressing the accelerator. Based on my maintenance history and the manufacturer's troubleshooting documentation, what should I inspect first?",

      "complexity": "COMPLEX",

      "confidence": 0.95,

      "strategy": "AGENTIC_MULTI_HOP_RAG",

      "retrieval_count": 3,

      "iterations": 2,

      "latency_ms": 2840,

      "reason": "Multiple symptoms require evidence from different vehicle systems and maintenance history.",

      "sub_questions": [

        "What documented issues can contribute to poor fuel mileage?",

        "What documented causes can result in hard clutch operation?",

        "What can cause abnormal vehicle movement or idle/throttle behavior?"

      ],

      "retrieval_steps": [

        {

          "step": 1,

          "query": "poor fuel mileage causes",

          "documents": [

            "Maintenance Schedule",

            "Fuel System Guide"

          ]

        },

        {

          "step": 2,

          "query": "hard clutch operation causes",

          "documents": [

            "Transmission & Clutch Guide",

            "Service Manual"

          ]

        },

        {

          "step": 3,

          "query": "abnormal idle and throttle behavior",

          "documents": [

            "Troubleshooting Guide",

            "Engine System Guide"

          ]

        }

      ],

      "sources": [

        {

          "document": "Maintenance Schedule",

          "page": 18,

          "section": "Engine Maintenance",

          "relevance": 0.94

        },

        {

          "document": "Fuel System Guide",

          "page": 41,

          "section": "Fuel Economy",

          "relevance": 0.91

        },

        {

          "document": "Transmission & Clutch Guide",

          "page": 63,

          "section": "Clutch Operation",

          "relevance": 0.92

        },

        {

          "document": "Troubleshooting Guide",

          "page": 27,

          "section": "Idle and Throttle",

          "relevance": 0.89

        },

        {

          "document": "Service Invoices",

          "page": 6,

          "section": "Recent Service History",

          "relevance": 0.87

        }

      ],

      "final_answer": {

        "summary": "The symptoms should be investigated as separate but potentially related systems rather than assuming one definitive fault.",

        "recommendations": [

          {

            "priority": 1,

            "title": "Inspect air/fuel maintenance items",

            "reason": "Poor mileage can be associated with maintenance-related fuel and intake issues."

          },

          {

            "priority": 2,

            "title": "Inspect idle and throttle system",

            "reason": "Unexpected vehicle movement or abnormal idle behavior warrants inspection of the relevant idle/throttle components."

          },

          {

            "priority": 3,

            "title": "Inspect clutch adjustment and cable/assembly condition",

            "reason": "Hard clutch operation should be checked against the documented clutch inspection procedure."

          },

          {

            "priority": 4,

            "title": "Review recent maintenance history",

            "reason": "Recent service records may indicate which components were inspected or replaced."

          }

        ]

      }

    }

  ],

  "investigation_ui": {

    "complex_query_display": {

      "header": "Agentic Investigation",

      "status": "Completed",

      "steps": [

        {

          "number": 1,

          "title": "Query Complexity Classification",

          "status": "completed",

          "detail": "Classified as COMPLEX with 95% confidence."

        },

        {

          "number": 2,

          "title": "Query Decomposition",

          "status": "completed",

          "detail": "Generated 3 focused sub-questions."

        },

        {

          "number": 3,

          "title": "Fuel-System Retrieval",

          "status": "completed",

          "detail": "Retrieved evidence from Maintenance Schedule and Fuel System Guide."

        },

        {

          "number": 4,

          "title": "Clutch-System Retrieval",

          "status": "completed",

          "detail": "Retrieved evidence from Transmission & Clutch Guide and Service Manual."

        },

        {

          "number": 5,

          "title": "Idle/Throttle Retrieval",

          "status": "completed",

          "detail": "Retrieved evidence from Troubleshooting Guide and Engine System Guide."

        },

        {

          "number": 6,

          "title": "Maintenance History Check",

          "status": "completed",

          "detail": "Cross-referenced recent service records."

        },

        {

          "number": 7,

          "title": "Evidence Synthesis",

          "status": "completed",

          "detail": "Combined evidence across multiple documents."

        }

      ]

    }

  },

  "answer_ui": {

    "required_sections": [

      "Answer Summary",

      "Recommended Inspection Order",

      "Evidence",

      "Sources",

      "System Metrics",

      "Safety Notice"

    ],

    "recommendation_style": "ranked cards",

    "source_style": "document evidence cards",

    "metrics": [

      "Complexity",

      "Confidence",

      "Strategy",

      "Latency",

      "Retrieval Count",

      "Reasoning Iterations"

    ]

  },

  "source_ui": {

    "source_card_fields": [

      "Document",

      "Page",

      "Section",

      "Relevance",

      "Status"

    ],

    "interaction": "Clicking a source opens a side drawer containing metadata and a realistic excerpt.",

    "source_drawer": [

      "Document title",

      "Page number",

      "Section",

      "Relevant excerpt",

      "Relevance score",

      "Why this source was used"

    ]

  },

  "complexity_states": {

    "SIMPLE": {

      "color": "green",

      "icon": "circle-check",

      "label": "Simple",

      "strategy": "Direct LLM",

      "retrieval": "None",

      "message": "No retrieval required."

    },

    "MEDIUM": {

      "color": "amber",

      "icon": "search",

      "label": "Medium",

      "strategy": "Single-Step RAG",

      "retrieval": "1 retrieval",

      "message": "Vehicle-specific evidence required."

    },

    "COMPLEX": {

      "color": "red",

      "icon": "network",

      "label": "Complex",

      "strategy": "Agentic Multi-Hop RAG",

      "retrieval": "Multiple retrievals",

      "message": "Multiple evidence sources and iterative reasoning required."

    }

  },

  "evaluation_dataset": {

    "simple": [

      "What is engine coolant?",

      "What does an air filter do?",

      "What is a spark plug?",

      "What does a clutch do?",

      "What is an alternator?",

      "What is engine oil?",

      "What does a battery do?"

    ],

    "medium": [

      "What engine oil does the manufacturer recommend?",

      "What is the recommended tyre pressure?",

      "When should the air filter be replaced?",

      "When should spark plugs be replaced?",

      "What coolant specification is recommended?",

      "What is the recommended service interval?",

      "What is the recommended clutch inspection interval?"

    ],

    "complex": [

      "My mileage has dropped significantly. What should I inspect first?",

      "My clutch feels hard. Based on the service documentation, what are the possible causes?",

      "The engine idles roughly after starting. What systems should I investigate?",

      "My vehicle overheats only when the AC is running. What could cause this?",

      "My car has poor mileage and rough idle. Which maintenance items should I check together?",

      "My vehicle has poor mileage, a hard clutch and abnormal idle. Which issues could be related and what should I inspect first?",

      "Based on my recent maintenance history and the manufacturer's maintenance schedule, what service items may be overdue?"

    ]

  },

  "evaluation_visuals": {

    "charts": [

      "Strategy Accuracy",

      "Strategy Latency",

      "Retrieval Count by Strategy",

      "Always RAG vs Adaptive RAG Latency"

    ],

    "tables": [

      "Strategy Performance",

      "Evaluation Query Results"

    ],

    "matrix": "Complexity Classifier Confusion Matrix",

    "filters": [

      "All",

      "Simple",

      "Medium",

      "Complex",

      "Correct",

      "Incorrect"

    ]

  },

  "mock_service_architecture": {

    "important": "Keep all mock backend behavior in dedicated service modules, not inside page components.",

    "services": [

      {

        "name": "classifierService",

        "future_endpoint": "POST /api/classify"

      },

      {

        "name": "ragService",

        "future_endpoint": "POST /api/query"

      },

      {

        "name": "agenticRagService",

        "future_endpoint": "POST /api/query"

      },

      {

        "name": "vehicleService",

        "future_endpoint": "GET/POST /api/vehicles"

      },

      {

        "name": "knowledgeBaseService",

        "future_endpoint": "GET/POST /api/documents"

      },

      {

        "name": "evaluationService",

        "future_endpoint": "GET/POST /api/evaluation"

      }

    ],

    "mock_behavior": {

      "deterministic": true,

      "no_random_values": true,

      "same_query_same_result": true,

      "simulate_latency": true,

      "simulate_progress": true

    }

  },

  "future_api_contract": {

    "ask": {

      "method": "POST",

      "endpoint": "/api/query",

      "request": {

        "query": "string",

        "vehicle_id": "string"

      },

      "response": {

        "answer": "string",

        "complexity": "SIMPLE | MEDIUM | COMPLEX",

        "confidence": "number",

        "strategy": "DIRECT_LLM | SINGLE_STEP_RAG | AGENTIC_MULTI_HOP_RAG",

        "sources": "array",

        "steps": "array",

        "metrics": {

          "latency_ms": "number",

          "retrieval_count": "number",

          "iterations": "number"

        }

      }

    }

  },

  "reusable_components": [

    "Sidebar",

    "TopBar",

    "VehicleSelector",

    "MetricCard",

    "QueryComposer",

    "ComplexityBadge",

    "StrategyBadge",

    "AdaptivePipeline",

    "PipelineNode",

    "InvestigationTimeline",

    "RetrievalStep",

    "EvidenceCard",

    "SourceDrawer",

    "AnswerCard",

    "SafetyNotice",

    "LatencyChart",

    "AccuracyChart",

    "ConfusionMatrix",

    "PerformanceTable",

    "DocumentCard",

    "DocumentTable",

    "VehicleProfile",

    "MaintenanceTimeline",

    "DemoSelector",

    "LoadingState",

    "EmptyState",

    "ErrorState"

  ],

  "interaction_requirements": {

    "navigation": "All sidebar navigation items must work.",

    "query_chips": "Clicking an example query populates the composer.",

    "query_submission": "Run deterministic demo based on query.",

    "analysis_animation": "Show classification and selected strategy before final answer.",

    "complex_investigation": "Animate investigation steps sequentially.",

    "source_click": "Open source detail drawer.",

    "vehicle_edit": "Open mock vehicle edit modal.",

    "service_record": "Open mock add service record modal.",

    "document_upload": "Open mock upload modal with simulated progress.",

    "evaluation_filters": "Filter evaluation rows.",

    "charts": "Interactive tooltips.",

    "responsive": true

  },

  "safety": {

    "required": true,

    "notice": "AutoRAG provides documentation-grounded troubleshooting guidance and does not replace professional vehicle inspection.",

    "critical_cases": [

      "brake failure",

      "steering problems",

      "fuel leaks",

      "severe overheating",

      "electrical hazards",

      "engine runaway",

      "other safety-critical symptoms"

    ],

    "behavior": "For safety-critical queries, display a prominent professional-inspection warning."

  },

  "demo_mode": {

    "enabled_by_default": true,

    "badge": "DEMO MODE",

    "description": "Frontend prototype using deterministic mock Adaptive RAG responses.",

    "controls": [

      "Run Simple Demo",

      "Run Medium Demo",

      "Run Complex Demo",

      "Run All 3"

    ],

    "run_all": {

      "sequence": [

        "simple-demo",

        "medium-demo",

        "complex-demo"

      ],

      "final_comparison": true

    }

  },

  "run_all_demo_summary": {

    "title": "One Query. Three Possible Strategies.",

    "rows": [

      {

        "complexity": "SIMPLE",

        "strategy": "Direct LLM",

        "latency": "0.62s",

        "retrievals": 0

      },

      {

        "complexity": "MEDIUM",

        "strategy": "Single-Step RAG",

        "latency": "1.31s",

        "retrievals": 1

      },

      {

        "complexity": "COMPLEX",

        "strategy": "Agentic Multi-Hop RAG",

        "latency": "2.84s",

        "retrievals": 3

      }

    ],

    "final_message": "AutoRAG adapts retrieval depth to the complexity of the question."

  },

  "code_quality": {

    "requirements": [

      "TypeScript types for all important data structures",

      "Reusable components",

      "No giant monolithic component",

      "No duplicated demo logic",

      "Separate mock services from UI",

      "Centralized demo data",

      "Clean routing",

      "Responsive layout",

      "Accessible controls",

      "No console errors",

      "No broken links",

      "No lorem ipsum",

      "No unfinished placeholder sections"

    ]

  },

  "important_visual_priority": [

    "Adaptive RAG branching visualization",

    "Complexity classification",

    "Selected strategy",

    "Agentic investigation timeline",

    "Evidence retrieval",

    "Final answer",

    "Evaluation metrics",

    "Always RAG vs Adaptive RAG comparison"

  ],

  "final_quality_bar": {

    "target": "A polished AI research/product demo suitable for a college project evaluation, technical presentation, hackathon demonstration or client presentation.",

    "first_impression": "The user should immediately understand that AutoRAG does NOT use one fixed RAG pipeline.",

    "core_story": [

      "Simple questions should be fast and avoid retrieval.",

      "Medium questions should retrieve relevant documentation once.",

      "Complex questions should perform deeper multi-hop investigation.",

      "The system exposes its route, evidence and metrics.",

      "Evaluation demonstrates why adaptive routing is useful."

    ]

  },

  "final_instruction_to_lovable": "Build the complete frontend application described above in one coherent implementation. Prioritize a polished working UI over adding backend functionality. Use deterministic mock data and mock services. Ensure every page, navigation item, button, demo scenario, chart, investigation trace and interaction works. Do not ask for clarification unless absolutely necessary. Make sensible implementation decisions while preserving the Adaptive RAG research concept. The final application must feel like a real AI research product rather than a generic chatbot."

}

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e7fe5b15-a6dc-4b36-a18d-e6df166d1978).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
