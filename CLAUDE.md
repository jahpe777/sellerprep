# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (React + Vite + TypeScript)
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production (runs tsc -b && vite build)
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend (Django + PostgreSQL)
```bash
cd backend
python manage.py runserver         # Start Django development server (port 8000)
python manage.py migrate          # Run database migrations
python manage.py makemigrations   # Create new migrations
python manage.py createsuperuser  # Create Django admin user
python manage.py collectstatic    # Collect static files for production
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite, React Router, Axios
- **Backend**: Django 5.2, Django REST Framework, JWT Authentication
- **Database**: PostgreSQL
- **File Uploads**: Django FileField/ImageField with media storage

### Project Structure
- `frontend/`: React TypeScript application
- `backend/`: Django REST API
- `backend/core/`: Main Django app containing models, views, serializers
- `backend/config/`: Django project configuration
- `backend/media/`: File upload storage (documents/ and property_images/)

### Data Model
The application is organized around a hierarchical structure:
- **Property**: Main entity representing a house/property owned by a user
- **Section**: Organizational units within a property (e.g., "Kitchen", "Electrical")
- **Document**: PDFs and files uploaded to sections
- **PropertyImage**: Images uploaded to sections
- **Note**: Text notes attached to sections

### API Communication
- Frontend proxies `/api` requests to Django backend on port 8000 (via Vite config)
- JWT authentication with access/refresh tokens stored in localStorage
- Axios interceptor handles 401 responses by clearing tokens and redirecting to login

### Key Components
- **AddPropertyForm**: Property creation with Google Places autocomplete
- **PropertyTabs**: Navigation between different properties
- **SectionTabs**: Navigation between sections within a property
- **ContentTabs**: Switches between Documents, Images, and Notes within a section

### Authentication Flow
- JWT tokens managed via localStorage
- Session expiration triggers automatic logout and redirect
- Custom axios interceptor in `frontend/src/axiosConfig.ts` handles token refresh

### File Upload Patterns
- Documents stored in `backend/media/documents/`
- Images stored in `backend/media/property_images/`
- Both associate with Property and optionally with Section