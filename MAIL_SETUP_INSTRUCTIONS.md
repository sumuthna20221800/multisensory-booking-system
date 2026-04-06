# Mail Service Setup - Fix Instructions

## Root Cause
The mail service is **configured correctly** but emails fail to send because the Gmail SMTP credentials in `server/.env` are placeholders, not real credentials.

**Current Error:**
```
SMTP verification failed: Invalid login: 535-5.7.8 Username and Password not accepted.
BadCredentials - Gmail SMTP
```

---

## Solution Steps

### Step 1: Generate Gmail App Password

1. **Enable 2-Step Verification** on your Google Account
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" and follow setup

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" or "Other" (name it "EcoSenses Server")
   - Google will show a **16-character password** (e.g., `abcd efgh ijkl mnop`)
   - **Copy this password** - you'll need it in Step 2

### Step 2: Update server/.env File

Open `server/.env` and replace these lines:

**BEFORE (Placeholders):**
```env
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-gmail-app-password
MAIL_FROM=your-email@gmail.com
```

**AFTER (Real Values):**
```env
MAIL_USER=yourname@gmail.com                    ← Your actual Gmail address
MAIL_PASS=abcdefghijklmnop                      ← The 16-char App Password from Step 1 (no spaces)
MAIL_FROM=yourname@gmail.com                    ← Same Gmail address
```

⚠️ **Important:**
- Use the **App Password**, NOT your regular Gmail password
- Remove all spaces from the App Password
- Use the same Gmail address for both MAIL_USER and MAIL_FROM

### Step 3: Restart Backend Server

Kill the running server and restart it:

**In terminal:**
```powershell
# The server will auto-restart if using nodemon, or manually stop/start:
npm --prefix server run dev
```

**Look for this log:**
```
Server running on port 5000
Mail service is enabled (mode: smtp)
```

### Step 4: Test Mail Delivery

Run this PowerShell command to test:

```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:5000/api/mail/test" -ContentType "application/json" -Body '{"to":"yourname@gmail.com"}' | ConvertTo-Json -Depth 6
```

**Expected Success Response:**
```json
{
    "success": true,
    "message": "Test mail request processed",
    "mailStatus": {
        "enabled": true,
        "mode": "smtp",
        "configuredTransport": "smtp"
    },
    "result": {
        "sent": true,                    ← Should be true
        "messageId": "<...@gmail.com>",  ← Gmail message ID
        "mode": "smtp"
    }
}
```

**Check your inbox** for the test email with subject: "EcoSenses Mail Service Test"

---

## Verification Checklist

- [ ] 2-Step Verification enabled on Google Account
- [ ] App Password generated (16 characters)
- [ ] `server/.env` updated with real Gmail address
- [ ] `server/.env` updated with App Password (no spaces)
- [ ] Server restarted successfully
- [ ] Test mail API returns `"sent": true`
- [ ] Test email received in inbox

---

## Already Working (No Action Needed)

✅ Mail service code is implemented correctly  
✅ Database saves booking data successfully  
✅ Booking confirmation emails are triggered automatically  
✅ SMTP transport mode is active  
✅ Error reporting is clear and visible  

**The ONLY issue:** Missing real Gmail credentials in `.env` file.

---

## Common Issues

### Issue: "App Passwords" option not available
**Fix:** Enable 2-Step Verification first, then try again

### Issue: Still getting "BadCredentials" after update
**Fix:** 
1. Verify App Password has no spaces
2. Restart server completely (kill process and relaunch)
3. Check you're using App Password, not regular Gmail password

### Issue: "Connection timeout"
**Fix:** Check firewall/antivirus isn't blocking port 587 SMTP

---

## After Successful Setup

Once credentials are correct:
- **Booking emails** will automatically send when users create bookings
- **Test endpoint** available at: `POST /api/mail/test`
- **Mode visible** in server startup logs

The booking controller already integrates mail sending:
```javascript
// In server/src/controllers/bookingController.js
// Automatically sends confirmation email after booking creation
```
