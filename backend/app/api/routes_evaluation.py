from fastapi import APIRouter
from app.evaluation.runner import evaluation_runner

router_eval = APIRouter(prefix="/api/evaluation", tags=["Evaluation"])

@router_eval.post("/run")
async def run_evaluation_endpoint():
    res = await evaluation_runner.run_evaluation()
    return res

@router_eval.get("/results")
async def get_evaluation_results_endpoint():
    res = await evaluation_runner.run_evaluation()
    return res
