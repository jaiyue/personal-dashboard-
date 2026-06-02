from fastapi import APIRouter, HTTPException

from app.module_data import MODULES
from app.schemas import ModuleItem, ModuleSummary, NavigationItem, SystemStatus

router = APIRouter()


@router.get("/api/status", tags=["system"], response_model=SystemStatus)
def get_status() -> SystemStatus:
    return SystemStatus(
        name="Personal Hub API",
        version="0.1.0",
        database="SQLite",
        modules=[module["name"] for module in MODULES],
    )


@router.get("/api/modules", tags=["modules"], response_model=list[ModuleSummary])
def list_modules() -> list[ModuleSummary]:
    return [
        ModuleSummary(
            name=module["name"],
            slug=module["slug"],
            description=module["description"],
            items=[item["name"] for item in module["items"]],
        )
        for module in MODULES
        if module["slug"] != "dashboard"
    ]


@router.get("/api/navigation", tags=["modules"], response_model=list[NavigationItem])
def get_navigation() -> list[NavigationItem]:
    return [
        NavigationItem(
            name=module["name"],
            slug=module["slug"],
            description=module["description"],
            items=[
                ModuleItem(
                    name=item["name"],
                    slug=item["slug"],
                    description=item["description"],
                )
                for item in module["items"]
            ],
        )
        for module in MODULES
    ]


@router.get("/api/modules/{module_slug}", tags=["modules"], response_model=NavigationItem)
def get_module(module_slug: str) -> NavigationItem:
    module = next((module for module in MODULES if module["slug"] == module_slug), None)

    if module is None:
        raise HTTPException(status_code=404, detail="Module not found")

    return NavigationItem(
        name=module["name"],
        slug=module["slug"],
        description=module["description"],
        items=[
            ModuleItem(
                name=item["name"],
                slug=item["slug"],
                description=item["description"],
            )
            for item in module["items"]
        ],
    )
