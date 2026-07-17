document.getElementById('ticketForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const status = document.getElementById('status');
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    status.className = '';
    status.textContent = 'Opening ticket...';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const receipt = document.getElementById('receipt').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Build the GitHub Issue body
    const body = `
**Submitted by:** ${name}  
**Email:** ${email}  
**Receipt ID:** ${receipt || 'Not provided'}

---

**Description:**

${message}
`;

    try {
        // Step 1: Get a temporary token from VEXR's backend (or your own proxy)
        // This keeps your GitHub token secret.
        const tokenResp = await fetch('https://vexr-ultra.onrender.com/api/support/token');
        if (!tokenResp.ok) throw new Error('Failed to get auth token');
        const { token } = await tokenResp.json();

        // Step 2: Create the Issue
        const response = await fetch('https://api.github.com/repos/ASIM-SOVEREIGN/ASIM-SOVEREIGN.github.io/issues', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: `[Support] ${subject}`,
                body: body,
                labels: ['support-ticket']
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'GitHub API error');
        }

        const issue = await response.json();
        status.className = 'success';
        status.innerHTML = `✅ Ticket opened! <a href="${issue.html_url}" target="_blank" style="color:#A62C9D;">View on GitHub →</a>`;
        document.getElementById('ticketForm').reset();

    } catch (err) {
        status.className = 'error';
        status.textContent = `❌ ${err.message}`;
    } finally {
        btn.disabled = false;
    }
});
