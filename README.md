# Dhruv Mishra — Cybersecurity Portfolio

A responsive dark-tech portfolio built with HTML, CSS, vanilla JavaScript, Python Flask and SQLite.

## Features

- Responsive layout for desktop, tablet and mobile
- Sticky navigation and mobile menu
- Hero section using the uploaded profile photograph
- Download button linked to the uploaded resume PDF
- About, skills, learning journey, projects, research, credentials, services and contact sections
- Contact form with browser-side validation and Flask server-side validation
- Contact messages saved to `portfolio_messages.db`
- Social profile links and verified repository links supplied in the project brief

## Requirements

- Windows 10/11
- Python 3.10 or newer
- VS Code (recommended)

## Run in VS Code on Windows 11

1. Extract `dhruv-portfolio.zip`.
2. Open VS Code.
3. Select **File → Open Folder** and choose the extracted `dhruv-portfolio` folder.
4. Open **Terminal → New Terminal**.
5. Create a virtual environment:

   ```powershell
   python -m venv venv
   ```

6. Activate it in PowerShell:

   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

   If PowerShell blocks activation, use Command Prompt terminal instead:

   ```bat
   venv\Scripts\activate
   ```

7. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

8. Start the Flask app:

   ```bash
   python app.py
   ```

9. Open this address in your browser:

   `http://127.0.0.1:5000`

The SQLite database and `messages` table are created automatically when the app starts. Contact submissions are stored locally in `portfolio_messages.db`.

## Project structure

```text
dhruv-portfolio/
├── app.py
├── requirements.txt
├── README.md
├── portfolio_messages.db
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    ├── images/
    │   ├── profile.png
    │   └── certificates/
    └── Dhruv_Resume.pdf
```

## Add certificate images later

No certificate image files were present in the uploaded materials. The website currently lists the credential names and details without pretending that placeholder images are real certificates.

To add the original certificate scans:
1. Copy the actual certificate image files into `static/images/certificates/`.
2. Add corresponding image cards in `templates/index.html`.
3. Use descriptive `alt` text and keep the original certificate details unchanged.

## Personal details and accuracy notes

- Education CGPAs and contact information are taken from the uploaded resume.
- The supplied resume lists B.Sc. CGPA as **7.25/10**.
- The Tinkering Lab and Sales Analytics repository URLs are the specific URLs supplied in the brief.
- Where a project repository URL was not supplied, the project links to the GitHub profile rather than an invented repository.
- The SSH/Splunk project is marked **In progress**.
- The brief mentions additional one-month HCLTech/NIELIT internship experiences but the uploaded resume does not provide exact role titles or dates. They have not been represented as verified internship entries.
- The contact form stores messages in the local SQLite database; it does not email them automatically. For a public deployment, add HTTPS, CSRF protection, rate limiting, spam protection and a secure database backup process.

## Stop the server

Press `Ctrl + C` in the VS Code terminal.
