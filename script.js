/**
 * Cybersecurity Portfolio - Interactive Script
 * Data store & UI interaction handlers
 */

// Detailed Project Master Data
const projectData = {
    "wazuh-lab": {
        title: "Wazuh SOC Home Lab",
        category: "SIEM / Endpoint Monitoring",
        why: "To establish a practical, real-world Security Operations monitoring platform that mirrors enterprise SOC capabilities for endpoint log correlation and custom alerting.",
        objective: "Build a centralized logging environment, connect endpoint agents, ingest system logs, and engineer detection rules mapped to cyber threat frameworks.",
        tools: ["Wazuh Manager & Dashboard", "Ubuntu Server", "Windows Server", "Sysmon", "PowerShell", "Nmap", "MITRE ATT&CK"],
        whatIDid: [
            "Deployed and configured Wazuh Manager, Indexer, and Dashboard on an isolated Ubuntu virtual environment.",
            "Integrated Windows Server as an endpoint agent, routing Windows Security, System, PowerShell, and Defender event streams.",
            "Integrated Microsoft Sysmon to collect high-fidelity process creation, network connection, and driver loading telemetry.",
            "Generated controlled security anomalies (such as invalid logon spikes and administrative execution) to test alert firing.",
            "Created and tuned custom XML detection rules in Wazuh to minimize false positives and elevate critical indicators.",
            "Mapped detected adversary techniques directly to the MITRE ATT&CK framework."
        ],
        skills: ["SIEM Deployment", "Log Ingestion & Parsing", "Detection Rule Engineering", "Windows Telemetry Analysis", "MITRE ATT&CK Mapping"],
        outcome: "Successfully created an operational home SOC environment capable of capturing, alerting, and visually analyzing real-time endpoint anomalies.",
        realWorldRelevance: "Mirrors enterprise SOC detection workflows where analysts must ingest raw telemetry, reduce noise, and spot indicators of compromise (IOCs).",
        evidence: {
            repo: "https://github.com",
            writeup: "Placeholder: Detailed Technical PDF Write-up",
            demo: "Placeholder: Interactive Dashboard Walkthrough",
            screenshots: "Placeholder: System Architecture & Alert Screenshots"
        }
    },
    "splunk-lab": {
        title: "Splunk Security Monitoring Lab",
        category: "Log Forwarding & SPL",
        why: "To gain operational experience with industry-standard Splunk SIEM technology and master Search Processing Language (SPL) for proactive threat hunting.",
        objective: "Configure Universal Forwarders on Windows Server and construct optimized SPL queries to investigate authentication anomalies and process spikes.",
        tools: ["Splunk Enterprise", "Splunk Universal Forwarder", "Windows Event Logs", "SPL (Search Processing Language)", "VMware"],
        whatIDid: [
            "Configured Splunk Enterprise on an analytical workstation and listening ports for data streams.",
            "Installed and provisioned Splunk Universal Forwarder on Windows Server target environments.",
            "Specified data input paths for Security (Event ID 4624, 4625), System, and Application logs.",
            "Executed complex SPL queries using stats, transaction, and evaluation commands to detect brute-force behavior.",
            "Designed analytical dashboards aggregating failed logons by target user and source IP."
        ],
        skills: ["Splunk Administration", "Log Forwarding Architecture", "SPL Query Optimization", "Incident Telemetry Correlation"],
        outcome: "Established a robust log aggregation pipeline and established reusable SPL search strings for rapid incident investigation.",
        realWorldRelevance: "Demonstrates core enterprise SOC competencies in searching massive log sets efficiently to isolate compromise signals.",
        evidence: {
            repo: "https://github.com",
            writeup: "Placeholder: SPL Query Cheatsheet & Lab Report",
            demo: "Placeholder: Dashboard Video Walkthrough",
            screenshots: "Placeholder: SPL Execution Screenshots"
        }
    },
    "web-security": {
        title: "Web Application Security Testing Lab",
        category: "Web Application Security",
        why: "To understand web application request structures and security vulnerabilities from an offensive perspective in order to build stronger defensive monitoring controls.",
        objective: "Perform authorized security assessments against web application components to inspect HTTP telemetry and identify OWASP Top 10 vulnerabilities.",
        tools: ["Burp Suite Professional/Community", "OWASP Top 10", "Nmap", "Nikto", "Web Browsers"],
        whatIDid: [
            "Mapped network endpoints and exposed services using targeted Nmap discovery scans.",
            "Configured Burp Suite as an intercepting proxy to evaluate raw HTTP request/response headers, parameters, and cookies.",
            "Utilized Burp Repeater to manipulate parameters and evaluate broken authorization (IDOR) and injection behavior.",
            "Analyzed web server vulnerability signatures using Nikto vulnerability scanning.",
            "Formulated mitigation guidelines and security header recommendations for discovered weaknesses."
        ],
        skills: ["HTTP Traffic Interception", "OWASP Assessment", "Parameter Tampering", "Vulnerability Documentation"],
        outcome: "Identified access control and input validation weaknesses in target labs while documenting defensive remediation paths.",
        realWorldRelevance: "Essential for evaluating web application attack surfaces and understanding modern web layer incident alerts.",
        evidence: {
            repo: "https://github.com",
            writeup: "Placeholder: Security Vulnerability Assessment Report",
            demo: "Placeholder: Burp Suite Walkthrough Video",
            screenshots: "Placeholder: Intercept Logs & Proof-of-Concept Screenshots"
        }
    },
    "attack-sim": {
        title: "Attack Simulation & Security Monitoring Lab",
        category: "Attack & Defense Correlation",
        why: "To bridge the gap between offensive execution and defensive visibility by observing exactly how adversary tools leave operational footprints in system logs.",
        objective: "Execute controlled simulation activities from Kali Linux against a Windows endpoint while recording and analyzing the resulting defensive telemetry.",
        tools: ["Kali Linux", "Windows Server", "Wazuh SIEM", "Sysmon", "PowerShell", "Nmap", "MITRE ATT&CK"],
        whatIDid: [
            "Executed network recon and targeted scan routines from a Kali Linux host against lab Windows servers.",
            "Simulated credential testing and administrative utility executions to trigger host-level event generators.",
            "Correlated Sysmon Event ID 1 (Process Creation) and Event ID 3 (Network Connection) with network activity.",
            "Evaluated Wazuh rule triggering to determine detection latency and log completeness.",
            "Constructed end-to-end event timelines linking initial port scan to final endpoint event."
        ],
        skills: ["Adversary Behavior Emulation", "Telemetry Correlation", "Log Analysis", "Incident Reconstruction"],
        outcome: "Proved that isolated host events become clear attack indicators when correlated chronologically across network and system logs.",
        realWorldRelevance: "Directly applicable to Tier 1 and Tier 2 SOC analysis where event correlation across multi-source telemetry is required.",
        evidence: {
            repo: "https://github.com",
            writeup: "Placeholder: Attack Correlation Matrix & Report",
            demo: "Placeholder: Simulation Execution Demonstration",
            screenshots: "Placeholder: Log Timeline & Alert Screenshots"
        }
    }
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProjectModals();
});

// Mobile Navigation Logic
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Modal View System
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    // Open Modal on Card Click
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                renderModalContent(data, modalBody);
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal Event Handlers
    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);

    // Escape Key Close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Render Content into Modal Body
function renderModalContent(data, container) {
    const toolsList = data.tools.map(tool => `<span>${tool}</span>`).join(' ');
    const didList = data.whatIDid.map(item => `<li>${item}</li>`).join('');
    const skillsList = data.skills.map(skill => `<li>${skill}</li>`).join('');

    container.innerHTML = `
        <div class="modal-project-header">
            <span class="tech-badge">${data.category}</span>
            <h2>${data.title}</h2>
        </div>

        <div class="modal-section">
            <h4>1. Purpose & Motivation</h4>
            <p>${data.why}</p>
        </div>

        <div class="modal-section">
            <h4>2. Project Objective</h4>
            <p>${data.objective}</p>
        </div>

        <div class="modal-section">
            <h4>3. Tools & Technologies</h4>
            <div class="card-tags margin-top">${toolsList}</div>
        </div>

        <div class="modal-section">
            <h4>4. Technical Implementation & Execution</h4>
            <ul>${didList}</ul>
        </div>

        <div class="modal-section">
            <h4>5. Skills Developed</h4>
            <ul>${skillsList}</ul>
        </div>

        <div class="modal-section">
            <h4>6. Key Outcome</h4>
            <p>${data.outcome}</p>
        </div>

        <div class="modal-section">
            <h4>7. Enterprise / Real-World Relevance</h4>
            <p>${data.realWorldRelevance}</p>
        </div>

        <div class="modal-section">
            <h4>8. Evidence & Documentation</h4>
            <div class="modal-actions">
                <a href="${data.evidence.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    GitHub Repository
                </a>
                <span class="placeholder-tag">${data.evidence.writeup}</span>
                <span class="placeholder-tag">${data.evidence.screenshots}</span>
                <span class="placeholder-tag">${data.evidence.demo}</span>
            </div>
        </div>
    `;
}
