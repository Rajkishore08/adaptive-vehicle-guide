from typing import List, Dict, Any, Tuple

SIMPLE_QUERIES = [
    "What is engine coolant?",
    "What does an air filter do?",
    "What is a spark plug?",
    "What does a clutch do?",
    "What is an alternator?",
    "What is engine oil?",
    "What does a battery do?",
]

MEDIUM_QUERIES = [
    "What engine oil does the manufacturer recommend?",
    "What is the recommended tyre pressure?",
    "When should the air filter be replaced?",
    "When should spark plugs be replaced?",
    "What coolant specification is recommended?",
    "What is the recommended service interval?",
    "What is the recommended clutch inspection interval?",
]

COMPLEX_QUERIES = [
    "My mileage has dropped significantly. What should I inspect first?",
    "My clutch feels hard. Based on the service documentation, what are the possible causes?",
    "The engine idles roughly after starting. What systems should I investigate?",
    "My vehicle overheats only when the AC is running. What could cause this?",
    "My car has poor mileage and rough idle. Which maintenance items should I check together?",
    "My vehicle has poor mileage, a hard clutch and abnormal idle. Which issues could be related and what should I inspect first?",
    "Based on my recent maintenance history and the manufacturer's maintenance schedule, what service items may be overdue?",
]

def get_21_query_dataset() -> List[Tuple[str, str]]:
    dataset = []
    for q in SIMPLE_QUERIES:
        dataset.append((q, "SIMPLE"))
    for q in MEDIUM_QUERIES:
        dataset.append((q, "MEDIUM"))
    for q in COMPLEX_QUERIES:
        dataset.append((q, "COMPLEX"))
    return dataset
