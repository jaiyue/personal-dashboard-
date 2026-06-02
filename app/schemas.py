from pydantic import BaseModel


class SystemStatus(BaseModel):
    name: str
    version: str
    database: str
    modules: list[str]


class ModuleSummary(BaseModel):
    name: str
    slug: str
    description: str
    items: list[str]


class ModuleItem(BaseModel):
    name: str
    slug: str
    description: str


class NavigationItem(BaseModel):
    name: str
    slug: str
    description: str
    items: list[ModuleItem]
