# Personal Hub

[中文版说明](README.zh-CN.md)

A personal knowledge management and portfolio platform designed to centralise career development, project documentation, travel planning, and personal collections in a single system.

## Overview

Personal Hub is an integrated platform that combines the functionality of a portfolio website, CV management system, travel planner, and digital collection database. The goal is to reduce information fragmentation by providing a structured environment where personal achievements, projects, travel experiences, and collected items can be stored, organised, searched, and reused.

The platform is designed for long-term personal use while also serving as a demonstration of full-stack software engineering, database design, and AI-assisted information management.

## Tech Stack

- Frontend: `Next.js`
- Backend: `Python (FastAPI)`
- Database: `SQLite`
- UI: `Tailwind CSS` + `shadcn/ui`

## Initial Architecture

```text
Personal Hub
│
├── Dashboard
│
├── CV Manager
│   ├── Education
│   ├── Experience
│   ├── Projects
│   └── Skills
│
├── Portfolio
│   ├── AI Quiz Show
│   ├── LFA Analysis
│   └── Energy Trading
│
├── Travel Planner
│   ├── Countries
│   ├── Trips
│   └── AI Generator
│
├── Postcard Collection
│   ├── Images
│   ├── Maps
│   └── Tags
│
└── AI Assistant
    ├── Generate CV
    ├── Generate Cover Letter
    ├── Generate Travel Plan
    └── Summarise Projects
```

## Objectives

- Maintain a structured database of education, skills, projects, and experiences.
- Generate tailored CVs and application materials from stored records.
- Showcase projects and achievements through a personal portfolio.
- Manage travel plans, itineraries, and destination research.
- Organise and catalogue personal collections such as postcards.
- Explore AI-assisted content generation and knowledge retrieval.

## Core Features

### CV & Career Management

Store and organise:

- Education history
- Work experience
- Research projects
- Technical skills
- Certifications
- Awards and achievements

Capabilities:

- Search and filter experiences
- Generate role-specific CVs
- Export career information
- Maintain a single source of truth for professional records

### Portfolio Management

Maintain detailed project records including:

- Project descriptions
- Technologies used
- Screenshots and media
- GitHub repositories
- Demonstration links
- Development timelines

Capabilities:

- Featured project showcase
- Technology-based filtering
- Automatic project summaries
- Portfolio presentation pages

### Travel Planner

Store travel-related information:

- Countries and cities visited
- Planned future trips
- Budgets and expenses
- Attractions and activities
- Accommodation records

Capabilities:

- AI-generated itineraries
- Destination recommendations
- Trip history tracking
- Travel note management

### Postcard Collection Database

Digitally catalogue postcard collections with:

- Images
- Country of origin
- City
- Date acquired
- Category tags
- Personal notes

Capabilities:

- Search and browse collection
- Geographic organisation
- Collection statistics
- Visual gallery view

### AI Assistant

AI-powered tools integrated into the platform:

- CV generation
- Project description generation
- Cover letter drafting
- Travel itinerary generation
- Knowledge summarisation

## System Architecture

Frontend:

- Next.js
- Tailwind CSS
- shadcn/ui

Backend:

- FastAPI

Database:

- SQLite (initial version)
- PostgreSQL (future scalability)

AI Services:

- OpenAI API
- Local LLM support (future)

## Database Modules

### Career Database

- Education
- Experience
- Skills
- Certifications

### Project Database

- Projects
- Technologies
- Media Assets

### Travel Database

- Trips
- Destinations
- Travel Notes

### Collection Database

- Postcards
- Categories
- Locations

## Future Development

Planned features:

- Authentication and user accounts
- Interactive travel maps
- AI semantic search
- Automated CV optimisation
- Project analytics dashboard
- Mobile-friendly interface
- Cloud synchronisation
- Multi-language support

## Motivation

Personal information is often scattered across documents, spreadsheets, note-taking applications, cloud storage, and portfolio websites. This project aims to create a unified personal ecosystem where information can be stored once and reused across multiple contexts.

The platform also serves as a practical demonstration of database design, full-stack development, API integration, and AI-assisted productivity tools.
