# bbq-chatbot
# BBQ Nation Booking & Enquiry Chatbot

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Architecture Diagram](#architecture-diagram)
- [Setup & Installation](#setup--installation)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Knowledge Base](#knowledge-base)
- [State Machine & Conversation Flow](#state-machine--conversation-flow)
- [Post-Call Analysis (Bonus)](#post-call-analysis-bonus)
- [Demo Links](#demo-links)
- [Agent Linked Phone Number](#agent-linked-phone-number)
- [Technical Documentation](#technical-documentation)
- [About Me](#about-me)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

This project implements an inbound enquiry and booking chatbot agent for **Barbeque Nation** (Delhi & Bangalore).  
It answers FAQs, takes new bookings, and handles booking updates/cancellations for Barbeque Nation properties.  
The system uses a state machine-based conversational flow, a structured knowledge base, and robust API endpoints.

---

## Features

- Conversational state machine for booking, enquiry, update, and cancellation flows
- Knowledge base API with 800-token response chunking and context-aware retrieval
- FAQ answering for both Delhi and Bangalore outlets
- Robust input validation and error handling
- (Bonus) Post-call/conversation analysis with Google Sheets integration
- Clean, modern frontend chat UI (Perplexity style)
- Easily extensible for new properties or features

---

## Architecture Diagram

![BBQ Nation Chatbot Flow](./Flow%20chart.jpg)

---

## Setup & Installation

### Prerequisites

- Python 3.9+ (for backend)
- Node.js 18+ and npm (for frontend)
- (Optional) Google Cloud service account credentials for Sheets integration

### Installation Steps

#### 1. Clone the Repository

git clone https://github.com/Ipshitakshl/agentops-template-repo.git
cd agentops-template-repo


#### 2. Backend Setup

cd backend
python -m venv venv

Activate the virtual environment:
-On Windows:
venv\Scripts\activate

-On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt


#### 3. Frontend Setup

cd ../frontend
npm install



#### 4. (Optional) Google Sheets Integration Setup

If you are implementing post-call analysis:
- Place your Google service account credentials JSON file in the `backend` folder.
- Update your backend code to use this credentials file for Google Sheets API access.

#### 5. Add Environment Variables (If Needed)

If your backend requires any API keys or environment variables, create a `.env` file in the `backend` directory and add your keys there.

---

## How to Run

### Backend

cd backend

Activate venv if not already
Windows:
venv\Scripts\activate

Mac/Linux:
source venv/bin/activate

uvicorn main:app --reload


### Frontend

cd frontend
npm run dev



- Open your browser and go to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal)

---

## API Endpoints

### Knowledge Base API

- **Endpoint:** `/knowledge`
- **Method:** `GET`
- **Query Parameter:** `query` (string)
- **Description:** Returns a chunked, contextually relevant answer (max 800 tokens) from the knowledge base.

**Example:**
GET /knowledge?query=What are the timings for Barbeque Nation Delhi?


### Chatbot WebSocket API

- **Endpoint:** `/chat`
- **Type:** WebSocket
- **Description:** Real-time conversational interface for bookings, FAQs, updates, and cancellations.

### (Bonus) Post-Call Analysis API

- **Endpoint:** `/post-call`
- **Method:** `POST`
- **Description:** Logs conversation summary and metadata to Google Sheets.

---

## Knowledge Base

- **Coverage:** FAQs, menu, timings, policies, booking procedures for Delhi & Bangalore outlets.
- **Structure:** Cleaned, categorized, and chunked for efficient retrieval.
- **Token Limit:** Each response capped at 800 tokens.
- **Fallback:** If information is not found, the system returns a polite, clear "information not found" message.

---

## State Machine & Conversation Flow

- **States:** Greeting, Booking (city, date, guests, confirmation), FAQ, Update, Cancel, End, etc.
- **Transitions:** Handled via Jinja-based prompt templates and conditional logic.
- **Flow:** See the [Architecture Diagram](#architecture-diagram) above.

---

## Post-Call Analysis (Bonus)

- **Google Sheet Link:** [https://docs.google.com/spreadsheets/d/1MyGT4HC5iyT5u6xDK1aLa8oEx3kod9SnyjR_6j9IfeQ/edit?gid=0](https://docs.google.com/spreadsheets/d/1MyGT4HC5iyT5u6xDK1aLa8oEx3kod9SnyjR_6j9IfeQ/edit?gid=0)
- **Fields Logged:** Modality, Call Time, Phone Number, Outcome, Booking Date, Guests, Call Summary, etc.
- **How it works:** After each conversation, a summary is posted to the Google Sheet via API.

---

## Demo Links

- **Knowledge Base API (if hosted):** [http://127.0.0.1:8000/knowledge](http://127.0.0.1:8000/knowledge)

- **Chatbot Demo (if hosted):** [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

- **Post-Call Analysis Sheet:** [https://docs.google.com/spreadsheets/d/1MyGT4HC5iyT5u6xDK1aLa8oEx3kod9SnyjR_6j9IfeQ/edit?gid=0](https://docs.google.com/spreadsheets/d/1MyGT4HC5iyT5u6xDK1aLa8oEx3kod9SnyjR_6j9IfeQ/edit?gid=0)

---

## Agent Linked Phone Number

- **Phone Number:** N/A

---

## Technical Documentation

### System Overview

- **Backend:** FastAPI, state machine for conversation, knowledge base chunking, error handling.
- **Frontend:** React + Vite, WebSocket connection, Perplexity-style chat UI.
- **Knowledge Base:** Cleaned and structured, with semantic search and token chunking.
- **Post-Call Analysis:** Google Sheets integration for conversation logging.

### API Documentation

#### `/knowledge`
- **GET**: Returns knowledge base answer for a query (max 800 tokens).

#### `/chat`
- **WebSocket**: Handles conversational flow (booking, FAQ, update/cancel).

#### `/post-call` (Bonus)
- **POST**: Logs conversation data to Google Sheets.

### Error Handling

- Input validation at each state
- Graceful fallback for missing information
- API error responses with clear messages

### State Machine

- Each state uses a Jinja template for prompt generation.
- Transitions are handled by evaluating user input and context.

---


## About Me

As a motivated and curious learner, I approached this project with limited prior experience in building chatbots from scratch. The process of designing and developing the BBQ Nation Booking & Enquiry Chatbot has been truly enlightening. I leveraged my foundational knowledge along with resources like Perplexity, YouTube tutorials, and various online communities to bridge knowledge gaps and implement each component of the system.

Although I initially applied for the Project Analyst Intern role, I found this technical assignment both challenging and rewarding. It offered me a unique opportunity to step out of my comfort zone, learn new technologies, and deliver a functional solution that meets real-world requirements. This experience has deepened my understanding of conversational AI, API design, and full-stack development.

I am excited about the possibility of contributing further at Formi, and I look forward to the next steps in the process!

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.
