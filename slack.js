const express = require('express');
const app = express();

app.get('/get_info', (req, res) => {
    // Get query parameters
    const { slack_name, track } = req.query;

    // Validate input parameters
    if (!slack_name || !track) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    // Get current day of the week
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Get current UTC time with validation of +/-2 hours
    const currentUtcTime = new Date();
    const utcOffset = currentUtcTime.getTimezoneOffset() / 60;

    if (Math.abs(utcOffset) <= 2) {
        const utcTime = currentUtcTime.toISOString();
        const data = {
            slack_name,
            current_day: currentDay,
            utc_time: utcTime,
            track,
            github_file_url: 'https://github.com/username/repo/blob/main/file_name.ext',
            github_repo_url: 'https://github.com/username/repo',
            status_code: 200,
        };
        return res.json(data);
    } else {
        return res.status(400).json({ error: 'UTC offset is greater than +/-2 hours' });
    }
});

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
