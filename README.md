# 👶 E-Mawleed | المنظومة الرقمية لتسجيل المواليد والأحوال المدنية المصرية

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)](https://www.docker.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Document_Archive-3448C5?logo=cloudinary)](https://cloudinary.com/)

An enterprise-grade, localized **Full-Stack Digital Birth Registration & Vital Statistics Management System** tailored to the Egyptian healthcare and civil registry protocols. Built with the **MERN** stack (MongoDB, Express, React 18, Node.js) and 100% strict **TypeScript**.

The platform automates the end-to-end civil registry lifecycle: from hospital birth notifications (*إخطار ولادة*) and health unit medical screening, to automated 14-digit Egyptian National ID generation (*الرقم القومي*), digital birth certificate issuance with cryptographically signed QR codes, and mandatory immunization schedules aligned with the **Egyptian Ministry of Health & Population (MoHP)**.

---

## 🌟 Key Features & Role Portals

### 👨‍👩‍👧 1. Citizens & Parents Portal (*بوابة أولياء الأمور*)
- **Newborn Pre-Registration:** Parents can initiate birth reporting by linking hospital delivery notifications with parental National IDs and marriage certificate numbers.
- **Automated Digital Birth Certificate:** Instant download of verified, print-ready PDF birth certificates (*شهادة ميلاد مميكنة*) equipped with high-security watermarks, the Egyptian coat of arms, and tamper-proof QR verification.
- **National Vaccination Tracker:** Dynamic schedule of mandatory infant vaccines (from birth BCG/Hepatitis B to 18-month MMR boosters) with SMS/WhatsApp notifications for upcoming health unit clinic dates.
- **Civil Status Timeline:** Real-time tracking of registration status (`Hospital Certified` ➔ `Health Unit Audit` ➔ `Civil Registry Approved` ➔ `National ID Minted`).

### 🏥 2. Hospital & Maternity Ward Registrar (*مسجل المستشفى والوحدة الصحية*)
- **Birth Notification Issuance (*إخطار الولادة الطبي*):** Secure digital submission of neonatal delivery records, including delivery method (Normal/C-Section), exact delivery timestamp, neonatologist license, gestational age, APGAR scores (1 min / 5 min), and birth weight.
- **Infant Health Screening Checklist:** Immediate logging of the Guthrie heel-prick test (Congenital Hypothyroidism & PKU testing) and critical congenital heart defect (CCHD) screening.
- **Parental Identity Verification:** Algorithmic verification against Egyptian National ID format standards, preventing duplicate or fraudulent infant claims.
- **Direct Health Unit Routing:** Automated dispatch of birth records to the local health office (*مكتب صحة*) based on maternal residence and geographical governorate codes.

### 🏛️ 3. Civil Registry Office Console (*منظومة موظف السجل المدني*)
- **Automated 14-Digit National ID Minting Engine:** Generates official Egyptian National IDs adhering to legal algorithmic standards:
  $$\text{Century} + \text{YYMMDD} + \text{Governorate Code (01-88)} + \text{Unique Sequence} + \text{Gender Parity (Odd/Even)} + \text{Checksum}$$
- **Legal Validation & Name Sanity Engine:** Enforces Egyptian civil registration laws (validates quadruple names, prohibits compound names *الأسماء المركبة*, and blocks prohibited naming conventions).
- **Batch Verification & Digital Signatures:** Civil officers approve or reject pending birth submissions with cryptographic audit trails and digital notary seals.
- **Physical Document Archiving:** Upload, preview, and archive scanned stamped physical certificates into secure encrypted storage via **Cloudinary**.

### 📊 4. MoHP & CAPMAS Demographic Intelligence (*لوحة المؤشرات والتحليلات الديموغرافية*)
- **Real-Time Fertility & Birth Heatmaps:** Powered by **Recharts**, tracking live birth rates categorized across all 27 Egyptian Governorates (Cairo, Giza, Alexandria, Upper Egypt, Delta, Frontier regions).
- **Epidemiological & Infant Health Metrics:** Monitor average birth weights, C-section vs. vaginal delivery ratios, and primary health unit workload distributions.
- **Vaccination Compliance Tracking:** Audits completion rates of mandatory infant immunizations per health directorate to eradicate immunization dropouts.

### 🛡️ 5. Security & Verification Engine
- **Cryptographic QR Code Verifier:** Publicly accessible verification endpoint (`/verify/:certificateUuid`) validating certificate authenticity, issuing officer, and civil registry record hash without exposing sensitive PII.
- **Role-Based Access Control (RBAC):** Strict isolation between Citizens, Doctors/Registrars, Civil Registry Officers, and Central Administrators.
- **Immutable Audit Trail:** All edits to infant parentage, names, and date of birth are permanently logged with IP address, timestamp, and officer credentials.

---

## 🇪🇬 Egyptian National ID Algorithmic Spec

The system implements the official **14-digit Egyptian National ID (`الرقم القومي`)** decoding and generation standard:

```text
Position:  [ 1 ] [ 2 - 7 ] [ 8 - 9 ] [ 10 - 12 ] [ 13 ] [ 14 ]
Example:     3     0 4 0 5 1 2     0 1       0 2 5       1      8
             │          │           │          │         │      └─ Checksum digit
             │          │           │          │         └──────── Gender (Odd = Male, Even = Female)
             │          │           │          └────────────────── Daily Sequence Number
             │          │           └───────────────────────────── Governorate Code (01: Cairo, 21: Giza, etc.)
             │          └───────────────────────────────────────── Date of Birth (YY-MM-DD: May 12, 2004)
             └──────────────────────────────────────────────────── Century (2 = 1900-1999, 3 = 2000-2099)
