# 🔍 ForensiQ  
## AI Powered Mobile Forensic Investigation Platform

![ForensiQ](https://img.shields.io/badge/ForensiQ-Mobile%20Forensics-blue)
![Frontend](https://img.shields.io/badge/Frontend-React.js-cyan)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![Python](https://img.shields.io/badge/Python-3.x-yellow)

---

## 📌 Overview

**ForensiQ** is an advanced mobile forensic investigation platform designed to help investigators analyze, manage, and extract intelligence from digital evidence.

The platform provides a centralized forensic workspace where investigators can create cases, upload evidence, verify integrity using cryptographic hashing, and analyze different types of mobile artifacts.

The objective of ForensiQ is to build a modern, accessible alternative workflow inspired by professional mobile forensic tools.

---

# 🎯 Problem Statement

Digital investigations involve huge amounts of mobile evidence such as:

- Images
- Application packages (APK)
- SQLite databases
- Extracted mobile backups
- Documents

Traditional forensic tools are:

- Expensive
- Proprietary
- Complex for beginners

ForensiQ aims to provide an automated forensic analysis environment that simplifies evidence handling and investigation workflow.

---

# 🚀 Features

## 🗂 Investigation Case Management

- Create investigation cases
- Assign investigators
- Set case priority
- Maintain case status
- Dedicated case workspace


## 📂 Digital Evidence Management

- Upload forensic evidence
- Associate evidence with cases
- Store evidence metadata
- Track evidence status


## 🔐 Evidence Integrity Verification

ForensiQ generates cryptographic fingerprints using:

### SHA-256 Hashing

Features:

- Evidence authenticity verification
- Tamper detection
- Chain of custody support


## 🖼 Image Forensics

Supported formats:

- JPG
- JPEG
- PNG
- WEBP


Analysis includes:

- File size detection
- Image format identification
- Resolution extraction
- EXIF metadata extraction


Example extracted information:

```
File Type: Image

Resolution:
850 x 948

Format:
WEBP

SHA-256:
Generated Hash Value
```

---

## 📱 Android Evidence Analysis

Support for Android artifacts:

- APK file identification
- Application metadata analysis

Future enhancements:

- Permission extraction
- Malware indicators
- Manifest analysis


---

## 🗄 SQLite Database Forensics

Forensic analysis of mobile databases.

Current capabilities:

- SQLite detection
- Database metadata extraction
- Table identification
- Column extraction
- Row count analysis


Future capabilities:

- WhatsApp database parsing
- Browser history extraction
- Contacts extraction
- Deleted record analysis


---

# 🏗 System Architecture


```
                 Investigator

                      |

                      ↓

                 ForensiQ Platform

                      |

        --------------------------------

        |                              |

    Frontend                      Backend

    React.js                      FastAPI

    Tailwind CSS                  Python

                                   |

                                   ↓

                         Forensic Analyzer Engine

                                   |

        --------------------------------------------

        |              |             |              |

      Image          APK          SQLite        Reports

     Analysis     Analysis      Analysis      Generation

```

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Lucide React


## Backend

- FastAPI
- Python
- SQLAlchemy
- SQLite


## Security & Forensics

- SHA-256 Hashing
- File Metadata Extraction
- EXIF Analysis
- SQLite Analysis


## Libraries

- Pillow
- hashlib
- sqlite3

---

# 📁 Project Structure


```
ForensiQ

│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
│
├── backend
│   │
│   ├── app
│   │   ├── routers
│   │   ├── models
│   │   ├── services
│   │   └── main.py
│   │
│   └── requirements.txt
│
│
├── .gitignore
└── README.md

```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <repository-url>

cd ForensiQ
```

---

# Backend Setup

Navigate:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 🔄 Investigation Workflow


```
Create Case

      ↓

Upload Evidence

      ↓

Generate SHA-256 Hash

      ↓

Evidence Verification

      ↓

Artifact Analysis

      ↓

Forensic Findings

      ↓

Investigation Report

```

---

# 🔮 Future Roadmap

## Phase 1 ✅

- Case Management
- Evidence Upload
- SHA-256 Verification
- Image Analysis
- EXIF Extraction


## Phase 2 🚧

- APK Reverse Engineering
- SQLite Advanced Analysis
- WhatsApp Forensic Parser
- Browser Artifact Extraction


## Phase 3 🚀

- AI Forensic Assistant
- Suspicious Activity Detection
- Timeline Reconstruction
- Automated PDF Reports


---

# 🌟 Vision

ForensiQ aims to become an intelligent digital investigation assistant capable of analyzing mobile artifacts and helping investigators discover meaningful evidence faster.

---

# 👩‍💻 Developer

**Nancy Singh**

B.Tech Computer Science Engineering

Project:

**ForensiQ - AI Powered Mobile Forensic Investigation Platform**

---

# 📜 License

This project is developed for educational and research purposes.